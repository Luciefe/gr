import { 
    getDraggedItem, setDraggedItem, 
    getDragTarget, setDragTarget,
    setIsDragging, getIsDragging,
    setLastDropTarget, getLastDropTarget
} from './state.js';
import { 
    findParentFolder, 
    getBookmarks, 
    removeFromParent, 
    validateFolderMove,
    saveBookmarks
} from './bookmarks.js';
import { renderBookmarks, closeAllFolders } from './ui.js';
import { showToast, throttle } from './utils.js';

// 新增:判断拖放位置的枚举
const DropPosition = {
    LEFT: 'left',
    MIDDLE: 'middle',
    RIGHT: 'right'
};

function addDragListeners(elem, item) {
    elem.draggable = true;
    elem.dataset.id = item.id;
    
    if (item.type === 'folder') {
        elem.classList.add('folder-item');
    } else {
        elem.classList.add('bookmark-item');
    }
    
    elem.addEventListener('dragstart', (e) => handleDragStart(e, item));
    elem.addEventListener('dragend', handleDragEnd);
    elem.addEventListener('dragover', handleDragOver);
    elem.addEventListener('dragleave', handleDragLeave);
    elem.addEventListener('drop', (e) => handleDrop(e, item));
}

function handleDragStart(e, item) {
    e.stopPropagation();
    setDraggedItem(item);
    setDragTarget(null);
    setIsDragging(true);
    setLastDropTarget(null);
    e.target.classList.add('dragging');
    
    const preview = e.target.cloneNode(true);
    preview.style.cssText = `
        position: fixed;
        pointer-events: none;
        z-index: -1;
        opacity: 0;
    `;
    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, e.offsetX, e.offsetY);
    setTimeout(() => preview.remove(), 0);

    document.body.classList.add('dragging-active');
    //closeAllFolders();
}

let dragOverTimeout;
let lastDragOverEvent = null;

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    
    // 性能优化: 如果事件相同则跳过
    if (lastDragOverEvent && 
        e.clientX === lastDragOverEvent.clientX && 
        e.clientY === lastDragOverEvent.clientY) {
        return;
    }
    
    lastDragOverEvent = {
        clientX: e.clientX,
        clientY: e.clientY,
        target: e.target
    };
    
    const actualTarget = findDraggableParent(e.target);
    if (!actualTarget) return;
    
    const draggedItem = getDraggedItem();
    const dragTarget = getDragTarget();
    
    // 防止自身拖放
    if (draggedItem && draggedItem.id === actualTarget.dataset.id) {
        clearDragIndicators();
        return;
    }

    if (actualTarget !== dragTarget) {
        setDragTarget(actualTarget);
        const targetItem = getItemFromElement(actualTarget);
        if (!targetItem || !draggedItem) return;

        clearDragIndicators();
        handleItemDragOver(e, targetItem);
    } else if (dragTarget) {
        const targetItem = getItemFromElement(dragTarget);
        if (targetItem) {
            handleItemDragOver(e, targetItem);
        }
    }
}

// 新增：统一处理拖放指示器显示
function handleItemDragOver(e, targetItem) {
    const dragTarget = getDragTarget();
    if (!dragTarget || !targetItem) return;
    
    clearDragIndicators();
    
    if (dragOverTimeout) {
        cancelAnimationFrame(dragOverTimeout);
    }
    
    dragOverTimeout = requestAnimationFrame(() => {
        if (!getIsDragging()) return;
        
        const isFolder = targetItem.type === 'folder';
        const dropPosition = isFolder ? getFolderDropPosition(e, dragTarget) : null;
        
        // 文件夹特殊处理
        if (isFolder && dropPosition === DropPosition.MIDDLE) {
            showFolderDropIndicator(dragTarget);
        } else {
            // 普通排序指示器
            const isLeft = isFolder ? 
                (dropPosition === DropPosition.LEFT) : 
                isOverLeftHalf(e, dragTarget);
            showSortingIndicator(e, dragTarget, isLeft);
        }
    });
}

function findDraggableParent(element) {
    while (element && !element.dataset.id) {
        element = element.parentElement;
    }
    return element;
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target === getDragTarget()) {
        clearDragIndicators();
        setDragTarget(null);
    }
}

