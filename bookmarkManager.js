
// 添加书签函数
function addBookmark(name, url, parentFolder = null) {
    try {
        validateBookmark(name, url);
        const newBookmark = {
            id: generateUniqueId(),
            type: 'bookmark',
            name: name,
            url: url,
            icon: getFaviconUrl(url)
        };
        if (parentFolder) {
            parentFolder.items.push(newBookmark);
        } else {
            bookmarks.push(newBookmark);
        }
        renderBookmarks();
        saveBookmarks();
        showToast('书签添加成功！');
    } catch (error) {
        showToast('添加书签失败: ' + error.message, 'error');
    }
}

