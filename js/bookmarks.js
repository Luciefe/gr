// 从 utils.js 文件中导入 showToast、getFaviconUrl 和 debounce 函数
import { showToast, getFaviconUrl, debounce } from './utils.js';

// 定义一个 bookmarks 数组，存储书签数据，包含多个文件夹和书签
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
            { id: 13, type: 'bookmark', name: '爱奇艺', url: 'https://www.iqiyi.com', icon: 'https://www.iqiyi.com/favicon.ico' }
        ]
    },
    {
        id: 18,
        type: 'folder',
        name: '工具网站',
        items: [
            { id: 19, type: 'bookmark', name: '有道翻译', url: 'https://fanyi.youdao.com', icon: 'https://fanyi.youdao.com/favicon.ico' },
            { id: 20, type: 'bookmark', name: '百度地图', url: 'https://map.baidu.com', icon: 'https://map.baidu.com/favicon.ico' }
        ]
    },
    {
        id: 23,
        type: 'folder',
        name: '学习资源',
        items: [
            { id: 25, type: 'bookmark', name: '菜鸟教程', url: 'https://www.runoob.com', icon: 'https://www.runoob.com/favicon.ico' },
            { id: 26, type: 'bookmark', name: 'CSDN1', url: 'https://www.csdn.net', icon: 'https://www.csdn.net/favicon.ico' }
        ]
    }
];

// 获取书签数据
function getBookmarks() {
    return bookmarks;
}

// 设置书签数据
function setBookmarks(newBookmarks) {
    bookmarks = newBookmarks;
}

// 添加书签
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
        
        if (parentFolder && parentFolder.type === 'folder') {
            if (!parentFolder.items) {
                parentFolder.items = [];
            }
            parentFolder.items.push(newBookmark);
        } else {
            bookmarks.push(newBookmark);
        }
        
        saveBookmarks();
    } catch (error) {
        showToast(error.message, 'error');
    }
}

// 修改添加文件夹函数，优化处理逻辑
function addFolder(name, parentFolder = null) {
    try {
        validateFolder(name);
        
        const newFolder = {
            id: Date.now(),
            type: 'folder',
            name: name.trim(),
            items: []
        };
        
        if (parentFolder && parentFolder.type === 'folder') {
            // 确保父文件夹有 items 数组
            if (!parentFolder.items) {
                parentFolder.items = [];
            }
            // 检查是否存在同名文件夹
            if (parentFolder.items.some(item => item.type === 'folder' && item.name === name.trim())) {
                throw new Error('文件夹已存在');
            }
            parentFolder.items.push(newFolder);
        } else {
            // 检查根目录是否存在同名文件夹
            if (bookmarks.some(item => item.type === 'folder' && item.name === name.trim())) {
                throw new Error('文件夹已存在');
            }
            bookmarks.push(newFolder);
        }
        
        saveBookmarks();
        return true;
    } catch (error) {
        showToast(error.message, 'error');
        return false;
    }
}

// 编辑书签或文件夹
function editItem(item, newName, newUrl) {
    try {
        if (item.type === 'folder') {
            validateFolder(newName);
        } else {
            validateBookmark(newName, newUrl);
        }

        // 更新项目属性
        item.name = newName.trim();
        if (item.type === 'bookmark') {
            item.url = newUrl;
            item.icon = getFaviconUrl(newUrl);
        }
        
        // 保存更改
        saveBookmarks();
        return true;
    } catch (error) {
        showToast(error.message, 'error');
        throw error;
    }
}

// 修改删除函数，确保能正确处理嵌套文件夹中的项目
function deleteItem(item) {
    if (!item || !item.id) return false;
    
    function removeFromArray(array) {
        const index = array.findIndex(i => i.id === item.id);
        if (index !== -1) {
            array.splice(index, 1);
            return true;
        }
        return false;
    }
    
    function recursiveDelete(items) {
        // 先尝试直接从当前层级删除
        if (removeFromArray(items)) {
            return true;
        }
        
        // 如果没找到，遍历所有文件夹继续查找
        for (let i = 0; i < items.length; i++) {
            if (items[i].type === 'folder' && items[i].items) {
                if (recursiveDelete(items[i].items)) {
                    return true;
                }
            }
        }
        return false;
    }
    
    const result = recursiveDelete(bookmarks);
    if (result) {
        saveBookmarks();
        return true;
    }
    return false;
}

