import { getBookmarks, saveBookmarks } from './bookmarks.js';
import { addDragListeners } from './dragDrop.js';
import { showContextMenu } from './contextMenu.js';
import { getCurrentUser, login, register } from './auth.js';
import { getFaviconUrl, showToast, debounce } from './utils.js';

function renderBookmarks(container = document.getElementById('bookmarkBar'), items = getBookmarks(), level = 0) {
    container.innerHTML = '';
    // 添加新的类名以区分根目录和子文件夹内容
    container.classList.toggle('subfolder-content', level > 0);
    items.forEach(item => {
        if (item.type === 'folder') {
            renderFolderItem(item, container, level);
        } else {
            renderBookmarkItem(item, container);
        }
    });
}

function renderFolderItem(folder, container, level) {
    const folderElem = document.createElement('div');
    folderElem.className = 'folder-item';
    folderElem.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F4C430">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <span>${folder.name}</span>
    `;
    
    folderElem.dataset.id = folder.id;
    addDragListeners(folderElem, folder);
    folderElem.addEventListener('contextmenu', (e) => showContextMenu(e, folder));
    folderElem.addEventListener('click', (e) => {
        e.stopPropagation();
        showFolderContent(e, folder, level);
    });
    
    container.appendChild(folderElem);
}

// onerror="this.onerror=null; this.src='${getFaviconUrl(item.url)}';">


function renderBookmarkItem(item, container) {
    const bookmarkElem = document.createElement('div');
    bookmarkElem.className = 'bookmark-item';
    bookmarkElem.innerHTML = `
        <img src="${item.icon}" 
             alt="${item.name}" 
             onerror="this.onerror=null; this.src='';">
        <span>${item.name}</span>
    `;
    
    bookmarkElem.dataset.id = item.id;
    addDragListeners(bookmarkElem, item);
    bookmarkElem.onclick = () => window.open(item.url, '_blank');
    bookmarkElem.addEventListener('contextmenu', (e) => showContextMenu(e, item));
    
    container.appendChild(bookmarkElem);
}

function showFolderContent(event, folder, level) {
    event.stopPropagation();
    const folderElem = event.currentTarget;
    
    if (folderElem.classList.contains('folder-focused')) {
        closeFolderWithAnimation(folderElem);
        return;
    }

    closeSiblingFolders(folderElem);
    openFolderWithAnimation(folderElem, folder, level);
}

function openFolderWithAnimation(folderElem, folder, level) {
    folderElem.classList.add('folder-focused');
    const content = createFolderContent(folderElem, folder, level);
    document.body.appendChild(content);
    
    requestAnimationFrame(() => {
        content.classList.add('show');
    });
    
    adjustFolderPosition(content, folderElem);
}

function closeFolderWithAnimation(folderElem) {
    const content = getFolderContent(folderElem);
    if (!content) return;
    
    content.classList.remove('show');
    content.addEventListener('transitionend', () => {
        content.remove();
    }, { once: true });
    
    folderElem.classList.remove('folder-focused');
}

function createFolderContent(folderElem, folder, level) {
    const content = document.createElement('div');
    content.className = 'folder-content';
    content.dataset.level = level;
    
    // 为子文件夹容器添加特殊样式
    if (level > 0) {
        content.classList.add('subfolder-content');
    }
    
    const folderRect = folderElem.getBoundingClientRect();
    content.style.left = `${folderRect.left}px`;
    content.style.top = `${folderRect.bottom}px`;
    
    renderBookmarks(content, folder.items, level + 1);
    return content;
}

function adjustFolderPosition(content, folderElem) {
    const contentRect = content.getBoundingClientRect();
    const folderRect = folderElem.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    let left = folderRect.left;
    if (contentRect.right > viewportWidth) {
        if (contentRect.width < folderRect.left) {
            left = folderRect.right - contentRect.width;
        } else {
            left = viewportWidth - contentRect.width - 10;
        }
    }
    
    let top = folderRect.bottom;
    if (contentRect.bottom > viewportHeight) {
        if (contentRect.height < folderRect.top) {
            top = folderRect.top - contentRect.height;
        } else {
            top = viewportHeight - contentRect.height - 10;
        }
    }
    
    content.style.left = `${left}px`;
    content.style.top = `${top}px`;
}

function closeSiblingFolders(folderElem) {
    const parent = folderElem.closest('.folder-content') || document.querySelector('.bookmark-bar');
    if (parent) {
        parent.querySelectorAll(':scope > .folder-item.folder-focused').forEach(closeFolder);
    }
}

function closeFolder(folderElem) {
    folderElem.classList.remove('folder-focused');
    
    const content = Array.from(document.querySelectorAll('.folder-content')).find(content => {
        const rect = content.getBoundingClientRect();
        const folderRect = folderElem.getBoundingClientRect();
        return Math.abs(rect.left - folderRect.left) < 5 && Math.abs(rect.top - folderRect.bottom) < 5;
    });
    
    if (content) {
        content.querySelectorAll('.folder-focused').forEach(elem => {
            closeFolder(elem);
        });
        content.remove();
    }
}

function closeAllFolders() {
    document.querySelectorAll('.folder-content').forEach(content => content.remove());
    document.querySelectorAll('.folder-focused').forEach(elem => {
        elem.classList.remove('folder-focused');
    });
}

function getFolderContent(folderElem) {
    return Array.from(document.querySelectorAll('.folder-content')).find(content => {
        const rect = content.getBoundingClientRect();
        const folderRect = folderElem.getBoundingClientRect();
        return Math.abs(rect.left - folderRect.left) < 5 && Math.abs(rect.top - folderRect.bottom) < 5;
    });
}

function showAuthModal(type) {
    const modal = document.getElementById('authModal');
    const title = document.getElementById('authTitle');
    const submitBtn = document.getElementById('submitBtn');
    const errorMessage = document.querySelector('.error-message') || 
        (() => {
            const err = document.createElement('div');
            err.className = 'error-message';
            document.getElementById('authForm').appendChild(err);
            return err;
        })();

    title.textContent = type === 'login' ? '登录' : '注册';
    submitBtn.textContent = type === 'login' ? '登录' : '注册';
    errorMessage.textContent = '';

    modal.style.display = 'block';
    document.getElementById('usernameInput').focus();
}

async function handleAuthSubmit(event) {
    event.preventDefault();
    const username = document.getElementById('usernameInput').value.trim();
    const password = document.getElementById('passwordInput').value;
    const type = document.getElementById('authTitle').textContent === '登录' ? 'login' : 'register';
    const errorMessage = document.querySelector('.error-message');

    if (!username || !password) {
        errorMessage.textContent = '用户名和密码不能为空';
        return;
    }

    try {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = type === 'login' ? '登录中...' : '注册中...';
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (type === 'login') {
            const success = login(username, password);
            if (success) {
                updateUserSection();
                document.getElementById('authModal').style.display = 'none';
            } else {
                throw new Error('用户名或密码错误');
            }
        } else {
            const success = register(username, password);
            if (success) {
                updateUserSection();
                document.getElementById('authModal').style.display = 'none';
            } else {
                throw new Error('用户名已存在');
            }
        }
    } catch (error) {
        errorMessage.textContent = `${type === 'login' ? '登录' : '注册'}失败: ${error.message}`;
    } finally {
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = false;
        submitBtn.textContent = type === 'login' ? '登录' : '注册';
    }
}

function updateUserSection() {
    const loginBtn = document.getElementById('loginBtn');
    const registerBtn = document.getElementById('registerBtn');
    const userMenu = document.getElementById('userMenu');
    const username = document.getElementById('username');

    if (getCurrentUser()) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        username.textContent = getCurrentUser().username;
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userMenu.style.display = 'none';
    }
}

const debouncedRenderBookmarks = debounce(renderBookmarks, 100);

function addImportExportButtons() {
    const bookmarkBar = document.getElementById('bookmarkBar');
    const userSection = document.getElementById('userSection');
    
    const importExportDiv = document.createElement('div');
    importExportDiv.className = 'import-export-section';
    importExportDiv.innerHTML = `
        <button id="exportBtn" class="auth-btn">导出书签</button>
        <button id="importBtn" class="auth-btn">导入书签</button>
        <input type="file" id="importInput" accept=".json,.html" style="display: none;">
    `;
    
    const modalHTML = `
        <div id="exportModal" class="modal">
            <div class="modal-content">
                <span class="close">×</span>
                <h2>选择导出格式</h2>
                <div class="modal-options">
                    <div class="modal-option" data-type="json">
                        <h3>JSON格式</h3>
                        <p>导出为本应用专用格式，保留所有数据</p>
                    </div>
                    <div class="modal-option" data-type="chrome">
                        <h3>Chrome格式</h3>
                        <p>导出为Chrome浏览器可导入的格式</p>
                    </div>
                    <div class="modal-option" data-type="firefox">
                        <h3>Firefox格式</h3>
                        <p>导出为Firefox浏览器可导入的格式</p>
                    </div>
                    <div class="modal-option" data-type="edge">
                        <h3>Edge格式</h3>
                        <p>导出为Edge浏览器可导入的格式</p>
                    </div>
                    <div class="modal-option" data-type="brave">
                        <h3>Brave格式</h3>
                        <p>导出为Brave浏览器可导入的格式</p>
                    </div>
                    <div class="modal-option" data-type="html">
                        <h3>通用HTML格式</h3>
                        <p>导出为通用HTML格式，适用于大多数浏览器</p>
                    </div>
                </div>
            </div>
        </div>
        <div id="importModal" class="modal">
            <div class="modal-content">
                <span class="close">×</span>
                <h2>选择导入方式</h2>
                <div class="modal-options">
                    <div class="modal-option" data-type="json">
                        <h3>导入JSON文件</h3>
                        <p>导入本应用导出的书签文件</p>
                    </div>
                    <div class="modal-option" data-type="chrome">
                        <h3>从Chrome导入</h3>
                        <p>导入Chrome浏览器的书签文件</p>
                    </div>
                    <div class="modal-option" data-type="firefox">
                        <h3>从Firefox导入</h3>
                        <p>导入Firefox浏览器的书签文件</p>
                    </div>
                    <div class="modal-option" data-type="edge">
                        <h3>从Edge导入</h3>
                        <p>导入Edge浏览器的书签文件</p>
                    </div>
                    <div class="modal-option" data-type="brave">
                        <h3>从Brave导入</h3>
                        <p>导入Brave浏览器的书签文件</p>
                    </div>
                    <div class="modal-option" data-type="html">
                        <h3>导入通用HTML文件</h3>
                        <p>导入通用HTML格式的书签文件</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', modalHTML);
    userSection.parentNode.insertBefore(importExportDiv, userSection);
}

