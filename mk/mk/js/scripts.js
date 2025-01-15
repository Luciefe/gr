// 该文件包含应用程序的JavaScript代码。它管理用户身份验证、书签管理、拖放功能和上下文菜单交互。它定义了多个函数，用于渲染书签、处理用户操作和管理文件夹内容。

// 全局变量
let currentUser = null;
let users = [
    { username: 'demo', password: 'password' }
];

let bookmarks = [
    {
        id: 1,
        type: 'folder',
        name: '常用网站',
        items: [
            { id: 2, type: 'bookmark', name: '百度', url: 'https://www.baidu.com', icon: 'https://www.baidu.com/favicon.ico' },
            { id: 3, type: 'bookmark', name: '淘宝', url: 'https://www.taobao.com', icon: 'https://www.taobao.com/favicon.ico' },
            { id: 4, type: 'bookmark', name: '京东', url: 'https://www.jd.com', icon: 'https://www.jd.com/favicon.ico' },
            { id: 5, type: 'bookmark', name: '哔哩哔哩', url: 'https://www.bilibili.com', icon: 'https://www.bilibili.com/favicon.ico' }
        ]
    },
    {
        id: 6,
        type: 'folder',
        name: '新闻资讯',
        items: [
            { id: 7, type: 'bookmark', name: '腾讯新闻', url: 'https://news.qq.com', icon: 'https://news.qq.com/favicon.ico' },
            { id: 8, type: 'bookmark', name: '新浪新闻', url: 'https://news.sina.com.cn', icon: 'https://news.sina.com.cn/favicon.ico' },
            { id: 9, type: 'bookmark', name: '网易新闻', url: 'https://news.163.com', icon: 'https://news.163.com/favicon.ico' }
        ]
    },
    {
        id: 10,
        type: 'folder',
        name: '视频娱乐',
        items: [
            { id: 11, type: 'bookmark', name: '优酷', url: 'https://www.youku.com', icon: 'https://www.youku.com/favicon.ico' },
            { id: 12, type: 'bookmark', name: '腾讯视频', url: 'https://v.qq.com', icon: 'https://v.qq.com/favicon.ico' },
            { id: 13, type: 'bookmark', name: '爱奇艺', url: 'https://www.iqiyi.com', icon: 'https://www.iqiyi.com/favicon.ico' },
            {
                id: 14,
                type: 'folder',
                name: '直播平台',
                items: [
                    { id: 15, type: 'bookmark', name: '斗鱼', url: 'https://www.douyu.com', icon: 'https://www.douyu.com/favicon.ico' },
                    { id: 16, type: 'bookmark', name: '虎牙', url: 'https://www.huya.com', icon: 'https://www.huya.com/favicon.ico' },
                    { id: 17, type: 'bookmark', name: '抖音直播', url: 'https://live.douyin.com', icon: 'https://live.douyin.com/favicon.ico' }
                ]
            }
        ]
    },
    {
        id: 18,
        type: 'folder',
        name: '工具网站',
        items: [
            { id: 19, type: 'bookmark', name: '有道翻译', url: 'https://fanyi.youdao.com', icon: 'https://fanyi.youdao.com/favicon.ico' },
            { id: 20, type: 'bookmark', name: '百度地图', url: 'https://map.baidu.com', icon: 'https://map.baidu.com/favicon.ico' },
            { id: 21, type: 'bookmark', name: '12306', url: 'https://www.12306.cn', icon: 'https://www.12306.cn/favicon.ico' },
            { id: 22, type: 'bookmark', name: '天气预报', url: 'https://tianqi.qq.com', icon: 'https://tianqi.qq.com/favicon.ico' }
        ]
    },
    {
        id: 23,
        type: 'folder',
        name: '学习资源',
        items: [
            { id: 24, type: 'bookmark', name: '中国大学MOOC', url: 'https://www.icourse163.org', icon: 'https://www.icourse163.org/favicon.ico' },
            { id: 25, type: 'bookmark', name: '菜鸟教程', url: 'https://www.runoob.com', icon: 'https://www.runoob.com/favicon.ico' },
            { id: 26, type: 'bookmark', name: 'CSDN', url: 'https://www.csdn.net', icon: 'https://www.csdn.net/favicon.ico' },
            { id: 27, type: 'bookmark', name: '掘金', url: 'https://juejin.cn', icon: 'https://juejin.cn/favicon.ico' }
        ]
    },
    { id: 28, type: 'bookmark', name: '知乎', url: 'https://www.zhihu.com', icon: 'https://www.zhihu.com/favicon.ico' },
    { id: 29, type: 'bookmark', name: '微博', url: 'https://weibo.com', icon: 'https://weibo.com/favicon.ico' },
    { id: 30, type: 'bookmark', name: '豆瓣', url: 'https://www.douban.com', icon: 'https://www.douban.com/favicon.ico' }
];