function handleDragEnd(e) {
    setDraggedItem(null);
    setDragTarget(null);
    setIsDragging(false);
    setLastDropTarget(null);
    e.target.classList.remove('dragging');
    document.body.classList.remove('dragging-active');
    clearDragIndicators();
    closeAllFolders(); // 在拖动结束时关闭所有文件夹
}

function handleDrop(e, targetItem) {
    const draggedItem = getDraggedItem();
    const dragTarget = getDragTarget();
    if (!draggedItem || draggedItem === targetItem) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    if (e.handled) return;
    e.handled = true;
    
    let originalBookmarks = null;
    
    try {
        originalBookmarks = JSON.parse(JSON.stringify(getBookmarks()));
        let success = false;

        // 修改这里：根据不同情况判断 dropPosition
        const dropPosition = targetItem.type === 'folder' ? 
            getFolderDropPosition(e, dragTarget) : 
            (isOverLeftHalf(e, dragTarget) ? DropPosition.LEFT : DropPosition.RIGHT);
        
        // 如果是放入文件夹
        if (targetItem.type === 'folder' && dropPosition === DropPosition.MIDDLE) {
            if (draggedItem.type === 'folder') {
                validateFolderMove(draggedItem, targetItem);
            }
            success = handleFolderDrop(targetItem, draggedItem);
            if (success) {
                success = removeFromParent(draggedItem.id);
            }
        } else {
            const targetParent = findParentFolder(targetItem.id);
            const draggedItemClone = JSON.parse(JSON.stringify(draggedItem));
            if (removeFromParent(draggedItem.id)) {
                // 传递正确的 forceLeft 值
                success = handleSortDrop(targetItem, targetParent, e, dropPosition === DropPosition.LEFT);
            }
        }

        if (!success) {
            if (originalBookmarks) {
                saveBookmarks(originalBookmarks);
            }
            throw new Error('无法完成移动操作');
        }
        
        // 保存并刷新
        saveBookmarks(getBookmarks());
        renderBookmarks();
        showToast('移动成功');
    } catch (error) {
        console.error('拖放处理错误:', error);
        // 确保originalBookmarks存在再恢复
        if (originalBookmarks) {
            saveBookmarks(originalBookmarks);
        }
        showToast('移动失败：' + error.message);
    } finally {
        cleanupDrag();
    }
}

function handleFolderDrop(targetItem, draggedItem) {
    if (!targetItem || !draggedItem) return false;
    
    // 检查是否存在循环引用
    if (draggedItem.type === 'folder' && targetItem.id === draggedItem.id) {
        showToast('不能将文件夹移动到自身内部');
        return false;
    }
    
    // 检查重复
    if (targetItem.items?.some(item => item.id === draggedItem.id)) {
        showToast('该项目已存在于目标文件夹中');
        return false;
    }
    
    // 确保目标文件夹有items数组
    if (!targetItem.items) {
        targetItem.items = [];
    }
    
    // 添加到新位置
    targetItem.items.push(draggedItem);
    return true;
}

function handleSortDrop(targetItem, targetParent, e, forceLeft) {
    const draggedItem = getDraggedItem();
    const dragTarget = getDragTarget();
    if (!draggedItem || !dragTarget) return false;

    try {
        const targetContainer = targetParent ? targetParent.items : getBookmarks();
        if (!targetContainer) return false;

        const targetIndex = targetContainer.findIndex(item => item.id === targetItem.id);
        if (targetIndex === -1) return false;

        // 修改这里：使用传入的 forceLeft 参数确定插入位置
        const insertIndex = forceLeft ? targetIndex : targetIndex + 1;
        
        targetContainer.splice(insertIndex, 0, JSON.parse(JSON.stringify(draggedItem)));
        return true;
    } catch (error) {
        console.error('排序放置错误:', error);
        return false;
    }
}

// 添加错误边界处理
function safelyExecute(fn, fallback = null) {
    try {
        return fn();
    } catch (error) {
        console.error('操作执行错误:', error);
        showToast('操作失败');
        return fallback;
    }
}

