
// 初始化认证功能
initializeAuth();

// 初始化拖拽功能
initializeDragAndDrop();

// 初始化右键菜单功能
initializeContextMenu();

// 初始化书签管理功能
initializeBookmarkManager();

// 初始化导入导出功能
initializeImportExport();

// 加载书签数据
loadBookmarks();

// 添加常用网站书签数据
function addDefaultBookmarks() {
    const defaultBookmarks = [
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
                }
            ]
        }
    ];

    // 创建一个新的文件夹来包含所有现有的书签
    const allBookmarksFolder = {
        id: uuidv4(),
        type: 'folder',
        name: '所有书签',
        description: '所有书签的集合',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['所有书签'],
        access: 'private',
        visit_count: 0,
        items: [...bookmarks] // 将现有的书签数据移动到这个新文件夹中
    };

    // 清空现有的书签数组，并将新文件夹添加进去
    bookmarks = [allBookmarksFolder];

    if (bookmarks.length === 0) {
        bookmarks.push(...defaultBookmarks);
        saveBookmarks();
    }
}

// 添加一个函数来创建测试分支
function createTestBranch() {
    const testBranch = {
        id: uuidv4(),
        type: 'folder',
        name: '测试分支',
        description: '用于测试的书签收藏夹',
        created_at: new Date(),
        updated_at: new Date(),
        created_by: users[0].id,
        tags: ['测试'],
        access: 'private',
        visit_count: 0,
        items: [
            {
                id: uuidv4(),
                type: 'bookmark',
                name: '测试网站',
                url: 'https://www.example.com',
                icon: 'https://www.example.com/favicon.ico',
                description: '测试网站',
                created_at: new Date(),
                updated_at: new Date(),
                tags: ['测试'],
                visit_count: 0
            }
        ]
    };

    bookmarks.push(testBranch);
}

// 调用添加默认书签数据的函数
addDefaultBookmarks();

// 调用创建测试分支的函数
createTestBranch();

// 保存书签数据
saveBookmarks();
