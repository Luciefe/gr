import { getContextMenuTarget, setContextMenuTarget } from './state.js';
import { showToast } from './utils.js';
import { addBookmark, addFolder, deleteItem as removeBookmarkItem, saveBookmarks, editItem as editBookmarkItem } from './bookmarks.js';
import { debouncedRenderBookmarks } from './ui.js';

export function showContextMenu(e, item) {
    e.preventDefault();
    e.stopPropagation();
    setContextMenuTarget(item);

    const contextMenu = document.getElementById('contextMenu');
    const addBookmarkItem = document.getElementById('addBookmark');
    const addFolderItem = document.getElementById('addFolder');
    const editItem = document.getElementById('editItem');
    const deleteItem = document.getElementById('deleteItem');

    if (item) {
        if (item.type === 'folder') {
            configureMenuForFolder(item, addBookmarkItem, addFolderItem, editItem, deleteItem);
        } else {
            configureMenuForBookmark(item, addBookmarkItem, addFolderItem, editItem, deleteItem);
        }
    } else {
        configureMenuForRoot(addBookmarkItem, addFolderItem, editItem, deleteItem);
    }

    const x = e.pageX;
    const y = e.pageY;
    contextMenu.style.display = 'block';

    const menuRect = contextMenu.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    let left = x;
    let top = y;

    if (x + menuRect.width > viewportWidth) {
        left = viewportWidth - menuRect.width - 5;
    }

    if (y + menuRect.height > viewportHeight) {
        top = viewportHeight - menuRect.height - 5;
    }

    contextMenu.style.left = `${left}px`;
    contextMenu.style.top = `${top}px`;

    setTimeout(() => {
        const closeMenu = (e) => {
            if (!contextMenu.contains(e.target)) {
                contextMenu.style.display = 'none';
                document.removeEventListener('click', closeMenu);
                document.removeEventListener('contextmenu', closeMenu);
            }
        };
        document.addEventListener('click', closeMenu);
        document.addEventListener('contextmenu', closeMenu);
    }, 0);
}

function configureMenuForFolder(folder, addBookmarkItem, addFolderItem, editItem, deleteBtn) {
    addBookmarkItem.style.display = 'block';
    addFolderItem.style.display = 'block';
    editItem.style.display = 'block';
    deleteBtn.style.display = 'block';
    
    editItem.textContent = '编辑文件夹';
    deleteBtn.textContent = '删除文件夹';
    
    // 保持当前文件夹作为父文件夹
    addBookmarkItem.onclick = () => {
        setContextMenuTarget(folder);
        document.getElementById('addBookmarkModal').style.display = 'block';
        hideContextMenu(true); // true表示保持目标
    };
    
    addFolderItem.onclick = () => {
        setContextMenuTarget(folder);
        document.getElementById('addFolderModal').style.display = 'block';
        hideContextMenu(true); // true表示保持目标
    };
    
    editItem.onclick = () => {
        const editModal = document.getElementById('editModal');
        const editForm = document.getElementById('editForm');
        const editTitle = document.getElementById('editTitle');
        const editName = document.getElementById('editName');
        const editUrl = document.getElementById('editUrl');
        
        editTitle.textContent = '编辑文件夹';
        editName.value = folder.name;
        editUrl.style.display = 'none';
        
        editForm.onsubmit = (e) => {
            e.preventDefault();
            const newName = editName.value;
            try {
                editBookmarkItem(folder, newName);
                saveBookmarks();
                debouncedRenderBookmarks();
                editModal.style.display = 'none';
                hideContextMenu();
                showToast('文件夹编辑成功');
            } catch (error) {
                showToast(error.message, 'error');
            }
        };
        
        editModal.style.display = 'block';
        hideContextMenu();
    };
    
    deleteBtn.onclick = () => {
        showDeleteConfirmation(
            `删除文件夹"${folder.name}"`,
            `确定要删除文件夹"${folder.name}"及其所有内容吗？此操作无法撤销。`,
            () => {
                removeBookmarkItem(folder);
                saveBookmarks();
                debouncedRenderBookmarks();
                hideContextMenu();
                showToast('文件夹已删除');
            }
        );
    };
}

function configureMenuForBookmark(bookmark, addBookmarkItem, addFolderItem, editItem, deleteBtn) {
    addBookmarkItem.style.display = 'none';
    addFolderItem.style.display = 'none';
    editItem.style.display = 'block';
    deleteBtn.style.display = 'block';
    
    editItem.textContent = '编辑书签';
    deleteBtn.textContent = '删除书签';
    
    editItem.onclick = () => {
        const editModal = document.getElementById('editModal');
        const editForm = document.getElementById('editForm');
        const editTitle = document.getElementById('editTitle');
        const editName = document.getElementById('editName');
        const editUrl = document.getElementById('editUrl');
        
        editTitle.textContent = '编辑书签';
        editName.value = bookmark.name;
        editUrl.style.display = 'block';
        editUrl.value = bookmark.url;
        
        editForm.onsubmit = (e) => {
            e.preventDefault();
            const newName = editName.value;
            const newUrl = editUrl.value;
            try {
                editBookmarkItem(bookmark, newName, newUrl);
                saveBookmarks();
                debouncedRenderBookmarks();
                editModal.style.display = 'none';
                hideContextMenu();
                showToast('书签编辑成功');
            } catch (error) {
                showToast(error.message, 'error');
            }
        };
        
        editModal.style.display = 'block';
        hideContextMenu();
    };
    
    deleteBtn.onclick = () => {
        showDeleteConfirmation(
            `删除书签"${bookmark.name}"`,
            `确定要删除书签"${bookmark.name}"吗？此操作无法撤销。`,
            () => {
                removeBookmarkItem(bookmark);
                saveBookmarks();
                debouncedRenderBookmarks();
                hideContextMenu();
                showToast('书签已删除');
            }
        );
    };
}

function configureMenuForRoot(addBookmarkItem, addFolderItem, editItem, deleteItem) {
    addBookmarkItem.style.display = 'block';
    addFolderItem.style.display = 'block';
    editItem.style.display = 'none';
    deleteItem.style.display = 'none';
    
    addBookmarkItem.onclick = () => {
        document.getElementById('addBookmarkModal').style.display = 'block';
        hideContextMenu();
    };
    
    addFolderItem.onclick = () => {
        document.getElementById('addFolderModal').style.display = 'block';
        hideContextMenu();
    };
}

export function hideContextMenu(keepTarget = false) {
    const contextMenu = document.getElementById('contextMenu');
    if (contextMenu) {
        contextMenu.style.display = 'none';
    }
    if (!keepTarget) {
        setContextMenuTarget(null);
    }
}

// 添加确认对话框函数
function showDeleteConfirmation(title, message, onConfirm) {
    const modal = document.createElement('div');
    modal.className = 'delete-confirm-modal';
    modal.innerHTML = `
        <div class="delete-confirm-content">
            <h2>${title}</h2>
            <p>${message}</p>
            <div class="delete-confirm-buttons">
                <button class="cancel-btn">取消</button>
                <button class="confirm-btn">确定删除</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // 动画效果
    requestAnimationFrame(() => {
        modal.classList.add('show');
    });
    
    modal.querySelector('.cancel-btn').onclick = () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.querySelector('.confirm-btn').onclick = () => {
        onConfirm();
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
    };
    
    modal.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('show');
            setTimeout(() => modal.remove(), 300);
        }
    };
}