function initializeImportExport() {
    const exportBtn = document.getElementById('exportBtn');
    const importBtn = document.getElementById('importBtn');
    const exportModal = document.getElementById('exportModal');
    const importModal = document.getElementById('importModal');
    const importInput = document.getElementById('importInput');

    exportBtn.addEventListener('click', () => {
        exportModal.style.display = 'block';
    });

    importBtn.addEventListener('click', () => {
        importModal.style.display = 'block';
    });

    exportModal.querySelectorAll('.modal-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const exportType = option.dataset.type;
            
            switch(exportType) {
                case 'json':
                    exportAsJSON();
                    break;
                case 'chrome':
                case 'firefox':
                case 'edge':
                case 'brave':
                case 'html':
                    exportAsHTML(exportType);
                    break;
            }
            
            exportModal.style.display = 'none';
        });
    });

    importModal.querySelectorAll('.modal-option').forEach(option => {
        option.addEventListener('click', () => {
            const importType = option.dataset.type;
            
            if (importType === 'json') {
                importInput.accept = '.json';
            } else {
                importInput.accept = '.html';
            }
            importInput.click();
            importModal.style.display = 'none';
        });
    });

    importInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                let importedBookmarks;
                
                if (file.name.endsWith('.json')) {
                    const importedData = JSON.parse(event.target.result);
                    if (!Array.isArray(importedData.bookmarks)) {
                        throw new Error('无效的书签数据格式');
                    }
                    importedBookmarks = importedData.bookmarks;
                } else if (file.name.endsWith('.html')) {
                    importedBookmarks = await parseBookmarkHTML(event.target.result);
                }

                if (confirm('是否将导入的书签添加到现有书签中？')) {
                    let maxId = 0;
                    function updateIds(items) {
                        items.forEach(item => {
                            maxId = Math.max(maxId, item.id);
                            if (item.type === 'folder' && item.items) {
                                updateIds(item.items);
                            }
                        });
                    }
                    updateIds(getBookmarks());

                    function reassignIds(items) {
                        return items.map(item => {
                            const newItem = { ...item, id: ++maxId };
                            if (newItem.type === 'folder' && newItem.items) {
                                newItem.items = reassignIds(newItem.items);
                            }
                            return newItem;
                        });
                    }

                    const newBookmarks = reassignIds(importedBookmarks);
                    setBookmarks([...getBookmarks(), ...newBookmarks]);
                    
                    renderBookmarks();
                    saveBookmarks();
                    showToast('书签导入成功！');
                }
            } catch (error) {
                showToast('导入失败：' + error.message, 'error');
                console.error('Import error:', error);
            }
            
            importInput.value = '';
        };

        reader.onerror = () => {
            showToast('读取文件失败', 'error');
            importInput.value = '';
        };

        reader.readAsText(file);
    });
}

