import { showToast, getFaviconUrl, debounce } from './utils.js';

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

function getBookmarks() {
    return bookmarks;
}

function setBookmarks(newBookmarks) {
    bookmarks = newBookmarks;
}

function addBookmark(name, url, parentFolder = null) {
    try {
        validateBookmark(name, url);
        
        const newBookmark = {
            id: Date.now(),
            type: 'bookmark',
            name: name.trim(),
            url: url,
            icon: getFaviconUrl(url)
        };
        
        if (isDuplicateBookmark(newBookmark)) {
            if (!confirm('该书签已存在，是否继续添加？')) {
                return;
            }
        }
        
        if (parentFolder) {
            parentFolder.items.push(newBookmark);
        } else {
            bookmarks.push(newBookmark);
        }
        
        showToast('添加书签成功');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function addFolder(name, parentFolder = null) {
    try {
        validateFolder(name);
        
        const newFolder = {
            id: Date.now(),
            type: 'folder',
            name: name.trim(),
            items: []
        };
        
        if (parentFolder) {
            parentFolder.items.push(newFolder);
        } else {
            bookmarks.push(newFolder);
        }
        
        showToast('添加文件夹成功');
    } catch (error) {
        showToast(error.message, 'error');
    }
}

function editItem(item, newName, newUrl) {
    item.name = newName;
    if (item.type === 'bookmark') {
        item.url = newUrl;
        item.icon = getFaviconUrl(newUrl);
    }
}

function deleteItem(item) {
    const parentFolder = findParentFolder(item);
    if (parentFolder) {
        parentFolder.items = parentFolder.items.filter(i => i.id !== item.id);
    } else {
        bookmarks = bookmarks.filter(i => i.id !== item.id);
    }
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

function isSubfolder(parentFolder, childFolder) {
    if (parentFolder.id === childFolder.id) return true;
    if (childFolder.type !== 'folder') return false;
    return childFolder.items.some(item => isSubfolder(parentFolder, item));
}


function validateBookmark(name, url) {
    if (!name.trim()) {
        throw new Error('书签名称不能为空');
    }
    try {
        new URL(url);
    } catch {
        throw new Error('无效的URL地址');
    }
}

function validateFolder(name) {
    if (!name.trim()) {
        throw new Error('文件夹名称不能为空');
    }
    if (name.length > 50) {
        throw new Error('文件夹名称过长');
    }
}

function isDuplicateBookmark(newBookmark, container = bookmarks) {
    for (const item of container) {
        if (item.type === 'bookmark' && item.url === newBookmark.url && item.name === newBookmark.name) {
            return true;
        }
        if (item.type === 'folder' && isDuplicateBookmark(newBookmark, item.items)) {
            return true;
        }
    }
    return false;
}

const debouncedSaveBookmarks = debounce(() => {
    try {
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } catch (error) {
        console.error('Save error:', error);
        showToast('保存失败，请检查存储空间', 'error');
    }
}, 1000);

function saveBookmarks() {
    debouncedSaveBookmarks();
}

function loadBookmarks() {
    const saved = localStorage.getItem('bookmarks');
    if (saved) {
        bookmarks = JSON.parse(saved);
    }
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
                showToast('书签已恢复');
                return true;
            }
        } else {
            showToast('没有可用的备份', 'error');
        }
        return false;
    } catch (error) {
        console.error('Restore error:', error);
        showToast('恢复失败', 'error');
        return false;
    }
}

function validateFolderMove(sourceFolder, targetFolder) {
    function getFolderDepth(folder) {
        let depth = 0;
        let current = folder;
        while (findParentFolder(current)) {
            depth++;
            current = findParentFolder(current);
        }
        return depth;
    }
    
    const MAX_DEPTH = 5;
    const currentDepth = getFolderDepth(targetFolder);
    
    if (currentDepth >= MAX_DEPTH) {
        throw new Error('文件夹嵌套层级过深');
    }
    
    if (isSubfolder(sourceFolder, targetFolder)) {
        throw new Error('不能将文件夹移动到其子文件夹中');
    }
    
    return true;
}

export function removeFromParent(id) {
    const bookmarks = getBookmarks();
    let removed = false;
    
    function removeItem(items) {
        const index = items.findIndex(item => item.id === id);
        if (index !== -1) {
            items.splice(index, 1);
            removed = true;
            return true;
        }
        
        for (let item of items) {
            if (item.type === 'folder' && item.items) {
                if (removeItem(item.items)) return true;
            }
        }
        return false;
    }
    
    removeItem(bookmarks);
    return removed;
}

export { 
    getBookmarks, 
    setBookmarks, 
    addBookmark, 
    addFolder, 
    editItem, 
    deleteItem, 
    findParentFolder, 
    isSubfolder, 
    saveBookmarks, 
    loadBookmarks, 
    backupBookmarks, 
    restoreBookmarks, 
    validateFolderMove 
};