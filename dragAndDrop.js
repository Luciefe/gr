import { bookmarks, saveBookmarks, renderBookmarks, showToast } from './bookmarkManager';

// 拖拽相关函数
function addDragListeners(elem, item) {
    elem.addEventListener('dragstart', (e) => dragStart(e, item));
    elem.addEventListener('dragover', dragOver);
    elem.addEventListener('dragleave', dragLeave);
    elem.addEventListener('drop', (e) => drop(e, item));
    elem.addEventListener('dragend', dragEnd);
}

function dragStart(e, item) {
    e.stopPropagation();
    draggedItem = item;
    dragTarget = null;
    e.target.classList.add('dragging');
    closeAllFolders();
    setDragPreview(e);
    document.body.classList.add('dragging-active');
}

function setDragPreview(e) {
    const preview = e.target.cloneNode(true);
    preview.style.cssText = 'position:fixed;pointer-events:none;z-index:-1;opacity:0;';
    document.body.appendChild(preview);
    e.dataTransfer.setDragImage(preview, e.offsetX, e.offsetY);
    setTimeout(() => preview.remove(), 0);
}

function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    document.querySelectorAll('.drag-indicator').forEach(el => el.remove());
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    if (draggedItem && draggedItem.id === target.dataset.id) {
        return;
    }
    target.classList.add('drag-over');
    if (target.classList.contains('folder-item') && isInFolderDropZone(e, target)) {
        target.classList.add('drag-over-folder');
        target.classList.remove('drag-over-top', 'drag-over-bottom');
        const indicator = document.createElement('div');
        indicator.className = 'folder-drop-indicator';
        target.appendChild(indicator);
    } else {
        target.classList.remove('drag-over-folder');
        const indicator = document.createElement('div');
        indicator.className = 'drag-indicator';
        const rect = target.getBoundingClientRect();
        indicator.style.width = `${rect.width}px`;
        indicator.style.left = `${rect.left}px`;
        if (isInTopHalf(e, target)) {
            indicator.style.top = `${rect.top - 2}px`;
            target.classList.add('drag-over-top');
        } else {
            indicator.style.top = `${rect.bottom + 2}px`;
            target.classList.add('drag-over-bottom');
        }
        document.body.appendChild(indicator);
    }
}

function dragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    target.classList.remove('drag-over', 'drag-over-folder', 'drag-over-top', 'drag-over-bottom');
    const indicator = target.querySelector('.folder-drop-indicator');
    if (indicator) {
        indicator.remove();
    }
}

function dragEnd(e) {
    e.preventDefault();
    e.target.classList.remove('dragging');
    document.body.classList.remove('dragging-active');
    document.querySelectorAll('.drag-indicator, .folder-drop-indicator').forEach(el => el.remove());
    document.querySelectorAll('.drag-over, .drag-over-top, .drag-over-bottom, .drag-over-folder').forEach(el => {
        el.classList.remove('drag-over', 'drag-over-top', 'drag-over-bottom', 'drag-over-folder');
    });
    closeAllFolders();
}

function drop(e, targetItem) {
    if (!draggedItem || draggedItem === targetItem) return;
    e.preventDefault();
    e.stopPropagation();
    try {
        const sourceParent = findParentFolder(draggedItem);
        const targetParent = findParentFolder(targetItem);
        if (targetItem.type === 'folder' && draggedItem.type === 'folder') {
            try {
                validateFolderMove(draggedItem, targetItem);
            } catch (error) {
                showToast(error.message, 'error');
                return;
            }
        }
        closeAllFolders();
        removeFromParent(draggedItem, sourceParent);
        if (targetItem.type === 'folder' && isInFolderDropZone(e, dragTarget)) {
            handleFolderDrop(targetItem);
        } else {
            handleSortDrop(targetItem, targetParent, e);
        }
        renderBookmarks();
        saveBookmarks();
    } catch (error) {
        console.error('Drop error:', error);
        showToast('移动失败', 'error');
    } finally {
        cleanupDrag();
    }
}
