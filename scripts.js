// 全局变量
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

let currentUser = null;
let users = [
    {
        id: uuidv4(),
        username: 'demo',
        password: bcrypt.hashSync('password', 10),
        role: 'user',
        created_at: new Date(),
        last_login: null
    }
];

let bookmarks = [
    {
        id: uuidv4(),
        type: 'folder',
        name: '常用网站',
        description: '常用网站收藏夹',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['常用', '收藏'],
        access: 'private',
        visit_count: 0,
        items: [
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '百度',
                url: 'https://www.baidu.com',
                icon: 'https://www.baidu.com/favicon.ico',
                description: '中国最大的搜索引擎',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['搜索引擎'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '淘宝',
                url: 'https://www.taobao.com',
                icon: 'https://www.taobao.com/favicon.ico',
                description: '中国最大的购物网站',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['购物'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '京东',
                url: 'https://www.jd.com',
                icon: 'https://www.jd.com/favicon.ico',
                description: '中国领先的电商平台',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['电商'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '哔哩哔哩',
                url: 'https://www.bilibili.com',
                icon: 'https://www.bilibili.com/favicon.ico',
                description: '中国最大的二次元社区',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['视频', '二次元'],
                visit_count: 0
            }
        ]
    },
    {
        id: uuidv4(),
        type: 'folder',
        name: '新闻资讯',
        description: '新闻资讯收藏夹',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['新闻', '资讯'],
        access: 'private',
        visit_count: 0,
        items: [
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '腾讯新闻',
                url: 'https://news.qq.com',
                icon: 'https://news.qq.com/favicon.ico',
                description: '腾讯新闻',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['新闻'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '新浪新闻',
                url: 'https://news.sina.com.cn',
                icon: 'https://news.sina.com.cn/favicon.ico',
                description: '新浪新闻',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['新闻'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '网易新闻',
                url: 'https://news.163.com',
                icon: 'https://news.163.com/favicon.ico',
                description: '网易新闻',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['新闻'],
                visit_count: 0
            }
        ]
    },
    {
        id: uuidv4(),
        type: 'folder',
        name: '视频娱乐',
        description: '视频娱乐收藏夹',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['视频', '娱乐'],
        access: 'private',
        visit_count: 0,
        items: [
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '优酷',
                url: 'https://www.youku.com',
                icon: 'https://www.youku.com/favicon.ico',
                description: '优酷视频',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['视频'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '腾讯视频',
                url: 'https://v.qq.com',
                icon: 'https://v.qq.com/favicon.ico',
                description: '腾讯视频',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['视频'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '爱奇艺',
                url: 'https://www.iqiyi.com',
                icon: 'https://www.iqiyi.com/favicon.ico',
                description: '爱奇艺视频',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['视频'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'folder',
                name: '直播平台',
                description: '直播平台收藏夹',
                created_at: new Date(),
                updated_at: new Date(),
                created_by: users[0].id,
                tags: ['直播'],
                access: 'private',
                visit_count: 0,
                items: [
                    {
                        id: uuidv4(),
                        type: 'bookmark',
                        name: '斗鱼',
                        url: 'https://www.douyu.com',
                        icon: 'https://www.douyu.com/favicon.ico',
                        description: '斗鱼直播',
                        created_at: new Date(),
                        updated_at: new Date(),
                        tags: ['直播'],
                        visit_count: 0
                    },
                    {
                        id: uuidv4(),
                        type: 'bookmark',
                        name: '虎牙',
                        url: 'https://www.huya.com',
                        icon: 'https://www.huya.com/favicon.ico',
                        description: '虎牙直播',
                        created_at: new Date(),
                        updated_at: new Date(),
                        tags: ['直播'],
                        visit_count: 0
                    },
                    {
                        id: uuidv4(),
                        type: 'bookmark',
                        name: '抖音直播',
                        url: 'https://live.douyin.com',
                        icon: 'https://live.douyin.com/favicon.ico',
                        description: '抖音直播',
                        created_at: new Date(),
                        updated_at: new Date(),
                        tags: ['直播'],
                        visit_count: 0
                    }
                ]
            }
        ]
    },
    {
        id: uuidv4(),
        type: 'folder',
        name: '工具网站',
        description: '工具网站收藏夹',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['工具'],
        access: 'private',
        visit_count: 0,
        items: [
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '有道翻译',
                url: 'https://fanyi.youdao.com',
                icon: 'https://fanyi.youdao.com/favicon.ico',
                description: '有道翻译',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['翻译'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '百度地图',
                url: 'https://map.baidu.com',
                icon: 'https://map.baidu.com/favicon.ico',
                description: '百度地图',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['地图'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '12306',
                url: 'https://www.12306.cn',
                icon: 'https://www.12306.cn/favicon.ico',
                description: '12306',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['火车票'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '天气预报',
                url: 'https://tianqi.qq.com',
                icon: 'https://tianqi.qq.com/favicon.ico',
                description: '天气预报',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['天气'],
                visit_count: 0
            }
        ]
    },
    {
        id: uuidv4(),
        type: 'folder',
        name: '学习资源',
        description: '学习资源收藏夹',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['学习'],
        access: 'private',
        visit_count: 0,
        items: [
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '中国大学MOOC',
                url: 'https://www.icourse163.org',
                icon: 'https://www.icourse163.org/favicon.ico',
                description: '中国大学MOOC',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['学习'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '菜鸟教程',
                url: 'https://www.runoob.com',
                icon: 'https://www.runoob.com/favicon.ico',
                description: '菜鸟教程',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['教程'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: 'CSDN',
                url: 'https://www.csdn.net',
                icon: 'https://www.csdn.net/favicon.ico',
                description: 'CSDN',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['编程'],
                visit_count: 0
            },
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '掘金',
                url: 'https://juejin.cn',
                icon: 'https://juejin.cn/favicon.ico',
                description: '掘金',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['编程'],
                visit_count: 0
            }
        ]
    },
    {
        id: uuidv4(),
        type: 'bookmark',
        name: '知乎',
        url: 'https://www.zhihu.com',
        icon: 'https://www.zhihu.com/favicon.ico',
        description: '知乎',
        created_at: new Date(),
        updated_at: new Date(),
        tags: ['问答'],
        visit_count: 0
    },
    {
        id: uuidv4(),
        type: 'bookmark',
        name: '微博',
        url: 'https://weibo.com',
        icon: 'https://weibo.com/favicon.ico',
        description: '微博',
        created_at: new Date(),
        updated_at: new Date(),
        tags: ['社交'],
        visit_count: 0
    },
    {
        id: uuidv4(),
        type: 'bookmark',
        name: '豆瓣',
        url: 'https://www.douban.com',
        icon: 'https://www.douban.com/favicon.ico',
        description: '豆瓣',
        created_at: new Date(),
        updated_at: new Date(),
        tags: ['社交'],
        visit_count: 0
    }
];

let currentFocusedFolder = null;
let draggedItem = null;
let dragTarget = null;
let dragIndicator = null;
let contextMenuTarget = null;

// 函数
function isInFolderDropZone(e, target) {
    if (!target?.classList.contains('folder-item')) return false;
    const rect = target.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    return mouseY > rect.height * 0.25 && mouseY < rect.height * 0.75;
}

function isOverLeftHalf(e, target) {
    if (!target) return false;
    const rect = target.getBoundingClientRect();
    return e.clientX < rect.left + rect.width / 2;
}

function removeItemFromParent(item, parentArray) {
    const index = parentArray.findIndex(i => i.id === item.id);
    if (index !== -1) {
        parentArray.splice(index, 1);
    }
}

function moveItemInArray(array, movedItem, targetItem, insertBefore) {
    const movedIndex = array.findIndex(item => item.id === movedItem.id);
    let targetIndex = array.findIndex(item => item.id === targetItem.id);
    
    if (movedIndex < targetIndex && !insertBefore) {
        targetIndex--;
    }
    
    array.splice(movedIndex, 1);
    array.splice(insertBefore ? targetIndex : targetIndex + 1, 0, movedItem);
}

function insertItemNear(item, targetItem, array, insertBefore) {
    const targetIndex = array.findIndex(i => i.id === targetItem.id);
    array.splice(insertBefore ? targetIndex : targetIndex + 1, 0, item);
}

function findParentFolder(item, currentItems = bookmarks) {
    for (let currentItem of currentItems) {
        if (currentItem.type === 'folder') {
            if (currentItem.items.some(i => i.id === item.id)) {
                return currentItem;
            }
            const nestedResult = findParentFolder(item, currentItem.items);
            if (nestedResult) {
                return nestedResult;
            }
        }
    }
    return null;
}

// 认证关函数
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
        //    拟服务器请求延迟
        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.textContent = type === 'login' ? '登录中...' : '注册中...';
        
        await new Promise(resolve => setTimeout(resolve, 1000));

        if (type === 'login') {
            const user = users.find(u => u.username === username && bcrypt.compareSync(password, u.password));
            if (user) {
                currentUser = { username };
                updateUserSection();
                document.getElementById('authModal').style.display = 'none';
                showToast('登录成功！');
            } else {
                throw new Error('用户名或密码错误');
            }
        } else {
            if (users.some(u => u.username === username)) {
                throw new Error('用户名已存在');
            }
            users.push({ id: uuidv4(), username, password: bcrypt.hashSync(password, 10), role: 'user', created_at: new Date(), last_login: null });
            currentUser = { username };
            updateUserSection();
            document.getElementById('authModal').style.display = 'none';
            showToast('注册成功！');
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

    if (currentUser) {
        loginBtn.style.display = 'none';
        registerBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        username.textContent = currentUser.username;
    } else {
        loginBtn.style.display = 'inline-block';
        registerBtn.style.display = 'inline-block';
        userMenu.style.display = 'none';
    }
}

function handleLogout() {
    currentUser = null;
    updateUserSection();
}

// 书签管理相关函数
function renderBookmarks(container = document.getElementById('bookmarkBar'), items = bookmarks, level = 0) {
    container.innerHTML = '';
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
    
    initDragListeners(folderElem, folder);
    folderElem.addEventListener('contextmenu', (e) => showContextMenu(e, folder));
    
    // 所有层级都使用点击事件
    folderElem.addEventListener('click', (e) => {
        e.stopPropagation(); // 阻止事件冒泡
        showFolderContent(e, folder, level);
    });
    
    container.appendChild(folderElem);
}

function renderBookmarkItem(item, container) {
    const bookmarkElem = document.createElement('div');
    bookmarkElem.className = 'bookmark-item';
    bookmarkElem.innerHTML = `
        <img src="${item.icon}" 
             alt="${item.name}" 
             onerror="this.onerror=null; this.src='${getFaviconUrl(item.url)}';">
        <span>${item.name}</span>
    `;
    
    initDragListeners(bookmarkElem, item);
    bookmarkElem.onclick = () => {
        window.open(item.url, '_blank');
        incrementVisitCount(item.id);
    };
    bookmarkElem.addEventListener('contextmenu', (e) => showContextMenu(e, item));
    
    container.appendChild(bookmarkElem);
}

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

function findItemPath(item, items = bookmarks, path = []) {
    for (let i = 0; i < items.length; i++) {
        if (items[i].id === item.id) {
            return [...path, i];
        }
        if (items[i].type === 'folder' && items[i].items) {
            const foundPath = findItemPath(item, items[i].items, [...path, i]);
            if (foundPath) return foundPath;
        }
    }
    return null;
}

function dragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    const target = e.currentTarget;
    
    // 清除所有拖拽指示器
    document.querySelectorAll('.drag-indicator').forEach(el => el.remove());
    document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
    
    // 如果是拖到自己身上，不显示指示器
    if (draggedItem && draggedItem.id === target.dataset.id) {
        return;
    }
    
    target.classList.add('drag-over');
    
    if (target.classList.contains('folder-item') && isInFolderDropZone(e, target)) {
        target.classList.add('drag-over-folder');
        target.classList.remove('drag-over-top', 'drag-over-bottom');
        
        // 添加文件夹提示
        const indicator = document.createElement('div');
        indicator.className = 'folder-drop-indicator';
        target.appendChild(indicator);
    } else {
        target.classList.remove('drag-over-folder');
        
        //        建拖拽指示器
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
    
    // 移除文件夹提示
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
    // 确保关闭所有文件夹
    closeAllFolders();
}

function drop(e, targetItem) {
    if (!draggedItem || draggedItem === targetItem) return;
    e.preventDefault();
    e.stopPropagation();
    
    try {
        const sourceParent = findParentFolder(draggedItem);
        const targetParent = findParentFolder(targetItem);
        
        // 检查文件夹移动的有效性
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

function handleFolderDrop(targetItem) {
    if (draggedItem.type === 'folder' && isSubfolder(draggedItem, targetItem)) {
        throw new Error('不能将文件夹移动到其子文件夹中');
    }
    targetItem.items.push(draggedItem);
    showToast(`已移动到 "${targetItem.name}" 文件夹`);
}

function handleSortDrop(targetItem, targetParent, e) {
    const targetContainer = targetParent ? targetParent.items : bookmarks;
    const targetIndex = targetContainer.findIndex(item => item.id === targetItem.id);
    const insertIndex = isOverLeftHalf(e, dragTarget) ? targetIndex : targetIndex + 1;
    targetContainer.splice(insertIndex, 0, draggedItem);
}

function cleanupDrag() {
    draggedItem = null;
    dragTarget = null;
    document.body.classList.remove('dragging-active');
    clearDragIndicators();
}

// 辅助函数：检查是否是子文件夹
function isSubfolder(parentFolder, childFolder) {
    if (parentFolder.id === childFolder.id) return true;
    if (childFolder.type !== 'folder') return false;
    return childFolder.items.some(item => isSubfolder(parentFolder, item));
}

// 右键菜单相关函数
function showContextMenu(e, item) {
    e.preventDefault();
    e.stopPropagation(); // 阻止事件冒泡
    contextMenuTarget = item;
    const contextMenu = document.getElementById('contextMenu');
    const addBookmarkItem = document.getElementById('addBookmark');
    const addFolderItem = document.getElementById('addFolder');
    const editItem = document.getElementById('editItem');
    const deleteItem = document.getElementById('deleteItem');

    // 根据上下文调整菜单项显示
    if (item) {
        // 如果是文件夹
        if (item.type === 'folder') {
            addBookmarkItem.style.display = 'block';
            addFolderItem.style.display = 'block';
            editItem.style.display = 'block';
            deleteItem.style.display = 'block';
            editItem.textContent = '编辑文件夹';
            deleteItem.textContent = '删除文件夹';
        } 
        // 如果是书签
        else {
            addBookmarkItem.style.display = 'none';
            addFolderItem.style.display = 'none';
            editItem.style.display = 'block';
            deleteItem.style.display = 'block';
            editItem.textContent = '编辑书签';
            deleteItem.textContent = '删除书签';
        }
    } 
    // 如果是在空白处右键
    else {
        addBookmarkItem.style.display = 'block';
        addFolderItem.style.display = 'block';
        editItem.style.display = 'none';
        deleteItem.style.display = 'none';
    }

    // 设置菜单位置
    const x = e.pageX;
    const y = e.pageY;
    contextMenu.style.display = 'block';
    
    // 确保菜单不会超出视窗
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

    // 添加一次性点击事件监听器来关闭菜单
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

// 文件夹内容显示/隐藏函数
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
    
    // 强制重排后添加动画类
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
    
    // 优化水平位置
    let left = folderRect.left;
    if (contentRect.right > viewportWidth) {
        // 如果右侧溢出，尝试显示在左侧
        if (contentRect.width < folderRect.left) {
            left = folderRect.right - contentRect.width;
        } else {
            // 如果左侧空间不够，则贴近右边界
            left = viewportWidth - contentRect.width - 10;
        }
    }
    
    // 优化垂直位置
    let top = folderRect.bottom;
    if (contentRect.bottom > viewportHeight) {
        // 如果底部溢出，尝试显  在上方
        if (contentRect.height < folderRect.top) {
            top = folderRect.top - contentRect.height;
        } else {
            // 如果上方空间不够，则最大化显示区域
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

// 新增关闭单个文件夹的   数
function closeFolder(folderElem) {
    // 移除文件夹高亮
    folderElem.classList.remove('folder-focused');
    
    // 查找并移除文件夹内容
    const content = Array.from(document.querySelectorAll('.folder-content')).find(content => {
        const rect = content.getBoundingClientRect();
        const folderRect = folderElem.getBoundingClientRect();
        return Math.abs(rect.left - folderRect.left) < 5 && Math.abs(rect.top - folderRect.bottom) < 5;
    });
    
    if (content) {
        // 递归关闭所有子文件夹
        content.querySelectorAll('.folder-focused').forEach(elem => {
            closeFolder(elem);
        });
        content.remove();
    }
}

// 修改关闭所有文件夹的函数
function closeAllFolders() {
    // 移除所有文件夹内容
    document.querySelectorAll('.folder-content').forEach(content => content.remove());
    // 移除所有文件夹高亮
    document.querySelectorAll('.folder-focused').forEach(elem => {
        elem.classList.remove('folder-focused');
    });
}

// 修改文档点击事件处理函数
function handleDocumentClick(e) {
    // 如果点击的不是文件夹项目或文件夹内容，则关闭所有文件夹
    if (!e.target.closest('.folder-item') && !e.target.closest('.folder-content')) {
        closeAllFolders();
    }
}

// 初始化函数
function initialize() {
    renderBookmarks();
    updateUserSection();

    // 添加事件监听器
    document.getElementById('loginBtn').addEventListener('click', () => showAuthModal('login'));
    document.getElementById('registerBtn').addEventListener('click', () => showAuthModal('register'));
    document.getElementById('authForm').addEventListener('submit', handleAuthSubmit);
    document.getElementById('logoutBtn').addEventListener('click', handleLogout);

    // 键菜单事件监听
    document.getElementById('addBookmark').addEventListener('click', () => {
        document.getElementById('addBookmarkModal').style.display = 'block';
        hideContextMenu();
    });

    document.getElementById('addFolder').addEventListener('click', () => {
        document.getElementById('addFolderModal').style.display = 'block';
        hideContextMenu();
    });

    // 编辑和删除事件监听
    document.getElementById('editItem').addEventListener('click', () => {
        if (contextMenuTarget) {
            editItem(contextMenuTarget);
            hideContextMenu();
        }
    });

    document.getElementById('deleteItem').addEventListener('click', () => {
        if (contextMenuTarget) {
            if (confirm('确定要删除吗？')) {
                deleteItem(contextMenuTarget);
                hideContextMenu();
            }
        }
    });

    // 添加书签表单提交事件
    document.getElementById('addBookmarkForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('bookmarkName').value;
        const url = document.getElementById('bookmarkUrl').value;
        
        if (contextMenuTarget && contextMenuTarget.type === 'folder') {
            addBookmark(name, url, contextMenuTarget);
        } else {
            addBookmark(name, url);
        }
        
        document.getElementById('addBookmarkModal').style.display = 'none';
        document.getElementById('addBookmarkForm').reset();
    });

    // 添加文件夹表单提交事件
    document.getElementById('addFolderForm').addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('folderName').value;
        
        if (contextMenuTarget && contextMenuTarget.type === 'folder') {
            addFolder(name, contextMenuTarget);
        } else {
            addFolder(name);
        }
        
        document.getElementById('addFolderModal').style.display = 'none';
        document.getElementById('addFolderForm').reset();
    });

    // 关闭模态框事件
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
            const form = closeBtn.closest('.modal').querySelector('form');
            if (form) form.reset();
        });
    });

    // 点击模态框外部关闭
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
                const form = modal.querySelector('form');
                if (form) form.reset();
            }
        });
    });

    // 书签右键菜单
    document.getElementById('bookmarkBar').addEventListener('contextmenu', (e) => {
        if (e.target === e.currentTarget) {
            showContextMenu(e, null);
        }
    });

    // 全点击事件关闭件夹
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.folder-item') && !e.target.closest('.folder-content')) {
            closeAllFolders();
        }
    });

    // 数据持久化
    loadBookmarks();
    window.addEventListener('beforeunload', saveBookmarks);

    // 添加导入导出按钮
    addImportExportButtons();
    
    // 添加导入导出样式
    const style = document.createElement('style');
    style.textContent = `
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

        .auth-btn {
            padding: 5px 10px;
            font-size: 12px;
            background-color: var(--btn-bg-color);
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            transition: all 0.2s ease;
        }

        .auth-btn:hover {
            background-color: var(--btn-hover-bg-color);
        }

        .auth-btn.active {
            background-color: var(--focus-bg-color);
            box-shadow: 0 0 0 2px var(--focus-shadow-color);
        }
    `;
    document.head.appendChild(style);
    
    // 初始化导入导出功能
    initializeImportExport();

    // 添加文档点击事件监听
    document.addEventListener('click', handleDocumentClick);
}

