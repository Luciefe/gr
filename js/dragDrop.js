import { getDraggedItem, setDraggedItem, getDragTarget, setDragTarget } from './state.js';
import { 
    findParentFolder, 
    getBookmarks, 
    removeFromParent, 
    validateFolderMove,
    saveBookmarks  // 添加这个导入
} from './bookmarks.js';
import { renderBookmarks, closeAllFolders } from './ui.js';
import { showToast, throttle } from './utils.js';

function addDragListeners(elem, item) {
    elem.draggable = true;
    elem.dataset.id = item.id;
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
    closeAllFolders();
}

let dragOverTimeout;
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragOverTimeout) {
        clearTimeout(dragOverTimeout);
    }
    
    dragOverTimeout = setTimeout(() => {
        const draggedItem = getDraggedItem();
        const dragTarget = getDragTarget();
        if (!draggedItem || e.target === dragTarget) return;
        
        setDragTarget(e.target);
        const targetItem = getItemFromElement(getDragTarget());
        if (!targetItem) return;

        clearDragIndicators();
        
        if (targetItem.type === 'folder') {
            handleFolderDragOver(e, targetItem);
        } else {
            handleBookmarkDragOver(e, targetItem);
        }
    }, 50);
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
    e.preventDefault();
    document.body.classList.remove('dragging-active');
    clearDragIndicators();
    e.target.classList.remove('dragging');
    setDraggedItem(null);
    setDragTarget(null);
}

function handleDrop(e, targetItem) {
    const draggedItem = getDraggedItem();
    const dragTarget = getDragTarget();
    
    if (!draggedItem || draggedItem === targetItem) return;
    
    e.preventDefault();
    e.stopPropagation();
    
    // 添加防重复处理标记
    if (e.handled) return;
    e.handled = true;
    
    try {
        // 保存原始状态以便回滚
        const originalBookmarks = JSON.parse(JSON.stringify(getBookmarks()));
        
        // 从原位置移除（确保在添加前移除）
        const removed = removeFromParent(draggedItem.id);
        if (!removed) {
            throw new Error('无法从原位置移除项目');
        }
        
        let success = false;
        // 根据目标类型和放置位置处理
        if (targetItem.type === 'folder' && isInFolderDropZone(e, dragTarget)) {
            success = handleFolderDrop(targetItem);
        } else {
            success = handleSortDrop(targetItem, findParentFolder(targetItem.id), e);
        }
        
        if (!success) {
            // 如果处理失败，恢复原始状态
            saveBookmarks(originalBookmarks);
            return;
        }
        
        // 保存并刷新显示
        saveBookmarks(getBookmarks());
        renderBookmarks();
        showToast('移动成功');
    } catch (error) {
        console.error('拖放处理错误:', error);
        showToast('移动失败：' + error.message);
    } finally {
        cleanupDrag();
    }
}

function handleFolderDrop(targetItem) {
    const draggedItem = getDraggedItem();
    if (!draggedItem) return false;
    
    // 检查是否已存在相同项目
    if (targetItem.items?.some(item => item.id === draggedItem.id)) {
        showToast('该项目已存在于目标文件夹中');
        return false;
    }
    
    // 验证移动是否有效
    if (draggedItem.type === 'folder') {
        try {
            validateFolderMove(draggedItem, targetItem);
        } catch (error) {
            showToast(error.message);
            return false;
        }
    }
    
    // 确保目标文件夹有 items 数组
    if (!targetItem.items) {
        targetItem.items = [];
    }
    
    // 添加到新位置
    targetItem.items.push({...draggedItem});
    showToast(`已移动到 "${targetItem.name}" 文件夹`);
    return true;
}

function handleSortDrop(targetItem, targetParent, e) {
    const draggedItem = getDraggedItem();
    const dragTarget = getDragTarget();
    if (!draggedItem || !dragTarget) return false;

    try {
        const targetContainer = targetParent ? targetParent.items : getBookmarks();
        const targetIndex = targetContainer.findIndex(item => item.id === targetItem.id);
        const insertIndex = isOverLeftHalf(e, dragTarget) ? targetIndex : targetIndex + 1;
        
        // 使用深拷贝添加
        targetContainer.splice(insertIndex, 0, JSON.parse(JSON.stringify(draggedItem)));
        return true;
    } catch (error) {
        console.error('排序放置错误:', error);
        return false;
    }
}

function cleanupDrag() {
    const draggedItem = getDraggedItem();
    const dragTarget = getDragTarget();
    
    if (draggedItem) setDraggedItem(null);
    if (dragTarget) setDragTarget(null);
    
    document.body.classList.remove('dragging-active');
    clearDragIndicators();
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

function isInFolderDropZone(e, target) {
    if (!target) return false;
    if (!target.classList.contains('folder-item')) return false;
    
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    const dropZoneStart = rect.height * 0.2;  // 扩大检测区域
    const dropZoneEnd = rect.height * 0.8;
    
    return mouseY > dropZoneStart && mouseY < dropZoneEnd;
}

function isOverLeftHalf(e, target) {
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    return e.clientX < rect.left + rect.width / 2;
}

function clearDragIndicators() {
    document.querySelectorAll('.drag-indicator, .folder-drop-indicator').forEach(el => el.remove());
    document.querySelectorAll('[class*="drag-over"]').forEach(el => {
        el.className = el.className.replace(/\bdrag-over\S*\s*/g, '');
    });
}

function showFolderDropIndicator(folderElement) {
    folderElement.classList.add('drag-over', 'drag-over-folder');
    const indicator = document.createElement('div');
    indicator.className = 'folder-drop-indicator';
    folderElement.appendChild(indicator);
}

function showSortingIndicator(e, targetElement) {
    const rect = targetElement.getBoundingClientRect();
    const indicator = document.createElement('div');
    indicator.className = 'drag-indicator';
    
    indicator.style.height = `${rect.height + 4}px`;
    indicator.style.top = `${rect.top - 2}px`;
    
    if (isOverLeftHalf(e, targetElement)) {
        indicator.style.left = `${rect.left - 2}px`;
        targetElement.classList.add('drag-over-left');
        targetElement.classList.remove('drag-over-right');
    } else {
        indicator.style.left = `${rect.right + 2}px`;
        targetElement.classList.add('drag-over-right');
        targetElement.classList.remove('drag-over-left');
    }
    
    document.body.appendChild(indicator);
}

function handleFolderDragOver(e, targetItem) {
    const dragTarget = getDragTarget();
    if (!dragTarget || !targetItem) return;
    
    // 清除之前的指示器
    clearDragIndicators();
    
    if (isInFolderDropZone(e, dragTarget)) {
        dragTarget.classList.add('drag-over', 'folder-highlight');
        showFolderDropIndicator(dragTarget);
    } else {
        dragTarget.classList.add('drag-over');
        showSortingIndicator(e, dragTarget);
    }
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