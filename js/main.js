import { renderBookmarks, debouncedRenderBookmarks, showAuthModal, handleAuthSubmit, updateUserSection, closeAllFolders, closeAllModals, addImportExportButtons, initializeImportExport } from './ui.js';
import { loadBookmarks, saveBookmarks, addBookmark, addFolder, editItem, deleteItem, backupBookmarks, restoreBookmarks } from './bookmarks.js';
import { showContextMenu, hideContextMenu } from './contextMenu.js';
import { getContextMenuTarget, setContextMenuTarget } from './state.js';
import { logout } from './auth.js';
import { showToast } from './utils.js';

// 初始化
loadBookmarks();
renderBookmarks();
updateUserSection();
addImportExportButtons();

// 设置事件监听器
document.getElementById('loginBtn').addEventListener('click', () => showAuthModal('login'));
document.getElementById('registerBtn').addEventListener('click', () => showAuthModal('register'));
document.getElementById('authForm').addEventListener('submit', handleAuthSubmit);
document.getElementById('logoutBtn').addEventListener('click', () => {
    logout();
    updateUserSection();
});

// 删除重复的表单提交事件处理程序
document.getElementById('addBookmarkForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('bookmarkName').value;
    const url = document.getElementById('bookmarkUrl').value;
    const contextMenuTarget = getContextMenuTarget();
    
    try {
        if (contextMenuTarget && contextMenuTarget.type === 'folder') {
            await addBookmark(name, url, contextMenuTarget);
            showToast(`已添加到 "${contextMenuTarget.name}" 文件夹`);
        } else {
            await addBookmark(name, url);
            showToast('已添加到根目录');
        }
        
        document.getElementById('addBookmarkModal').style.display = 'none';
        document.getElementById('addBookmarkForm').reset();
        setContextMenuTarget(null); // 清除目标
        debouncedRenderBookmarks();
    } catch (error) {
        showToast(error.message, 'error');
    }
});

document.getElementById('addFolderForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('folderName').value;
    const contextMenuTarget = getContextMenuTarget();

    try {
        if (contextMenuTarget && contextMenuTarget.type === 'folder') {
            await addFolder(name, contextMenuTarget);
            showToast(`已添加到 "${contextMenuTarget.name}" 文件夹`);
        } else {
            await addFolder(name);
            showToast('已添加到根目录');
        }
        
        document.getElementById('addFolderModal').style.display = 'none';
        document.getElementById('addFolderForm').reset();
        setContextMenuTarget(null); // 清除目标
        debouncedRenderBookmarks();
    } catch (error) {
        showToast(error.message, 'error');
    }
});

document.getElementById('editItem').addEventListener('click', () => {
    const contextMenuTarget = getContextMenuTarget(); // 修复未定义问题
    if (contextMenuTarget) {
        const editModal = document.getElementById('editModal');
        const editTitle = document.getElementById('editTitle');
        const editName = document.getElementById('editName');
        const editUrl = document.getElementById('editUrl');

        editTitle.textContent = contextMenuTarget.type === 'folder' ? '编辑文件夹' : '编辑书签';
        editName.value = contextMenuTarget.name;
        if (contextMenuTarget.type === 'bookmark') {
            editUrl.style.display = 'block';
            editUrl.value = contextMenuTarget.url;
        } else {
            editUrl.style.display = 'none';
        }

        editModal.style.display = 'block';
        hideContextMenu();
    }
});

// 修改编辑表单提交事件处理
document.getElementById('editForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const contextMenuTarget = getContextMenuTarget();
    if (!contextMenuTarget) return;

    try {
        const newName = document.getElementById('editName').value;
        const newUrl = contextMenuTarget.type === 'bookmark' ? document.getElementById('editUrl').value : null;

        editItem(contextMenuTarget, newName, newUrl);
        saveBookmarks();
        debouncedRenderBookmarks();
        document.getElementById('editModal').style.display = 'none';
        showToast(`${contextMenuTarget.type === 'folder' ? '文件夹' : '书签'}已更新`);
    } catch (error) {
        showToast(error.message, 'error');
    }
});