// 数据持久化函数
function saveBookmarks() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
}

function loadBookmarks() {
    const savedBookmarks = localStorage.getItem('bookmarks');
    if (savedBookmarks) {
        bookmarks = JSON.parse(savedBookmarks);
        renderBookmarks();
    }
}

// 添加书签函数
function addBookmark(name, url, parentFolder = null) {
    try {
        validateBookmark(name, url);
        
        const newBookmark = {
            id: uuidv4(),
            type: 'bookmark',
            name: name.trim(),
            url: url,
            icon: getFaviconUrl(url),
            description: '',
            created_at: new Date(),
            updated_at: new Date(),
            tags: [],
            visit_count: 0
        };
        
        if (isDuplicateBookmark(newBookmark)) {
            if (!confirm('该书签已存在，是否继续添加  ')) {
                return;
            }
        }
        
        if (parentFolder) {
            parentFolder.items.push(newBookmark);
        } else {
            bookmarks.push(newBookmark);
        }
        
        renderBookmarks();
        debouncedSaveBookmarks();
        showToast('添加书签成功');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// 添加文件夹函数
function addFolder(name, parentFolder = null) {
    const newFolder = {
        id: uuidv4(),
        type: 'folder',
        name: name,
        description: '',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: currentUser ? currentUser.id : null,
        tags: [],
        access: 'private',
        visit_count: 0,
        items: []
    };
    if (parentFolder) {
        parentFolder.items.push(newFolder);
    } else {
        bookmarks.push(newFolder);
    }
    renderBookmarks();
}

// 编辑项目函数
function editItem(item) {
    const editModal = document.getElementById('editModal');
    const editTitle = document.getElementById('editTitle');
    const editForm = document.getElementById('editForm');
    const editName = document.getElementById('editName');
    const editUrl = document.getElementById('editUrl');

    editTitle.textContent = item.type === 'folder' ? '编辑文件夹' : '编辑书签';
    editName.value = item.name;
    if (item.type === 'bookmark') {
        editUrl.style.display = 'block';
        editUrl.value = item.url;
    } else {
        editUrl.style.display = 'none';
    }

    editModal.style.display = 'block';

    editForm.onsubmit = (e) => {
        e.preventDefault();
        item.name = editName.value;
        if (item.type === 'bookmark') {
            item.url = editUrl.value;
            item.icon = getFaviconUrl(editUrl.value);
        }
        renderBookmarks();
        editModal.style.display = 'none';
    };
}

// 除项目函数
function deleteItem(item) {
    const parentFolder = findParentFolder(item);
    if (parentFolder) {
        const index = parentFolder.items.findIndex(i => i.id === item.id);
        if (index !== -1) {
            parentFolder.items.splice(index, 1);
        }
    } else {
        const index = bookmarks.findIndex(i => i.id === item.id);
        if (index !== -1) {
            bookmarks.splice(index, 1);
        }
    }
    renderBookmarks();
}

// 添加提示框功能
function showToast(message, type = 'success', duration = 3000) {
    const toast = Object.assign(document.createElement('div'), {
        className: `toast ${type}`,
        innerHTML: `
            <div class="toast-icon">${type === 'success' ? '✓' : '✕'}</div>
            <div class="toast-message">${message}</div>
        `,
        style: `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            background: ${type === 'success' ? '#48bb78' : '#f56565'};
            color: white;
            border-radius: 6px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.2);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 8px;
            animation: toastIn 0.3s ease, toastOut 0.3s ease ${(duration - 300) / 1000}s;
        `
    });
    
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), duration);
}

