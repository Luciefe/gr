// 添加必要的导入语句和依赖库
import { bookmarks, saveBookmarks, renderBookmarks, showToast } from './bookmarkManager';

// 右键菜单相关函数
function showContextMenu(e, item) {
    e.preventDefault();
    e.stopPropagation();
    contextMenuTarget = item;
    const contextMenu = document.getElementById('contextMenu');
    const addBookmarkItem = document.getElementById('addBookmark');
    const addFolderItem = document.getElementById('addFolder');
    const editItem = document.getElementById('editItem');
    const deleteItem = document.getElementById('deleteItem');
    if (item) {
        if (item.type === 'folder') {
            addBookmarkItem.style.display = 'block';
            addFolderItem.style.display = 'block';
            editItem.style.display = 'block';
            deleteItem.style.display = 'block';
            editItem.textContent = '编辑文件夹';
            deleteItem.textContent = '删除文件夹';
        } else {
            addBookmarkItem.style.display = 'none';
            addFolderItem.style.display = 'none';
            editItem.style.display = 'block';
            deleteItem.style.display = 'block';
            editItem.textContent = '编辑书签';
            deleteItem.textContent = '删除书签';
        }
    } else {
        addBookmarkItem.style.display = 'block';
        addFolderItem.style.display = 'block';
        editItem.style.display = 'none';
        deleteItem.style.display = 'none';
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

function hideContextMenu() {
    const contextMenu = document.getElementById('contextMenu');
    contextMenu.style.display = 'none';
}
