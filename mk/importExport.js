// 添加必要的导入语句和依赖库
import { saveBookmarks, renderBookmarks, bookmarks, showToast } from './bookmarkManager';

// 添加导入导出按钮
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
                <span class="close">&times;</span>
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
                <span class="close">&times;</span>
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

// 修改导入导出功能的处理函数
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
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
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
                    updateIds(bookmarks);
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
                    bookmarks = [...bookmarks, ...newBookmarks];
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

// 修改解析HTML书签的函数
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

// 导出为JSON格式
function exportAsJSON() {
    const bookmarksData = {
        version: '1.0',
        exportDate: new Date().toISOString(),
        bookmarks: bookmarks
    };
    downloadFile(
        JSON.stringify(bookmarksData, null, 2),
        `bookmarks_${new Date().toISOString().slice(0,10)}.json`,
        'application/json'
    );
    showToast('书签导出成功！');
}

// 导出为HTML格式
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
    createBookmarkHTML(bookmarks, dl);
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

// 通用文件下载函数
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