// 页面加载完成后始化
window.onload = initialize;

// 添加相关式
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
`;
document.head.appendChild(style);

// 拖动相关的核心函数
function initDragListeners(element, item) {
    element.draggable = true;
    element.dataset.id = item.id;
    element.addEventListener('dragstart', (e) => handleDragStart(e, item));
    element.addEventListener('dragend', handleDragEnd);
    element.addEventListener('dragover', handleDragOver);
    element.addEventListener('dragleave', handleDragLeave);
    element.addEventListener('drop', (e) => handleDrop(e, item));
}

function handleDragStart(e, item) {
    draggedItem = item;
    dragTarget = null;
    e.target.classList.add('dragging');
    
    // 创建拖动预览
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

    // 添加全局拖动状态
    document.body.classList.add('dragging-active');
}

let dragOverTimeout;
function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (dragOverTimeout) {
        clearTimeout(dragOverTimeout);
    }
    
    dragOverTimeout = setTimeout(() => {
        if (!draggedItem || e.target === dragTarget) return;
        
        dragTarget = e.target;
        const targetItem = getItemFromElement(dragTarget);
        if (!targetItem) return;

        clearDragIndicators();
        
        if (targetItem.type === 'folder') {
            handleFolderDragOver(e, targetItem);
        } else {
            handleBookmarkDragOver(e, targetItem);
        }
    }, 50); // 50ms防抖
}

function handleDragLeave(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (e.target === dragTarget) {
        clearDragIndicators();
        dragTarget = null;
    }
}

function handleDragEnd(e) {
    e.preventDefault();
    document.body.classList.remove('dragging-active');
    clearDragIndicators();
    e.target.classList.remove('dragging');
    draggedItem = null;
    dragTarget = null;
}

function handleDrop(e, targetItem) {
    if (!draggedItem || draggedItem === targetItem) return;
    e.preventDefault();
    e.stopPropagation();
    
    try {
        const sourceParent = findParentFolder(draggedItem);
        const targetParent = findParentFolder(targetItem);
        
        // 检查文件夹移动的有效性
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

// 辅助函数
function getItemFromElement(element) {
    const id = element.dataset.id;
    return findItemById(id, bookmarks);
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

function removeFromParent(item, sourceParent) {
    if (sourceParent) {
        // 从源文件夹中移除项目
        sourceParent.items = sourceParent.items.filter(i => i.id !== item.id);
        // 关闭源文件夹
        const sourceFolderElem = Array.from(document.querySelectorAll('.folder-item')).find(elem => {
            const folderContent = elem.nextElementSibling;
            return folderContent && folderContent.contains(document.querySelector(`[data-id="${item.id}"]`));
        });
        if (sourceFolderElem) {
            closeFolder(sourceFolderElem);
        }
    } else {
        // 从顶层移除
        bookmarks = bookmarks.filter(i => i.id !== item.id);
    }
}

function isOverFolderCenter(e, element) {
    const rect = element.getBoundingClientRect();
    const mouseY = e.clientY - rect.top;
    return mouseY > rect.height * 0.25 && mouseY < rect.height * 0.75;
}

function isOverLeftHalf(e, element) {
    const rect = element.getBoundingClientRect();
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
    
    // 改为垂直指示器
    indicator.style.height = `${rect.height + 4}px`; // 稍微加长一点
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

// 添加新的获取图标方法
function getFaviconUrl(url) {
    try {
        const urlObj = new URL(url);
        return `${urlObj.protocol}//${urlObj.hostname}/favicon.ico`;
    } catch {
        return 'data:image/svg+xml,' + encodeURIComponent(`
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
                <rect width="16" height="16" fill="#ddd"/>
                <text x="8" y="12" font-size="10" fill="#666" 
                      text-anchor="middle" font-family="Arial">?</text>
            </svg>
        `);
    }
}

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
    
    // 添加模态框
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

    // 导出功能
    exportBtn.addEventListener('click', () => {
        exportModal.style.display = 'block';
    });

    // 导入功能
    importBtn.addEventListener('click', () => {
        importModal.style.display = 'block';
    });

    // 关闭模态框
    document.querySelectorAll('.modal .close').forEach(closeBtn => {
        closeBtn.addEventListener('click', () => {
            closeBtn.closest('.modal').style.display = 'none';
        });
    });

    // 点击模态框外部关闭
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
        }
    });

    // 处理导出选项点击
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

    // 处理导入选项点击
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

    // 处理文件导入
    importInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = async (event) => {
            try {
                let importedBookmarks;
                
                if (file.name.endsWith('.json')) {
                    // 处理 JSON 格式
                    const importedData = JSON.parse(event.target.result);
                    if (!Array.isArray(importedData.bookmarks)) {
                        throw new Error('无效的书签数据格式');
                    }
                    importedBookmarks = importedData.bookmarks;
                } else if (file.name.endsWith('.html')) {
                    // 处理浏览器书签 HTML 格式
                    importedBookmarks = await parseBookmarkHTML(event.target.result);
                }

                // 修改为合并模式，而不是覆盖
                if (confirm('是否将导入的书签添加到现有书签中？')) {
                    // 获取当前最大的ID
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

                    // 更新导入书签的ID
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
                    
                    // 重新渲染书签栏
                    renderBookmarks();
                    saveBookmarks();
                    showToast('书签导入成功！');
                }
            } catch (error) {
                showToast('导入失败：' + error.message, 'error');
                console.error('Import error:', error);
            }
            
            // 清除 input 的值，允许重复导入同一文件
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

                // 处理文件夹
                if (node.tagName === 'DT') {
                    const h3 = node.querySelector(':scope > H3');
                    if (h3) {
                        const folder = {
                            id: nextId++,
                            type: 'folder',
                            name: h3.textContent.trim(),
                            items: []
                        };

                        // 处  文件夹内的内容
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

                    // 处理书签
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

            // 查找最外层的 DL 标签
            const mainDL = doc.querySelector('DL');
            if (!mainDL) {
                throw new Error('未找到有效的书签数据');
            }

            // 处理所有顶级书签和文件夹
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

// 分离文件夹和书签的拖拽处理
function handleFolderDragOver(e, targetItem) {
    dragTarget.classList.add('drag-over');
    if (isOverFolderCenter(e, dragTarget)) {
        if (!isSubfolder(draggedItem, targetItem)) {
            dragTarget.classList.add('folder-highlight');
            showFolderDropIndicator(dragTarget);
        }
    } else {
        dragTarget.classList.remove('folder-highlight');
        showSortingIndicator(e, dragTarget);
    }
}

function handleBookmarkDragOver(e, targetItem) {
    showSortingIndicator(e, dragTarget);
}

// 添加全局错误处理
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error);
    showToast('操作出错，请重试', 'error');
});