let currentFocusedFolder = null;
let draggedItem = null;
let dragTarget = null;
let dragIndicator = null;
let contextMenuTarget = null;

// 函数
function isInFolderDropZone(e, target) {…}

function isOverLeftHalf(e, target) {…}

function removeItemFromParent(item, parentArray) {…}

function moveItemInArray(array, movedItem, targetItem, insertBefore) {…}

function insertItemNear(item, targetItem, array, insertBefore) {…}

function findParentFolder(item, currentItems = bookmarks) {…}

// 认证相关函数
function showAuthModal(type) {…}

async function handleAuthSubmit(event) {…}

function updateUserSection() {…}

function handleLogout() {…}

// 书签管理相关函数
function renderBookmarks(container = document.getElementById('bookmarkBar'), items = bookmarks, level = 0) {…}

function renderFolderItem(folder, container, level) {…}

function renderBookmarkItem(item, container) {…}

// 拖拽相关函数
function addDragListeners(elem, item) {…}

function dragStart(e, item) {…}

function setDragPreview(e) {…}

function findItemPath(item, items = bookmarks, path = []) {…}

function dragOver(e) {…}

function dragLeave(e) {…}

function dragEnd(e) {…}

function drop(e, targetItem) {…}

function handleFolderDrop(targetItem) {…}

function handleSortDrop(targetItem, targetParent, e) {…}

function cleanupDrag() {…}

// 辅助函数：检查是否是子文件夹
function isSubfolder(parentFolder, childFolder) {…}

// 右键菜单相关函数
function showContextMenu(e, item) {…}

function hideContextMenu() {…}

// 文件夹内容显示/隐藏函数
function showFolderContent(event, folder, level) {…}

function openFolderWithAnimation(folderElem, folder, level) {…}

function closeFolderWithAnimation(folderElem) {…}

function createFolderContent(folderElem, folder, level) {…}

function adjustFolderPosition(content, folderElem) {…}

function closeSiblingFolders(folderElem) {…}

// 新增关闭单个文件夹的函数
function closeFolder(folderElem) {…}

// 修改关闭所有文件夹的函数
function closeAllFolders() {…}

// 修改文档点击事件处理函数
function handleDocumentClick(e) {…}

// 初始化函数
function initialize() {…}

// 数据持久化函数
function saveBookmarks() {…}

function loadBookmarks() {…}

// 添加书签函数
function addBookmark(name, url, parentFolder = null) {…}

// 添加文件夹函数
function addFolder(name, parentFolder = null) {…}

// 编辑项目函数
function editItem(item) {…}

// 删除项目函数
function deleteItem(item) {…}

// 添加提示框功能
function showToast(message, type = 'success', duration = 3000) {…}

// 页面加载完成后初始化
window.onload = initialize;

// 添加相关样式
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
function initDragListeners(element, item) {…}

function handleDragStart(e, item) {…}

let dragOverTimeout;
function handleDragOver(e) {…}

function handleDragLeave(e) {…}

function handleDragEnd(e) {…}

function handleDrop(e, targetItem) {…}

// 辅助函数
function getItemFromElement(element) {…}

function findItemById(id, items) {…}

function removeFromParent(item, sourceParent) {…}

function isOverFolderCenter(e, element) {…}

function isOverLeftHalf(e, element) {…}

function clearDragIndicators() {…}

function showFolderDropIndicator(folderElement) {…}

function showSortingIndicator(e, targetElement) {…}

// 添加新的获取图标方法
function getFaviconUrl(url) {…}

// 添加导入导出按钮
function addImportExportButtons() {…}

// 修改导入导出功能的处理函数
function initializeImportExport() {…}

// 修改解析HTML书签的函数
function parseBookmarkHTML(html) {…}

// 导出为JSON格式
function exportAsJSON() {…}

// 导出为HTML格式
function exportAsHTML(browserType) {…}

// 通用文件下载函数
function downloadFile(content, filename, type) {…}

// 分离文件夹和书签的拖拽处理
function handleFolderDragOver(e, targetItem) {…}

function handleBookmarkDragOver(e, targetItem) {…}

// 添加全局错误处理
window.addEventListener('error', (event) => {…});

// 添加防抖函数
function debounce(func, wait) {…}

// 优化渲染函数