// 优化清理函数
function cleanupDrag(force = false) {
    if (dragOverTimeout) {
        cancelAnimationFrame(dragOverTimeout);
        dragOverTimeout = null;
    }
    
    safelyExecute(() => {
        const draggedItem = getDraggedItem();
        const dragTarget = getDragTarget();
        
        if (draggedItem) setDraggedItem(null);
        if (dragTarget) setDragTarget(null);
        
        setIsDragging(false);
        setLastDropTarget(null);
        lastDragOverEvent = null;
        
        document.body.classList.remove('dragging-active');
        clearDragIndicators();
    });
}

function getItemFromElement(element) {
    const id = element.dataset.id;
    return findItemById(id, getBookmarks());
}

function findItemById(id, items) {
    for (let item of items) {
        if (item.id.toString() === id) return item;
        if (item.type === 'folder' && item.items) {
            const found = findItemById(id, item.items);
            if (found) return found;
        }
    }
    return null;
}

function getFolderDropPosition(e, target) {
    if (!target || !target.classList.contains('folder-item')) return null;
    
    const rect = target.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const width = rect.width;
    const height = rect.height;
    
    // 确保鼠标在目标元素范围内
    if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
        return null;
    }
    
    // 确定放置区域
    if (mouseX < width * 0.2) {
        return DropPosition.LEFT;
    } else if (mouseX > width * 0.8) {
        return DropPosition.RIGHT;
    }
    return DropPosition.MIDDLE;
}

function isInFolderDropZone(e, target) {
    return getFolderDropPosition(e, target) === DropPosition.MIDDLE;
}

function isOverLeftHalf(e, target) {
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    return e.clientX < rect.left + rect.width / 2;
}

function clearDragIndicators() {
    // 移除所有指示器元素和类名
    document.querySelectorAll('.drag-indicator, .folder-drop-indicator').forEach(el => el.remove());
    document.querySelectorAll('[class*="drag-"]').forEach(el => {
        const classList = el.classList;
        Array.from(classList).forEach(className => {
            if (className.startsWith('drag-')) {
                classList.remove(className);
            }
        });
    });
}

function showFolderDropIndicator(folderElement) {
    // 只显示文件夹放入指示器
    const indicator = document.createElement('div');
    indicator.className = 'folder-drop-indicator';
    // 设置样式让指示器在文件夹内部显示
    indicator.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        pointer-events: none;
    `;
    folderElement.appendChild(indicator);
    folderElement.classList.add('drag-over-folder');
}

function showSortingIndicator(e, targetElement, isLeft = null) {
    const rect = targetElement.getBoundingClientRect();
    const indicator = document.createElement('div');
    indicator.className = 'drag-indicator';
    
    indicator.style.height = `${rect.height}px`;
    indicator.style.top = `${rect.top}px`;
    
    if (isLeft) {
        indicator.style.left = `${rect.left}px`;
        targetElement.classList.add('drag-over-left');
    } else {
        indicator.style.left = `${rect.right}px`;
        targetElement.classList.add('drag-over-right');
    }
    
    document.body.appendChild(indicator);
}

function handleFolderDragOver(e, targetItem) {
    const dragTarget = getDragTarget();
    if (!dragTarget || !targetItem) return;
    
    clearDragIndicators();
    
    if (dragOverTimeout) {
        cancelAnimationFrame(dragOverTimeout);
        dragOverTimeout = null;
    }
    
    dragOverTimeout = requestAnimationFrame(() => {
        if (!getIsDragging()) return;
        
        const dropPosition = getFolderDropPosition(e, dragTarget);
        
        if (dropPosition === DropPosition.MIDDLE) {
            showFolderDropIndicator(dragTarget);
        } else {
            showSortingIndicator(e, dragTarget, dropPosition === DropPosition.LEFT);
        }
    });
}

function handleBookmarkDragOver(e, targetItem) {
    const dragTarget = getDragTarget();
    if (!dragTarget) return;
    
    showSortingIndicator(e, dragTarget);
}

const throttledDragOver = throttle((e, targetItem) => {
    if (!targetItem) return;
    
    clearDragIndicators();
    
    if (targetItem.type === 'folder') {
        handleFolderDragOver(e, targetItem);
    } else {
        handleBookmarkDragOver(e, targetItem);
    }
}, 50);

export { addDragListeners };