// 添加防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 优化渲染函数
const debouncedRenderBookmarks = debounce((container = document.getElementById('bookmarkBar'), items = bookmarks, level = 0) => {
    const fragment = document.createDocumentFragment();
    items.forEach(item => {
        if (item.type === 'folder') {
            fragment.appendChild(createFolderElement(item, level));
        } else {
            fragment.appendChild(createBookmarkElement(item));
        }
    }); // 闭合 forEach
    container.innerHTML = '';
    container.appendChild(fragment);
}, 100);

// 优化保存函数
const debouncedSaveBookmarks = debounce(() => {
    try {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Save error:', error);
        showToast('保存失败，请检查存储空间', 'error');
    }
}, 1000);

function validateBookmark(name, url) {
    if (!name.trim()) {
        throw new Error('书签名称不能为空');
    }
    
    try {
        new URL(url);
    } catch {
        throw new Error('无效的URL地址');
    }
    
    return true;
}

function validateFolder(name) {
    if (!name.trim()) {
        throw new Error('文件夹名称不能为空');
    }
    
    if (name.length > 50) {
        throw new Error('文件夹名称过长');
    }
    
    return true;
}

// 添加键盘快捷键
document.addEventListener('keydown', (e) => {
    // Esc键关闭所有弹窗和文件夹
    if (e.key === 'Escape') {
        closeAllModals();
        closeAllFolders();
    }
    
    // Ctrl + D 添加书签
    if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        document.getElementById('addBookmark').click();
    }
    
    // Ctrl + Shift + D 添加文件夹
    if (e.ctrlKey && e.shiftKey && e.key === 'D') {
        e.preventDefault();
        document.getElementById('addFolder').click();
    }
});

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
}