// 查找书签或文件夹的父文件夹
function findParentFolder(itemId, items = getBookmarks()) {
    for (let item of items) {
        if (item.items && item.items.some(child => child.id === itemId)) {
            return item;
        }
        if (item.type === 'folder' && item.items) {
            const found = findParentFolder(itemId, item.items);
            if (found) return found;
        }
    }
    return null;
}

// 添加递归查找文件夹的辅助函数
function findFolderById(id, items = bookmarks) {
    for (let item of items) {
        if (item.type === 'folder' && item.id === id) {
            return item;
        }
        if (item.type === 'folder' && item.items) {
            const found = findFolderById(id, item.items);
            if (found) return found;
        }
    }
    return null;
}

// 检查两个文件夹是否存在嵌套关系
function isSubfolder(parentFolder, childFolder) {
    // 如果两个文件夹是同一个，返回 true
    if (parentFolder.id === childFolder.id) return true;
    // 如果子文件夹不是文件夹类型，返回 false
    if (childFolder.type !== 'folder') return false;
    // 递归检查子文件夹内的每个项是否是父文件夹
    return childFolder.items.some(item => isSubfolder(parentFolder, item));
}

// 验证书签名称和 URL 是否有效
function validateBookmark(name, url) {
    // 检查书签名称是否为空
    if (!name.trim()) {
        throw new Error('书签名称不能为空');
    }
    // 检查 URL 是否有效
    try {
        new URL(url);
    } catch {
        throw new Error('无效的URL地址');
    }
}

// 验证文件夹名称是否有效
function validateFolder(name) {
    // 检查文件夹名称是否为空
    if (!name.trim()) {
        throw new Error('文件夹名称不能为空');
    }
    // 检查文件夹名称是否过长
    if (name.length > 50) {
        throw new Error('文件夹名称过长');
    }
}

// 检查书签是否已存在
function isDuplicateBookmark(newBookmark, container = bookmarks) {
    // 遍历书签容器
    for (const item of container) {
        // 如果找到相同的书签，返回 true
        if (item.type === 'bookmark' && item.url === newBookmark.url && item.name === newBookmark.name) {
            return true;
        }
        // 如果当前项是文件夹，递归检查文件夹内的书签
        if (item.type === 'folder' && isDuplicateBookmark(newBookmark, item.items)) {
            return true;
        }
    }
    return false; // 如果未找到相同的书签，返回 false
}

// 手动保存书签
function saveBookmarks() {
    // 空函数，不再保存到localStorage
}

// 从 localStorage 加载书签
function loadBookmarks() {
    // 使用默认的书签数据，不从localStorage加载
}

// 备份书签
function backupBookmarks() {
    // 空函数，不再备份到localStorage
}

// 恢复书签
function restoreBookmarks() {
    // 空函数，不再从localStorage恢复
    return false;
}

// 验证文件夹移动是否合法
function validateFolderMove(sourceFolder, targetFolder) {
    // 获取文件夹的深度
    function getFolderDepth(folder) {
        let depth = 0;
        let current = folder;
        while (findParentFolder(current)) {
            depth++;
            current = findParentFolder(current);
        }
        return depth;
    }
    
    // 定义最大嵌套深度
    const MAX_DEPTH = 5;
    // 获取目标文件夹的深度
    const currentDepth = getFolderDepth(targetFolder);
    
    // 检查是否超过最大嵌套深度
    if (currentDepth >= MAX_DEPTH) {
        throw new Error('文件夹嵌套层级过深');
    }
    
    // 检查是否将文件夹移动到其子文件夹中
    if (isSubfolder(sourceFolder, targetFolder)) {
        throw new Error('不能将文件夹移动到其子文件夹中');
    }
    
    return true;
}

// 从父文件夹中移除指定 ID 的书签或文件夹
export function removeFromParent(id) {
    const bookmarks = getBookmarks();
    let removed = false;
    
    // 定义递归函数，查找并移除指定 ID 的书签或文件夹
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

// 导出相关函数，供其他模块使用
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