function exportAsJSON() {
    const bookmarksData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        bookmarks: getBookmarks()
    };
    
    downloadFile(
        JSON.stringify(bookmarksData, null, 2),
        `bookmarks_${new Date().toISOString().slice(0,10)}.json`,
        'application/json'
    );
    showToast('书签导出成功！');
}

function exportAsHTML(browserType) {
    const doc = document.implementation.createHTMLDocument('Bookmarks');
    const head = doc.createElement('head');
    const meta = doc.createElement('meta');
    meta.setAttribute('charset', 'UTF-8');
    head.appendChild(meta);
    doc.documentElement.appendChild(head);

    const title = doc.createElement('title');
    title.textContent = '书签';
    head.appendChild(title);

    const body = doc.createElement('body');
    const h1 = doc.createElement('h1');
    h1.textContent = '书签';
    body.appendChild(h1);

    function createBookmarkHTML(items, dl) {
        items.forEach(item => {
            const dt = doc.createElement('dt');
            
            if (item.type === 'folder') {
                const h3 = doc.createElement('h3');
                h3.textContent = item.name;
                dt.appendChild(h3);
                
                const subDl = doc.createElement('dl');
                createBookmarkHTML(item.items, subDl);
                dt.appendChild(subDl);
            } else {
                const a = doc.createElement('a');
                a.href = item.url;
                a.textContent = item.name;
                if (['chrome', 'brave'].includes(browserType)) {
                    a.setAttribute('add_date', Math.floor(Date.now() / 1000));
                    a.setAttribute('icon', item.icon);
                }
                dt.appendChild(a);
            }
            
            dl.appendChild(dt);
        });
    }

    const dl = doc.createElement('dl');
    createBookmarkHTML(getBookmarks(), dl);
    body.appendChild(dl);
    doc.documentElement.appendChild(body);

    const html = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' + 
                '<!-- This is an automatically generated file.\n' +
                '     It will be read and overwritten.\n' +
                '     DO NOT EDIT! -->\n' +
                doc.documentElement.outerHTML;

    const browserNames = {
        chrome: 'Chrome',
        firefox: 'Firefox',
        edge: 'Edge',
        brave: 'Brave',
        html: 'HTML'
    };

    downloadFile(
        html,
        `bookmarks_${browserNames[browserType]}_${new Date().toISOString().slice(0,10)}.html`,
        'text/html'
    );
    showToast(`已导出为${browserNames[browserType]}格式！`);
}