// 添加节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// 优化拖拽处理
const throttledDragOver = throttle((e, targetItem) => {
    if (!targetItem) return;
    
    clearDragIndicators();
    
    if (targetItem.type === 'folder') {
        handleFolderDragOver(e, targetItem);
    } else {
        handleBookmarkDragOver(e, targetItem);
    }
}, 50);

function handleDragOver(e) {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItem || e.target === dragTarget) return;
    
    dragTarget = e.target;
    const targetItem = getItemFromElement(dragTarget);
    throttledDragOver(e, targetItem);
}

function validateFolderMove(sourceFolder, targetFolder) {
    // 检查嵌套深度
    function getFolderDepth(folder) {
        let depth = 0;
        let current = folder;
        while (findParentFolder(current)) {
            depth++;
            current = findParentFolder(current);
        }
        return depth;
    }
    
    const MAX_DEPTH = 5; // 最大嵌套深度
    const currentDepth = getFolderDepth(targetFolder);
    
    if (currentDepth >= MAX_DEPTH) {
        throw new Error('文件夹嵌套层级过深');
    }
    
    // 检查是否是自身或子文件夹
    if (isSubfolder(sourceFolder, targetFolder)) {
        throw new Error('不   将文   夹移动到其子文件夹   ');
    }
    
    return true;
}