document.getElementById('bookmarkBar').addEventListener('contextmenu', (e) => {
    if (e.target === e.currentTarget) {
        showContextMenu(e, null);
    }
});

document.getElementById('addBookmark').addEventListener('click', () => {
    document.getElementById('addBookmarkModal').style.display = 'block';
    hideContextMenu();
});

document.getElementById('addFolder').addEventListener('click', () => {
    document.getElementById('addFolderModal').style.display = 'block';
    hideContextMenu();
});

document.getElementById('deleteItem').addEventListener('click', () => {
    const contextMenuTarget = getContextMenuTarget();
    if (contextMenuTarget) {
        deleteItem(contextMenuTarget);
        hideContextMenu();
        debouncedRenderBookmarks();
    }
});

document.querySelectorAll('.modal .close').forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        closeBtn.closest('.modal').style.display = 'none';
        const form = closeBtn.closest('.modal').querySelector('form');
        if (form) form.reset();
    });
});

document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            const form = modal.querySelector('form');
            if (form) form.reset();
        }
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.folder-item') && !e.target.closest('.folder-content')) {
        closeAllFolders();
    }
});

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeAllModals();
        closeAllFolders();
    }
    
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        document.getElementById('addBookmark').click();
    }
    
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        document.getElementById('addFolder').click();
    }
});

window.addEventListener('beforeunload', saveBookmarks);
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showToast('操作出错，请重试', 'error');
});

// 定期备份
setInterval(backupBookmarks, 30 * 60 * 1000);

// 初始化导入导出
initializeImportExport();

// 添加动态样式
const style = document.createElement('style');
style.textContent = `
    .dragging-active * {
        cursor: grabbing !important;
    }
    .folder-drop-indicator {
        position: absolute;
        inset: 0;
        border: 2px dashed var(--btn-bg-color);
        border-radius: 4px;
        pointer-events: none;
        animation: pulse 1.5s infinite;
        background-color: rgba(66, 153, 225, 0.1);
    }
    @keyframes pulse {
        0% { opacity: 0.6; }
        50% { opacity: 1; }
        100% { opacity: 0.6; }
    }
    .drag-indicator {
        position: absolute;
        width: 3px;
        background-color: var(--btn-bg-color);
        transition: all 0.2s ease;
        pointer-events: none;
        z-index: 1000;
        border-radius: 1.5px;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .drag-indicator::before {
        content: '';
        position: absolute;
        left: -3.5px;
        top: -7px;
        width: 10px;
        height: 10px;
        background-color: var(--btn-bg-color);
        border-radius: 50%;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
    .dragging {
        opacity: 0.6;
        transform: scale(1.02);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    }
    .folder-highlight {
        background-color: var(--focus-bg-color) !important;
        box-shadow: 0 0 0 2px var(--btn-bg-color);
        transition: all 0.2s ease;
    }
    .drag-over-left::before {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--btn-bg-color);
        opacity: 0.5;
    }
    .drag-over-right::after {
        content: '';
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: var(--btn-bg-color);
        opacity: 0.5;
    }
    .import-export-section {
        display: flex;
        gap: 8px;
        margin-right: 10px;
    }
    .folder-like-container {
        position: relative;
    }
    .folder-content {
        position: fixed;
        background-color: var(--folder-content-bg);
        border: 1px solid var(--folder-content-border);
        border-radius: 8px;
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
        z-index: 1000;
        padding: 6px 0;
        min-width: 150px;
    }
    .folder-item-content {
        padding: 8px 16px;
        cursor: pointer;
        white-space: nowrap;
        transition: background-color 0.2s;
    }
    .folder-item-content:hover {
        background-color: var(--folder-item-hover-bg);
    }
`;
document.head.appendChild(style);