function downloadFile(content, filename, type) {
    const blob = new Blob([content], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function parseBookmarkHTML(html) {
    return new Promise((resolve, reject) => {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bookmarkList = [];
            let nextId = 1;

            function processNode(node) {
                if (!node || !node.tagName) return null;

                if (node.tagName === 'DT') {
                    const h3 = node.querySelector(':scope > H3');
                    if (h3) {
                        const folder = {
                            id: nextId++,
                            type: 'folder',
                            name: h3.textContent.trim(),
                            items: []
                        };

                        const dl = node.querySelector(':scope > DL');
                        if (dl) {
                            for (const child of dl.children) {
                                const item = processNode(child);
                                if (item) {
                                    folder.items.push(item);
                                }
                            }
                        }
                        return folder;
                    }

                    const link = node.querySelector(':scope > A');
                    if (link) {
                        return {
                            id: nextId++,
                            type: 'bookmark',
                            name: link.textContent.trim(),
                            url: link.href,
                            icon: link.getAttribute('icon') || getFaviconUrl(link.href)
                        };
                    }
                }
                return null;
            }

            const mainDL = doc.querySelector('DL');
            if (!mainDL) {
                throw new Error('未找到有效的书签数据');
            }

            for (const child of mainDL.children) {
                const item = processNode(child);
                if (item) {
                    bookmarkList.push(item);
                }
            }

            if (bookmarkList.length === 0) {
                throw new Error('未找到有效的书签数据');
            }

            resolve(bookmarkList);
        } catch (error) {
            reject(new Error('解析书签文件失败: ' + error.message));
        }
    });
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// 添加子文件夹布局的样式
const subfolderStyle = document.createElement('style');
subfolderStyle.textContent = `
    .subfolder-content {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: center;
        gap: 8px;
        padding: 8px;
        white-space: nowrap;
        overflow-x: auto;
        max-width: 500px; /* 这里控制最大宽度 */
        min-width: 200px; /* 这里控制最小宽度 */
    }
    
    .subfolder-content::-webkit-scrollbar {
        height: 6px;
    }
    
    .subfolder-content::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.1);
        border-radius: 3px;
    }
    
    .subfolder-content::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.2);
        border-radius: 3px;
    }
    
    .subfolder-content::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.3);
    }
    
    .subfolder-content .bookmark-item,
    .subfolder-content .folder-item {
        flex-shrink: 0;
    }
`;
document.head.appendChild(subfolderStyle);

export { 
    renderBookmarks, 
    debouncedRenderBookmarks, 
    showAuthModal, 
    handleAuthSubmit, 
    updateUserSection, 
    showFolderContent, 
    closeAllFolders, 
    closeAllModals, 
    addImportExportButtons, 
    initializeImportExport 
};