function isDuplicateBookmark(newBookmark, container = bookmarks) {
    for (const item of container) {
        if (item.type === 'bookmark' && 
            item.url === newBookmark.url && 
            item.name === newBookmark.name) {
            return true;
        }
        if (item.type === 'folder' && isDuplicateBookmark(newBookmark, item.items)) {
            return true;
        }
    }
    return false;
}

function backupBookmarks() {
    try {
        const backup = {
            timestamp: Date.now(),
            data: bookmarks
        };
        localStorage.setItem('bookmarks_backup', JSON.stringify(backup));
        showToast('书签已备份');
    } catch (error) {
        console.error('Backup error:', error);
        showToast('备份失败', 'error');
    }
}

function restoreBookmarks() {
    try {
        const backup = localStorage.getItem('bookmarks_backup');
        if (backup) {
            const { timestamp, data } = JSON.parse(backup);
            if (confirm(`是否恢复${new Date(timestamp).toLocaleString()}的备份？`)) {
                bookmarks = data;
                renderBookmarks();
                saveBookmarks();
                showToast('书签已恢复');
            }
        } else {
            showToast('没有可用的备份', 'error');
        }
    } catch (error) {
        console.error('Restore error:', error);
        showToast('恢复失败', 'error');
    }
}

// 定期自动备份
setInterval(backupBookmarks, 30 * 60 * 1000); // 每30分钟

// 添加创建文件夹元素的函数
function createFolderElement(folder, level) {
    const folderElem = document.createElement('div');
    folderElem.className = 'folder-item';
    folderElem.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="#F4C430">
            <path d="M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
        </svg>
        <span>${folder.name}</span>
    `;
    
    initDragListeners(folderElem, folder);
    folderElem.addEventListener('contextmenu', (e) => showContextMenu(e, folder));
    folderElem.addEventListener('click', (e) => {
        e.stopPropagation();
        showFolderContent(e, folder, level);
    });
    
    return folderElem;
}

// 添加创建书签元素的函数
function createBookmarkElement(bookmark) {
    const bookmarkElem = document.createElement('div');
    bookmarkElem.className = 'bookmark-item';
    bookmarkElem.innerHTML = `
        <img src="${bookmark.icon}" 
             alt="${bookmark.name}" 
             onerror="this.onerror=null; this.src='${getFaviconUrl(bookmark.url)}';">
        <span>${bookmark.name}</span>
    `;
    
    initDragListeners(bookmarkElem, bookmark);
    bookmarkElem.onclick = () => {
        window.open(bookmark.url, '_blank');
        incrementVisitCount(bookmark.id);
    };
    bookmarkElem.addEventListener('contextmenu', (e) => showContextMenu(e, bookmark));
    
    return bookmarkElem;
}

// 添加右键菜单项的点击事件处理
function initializeContextMenu() {
    document.getElementById('addBookmark').addEventListener('click', () => {
        document.getElementById('addBookmarkModal').style.display = 'block';
        hideContextMenu();
    });

    document.getElementById('addFolder').addEventListener('click', () => {
        document.getElementById('addFolderModal').style.display = 'block';
        hideContextMenu();
    });

    document.getElementById('editItem').addEventListener('click', () => {
        if (contextMenuTarget) {
            editItem(contextMenuTarget);
            hideContextMenu();
        }
    });

    document.getElementById('deleteItem').addEventListener('click', () => {
        if (contextMenuTarget && confirm('确定要删除吗？')) {
            deleteItem(contextMenuTarget);
            hideContextMenu();
        }
    });
}

// 书签搜索功能
function searchBookmarks(query, user_id) {
    const results = [];
    function searchInItems(items, parentPath = '') {
        items.forEach(item => {
            if (item.name.toLowerCase().includes(query.toLowerCase()) ||
                (item.description && item.description.toLowerCase().includes(query.toLowerCase())) ||
                (item.tags && item.tags.join(' ').toLowerCase().includes(query.toLowerCase()))) {
                results.push({...item, path: parentPath + '/' + item.name});
            }
            if (item.type === 'folder' && item.items) {
                searchInItems(item.items, parentPath + '/' + item.name);
            }
        });
    }
    searchInItems(bookmarks);
    return results;
}

// 书签导出功能
function exportBookmarks(user_id, format = 'json') {
    const userBookmarks = bookmarks.filter(b => b.created_by === user_id);
    if (format === 'json') {
        return JSON.stringify(userBookmarks, null, 2);
    }
    // 可以添加其他格式的导出支持
}

// 书签访问统计
function incrementVisitCount(bookmark_id) {
    function updateCount(items) {
        for (let item of items) {
            if (item.id === bookmark_id) {
                item.visit_count = (item.visit_count || 0) + 1;
                item.last_visited = new Date();
                return true;
            }
            if (item.type === 'folder' && item.items) {
                if (updateCount(item.items)) return true;
            }
        }
        return false;
    }
    updateCount(bookmarks);
}