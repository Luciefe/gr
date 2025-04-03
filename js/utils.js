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

// 为子文件夹容器添加宽度限制的样式
document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
        .folder-content .folder-content {
            max-width: min(300px, 80vw) !important;  /* 限制子文件夹的最大宽度 */
            min-width: 180px !important;  /* 设置最小宽度 */
            width: auto !important;  /* 允许自适应宽度 */
        }
        
        .folder-content .folder-content .bookmark-item,
        .folder-content .folder-content .folder-item {
            max-width: 100%;  /* 确保子项不超出容器 */
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    `
}));

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        if (timeout) clearTimeout(timeout);
        timeout = setTimeout(() => {
            func.apply(this, args);
            timeout = null;
        }, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// 安全的DOM操作
function safelyRemoveElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

// 检查元素是否在视口内
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= window.innerHeight &&
        rect.right <= window.innerWidth
    );
}

// 添加删除确认框样式
document.head.appendChild(Object.assign(document.createElement('style'), {
    textContent: `
        .delete-confirm-modal {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: rgba(0, 0, 0, 0.5);
            display: flex;
            align-items: center;
            justify-content: center;
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 10001;
        }
        
        .delete-confirm-modal.show {
            opacity: 1;
        }
        
        .delete-confirm-content {
            background: white;
            border-radius: 8px;
            padding: 24px;
            max-width: 400px;
            width: 90%;
            transform: translateY(20px);
            transition: transform 0.3s ease;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
        
        .delete-confirm-modal.show .delete-confirm-content {
            transform: translateY(0);
        }
        
        .delete-confirm-content h2 {
            margin: 0 0 16px;
            color: #dc3545;
            font-size: 1.5em;
        }
        
        .delete-confirm-content p {
            margin: 0 0 24px;
            color: #666;
            line-height: 1.5;
        }
        
        .delete-confirm-buttons {
            display: flex;
            justify-content: flex-end;
            gap: 12px;
        }
        
        .delete-confirm-buttons button {
            padding: 8px 16px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            transition: all 0.2s;
        }
        
        .delete-confirm-buttons .cancel-btn {
            background: #e9ecef;
            color: #495057;
        }
        
        .delete-confirm-buttons .cancel-btn:hover {
            background: #dee2e6;
        }
        
        .delete-confirm-buttons .confirm-btn {
            background: #dc3545;
            color: white;
        }
        
        .delete-confirm-buttons .confirm-btn:hover {
            background: #c82333;
        }
    `
}));

export { getFaviconUrl, showToast, debounce, throttle, safelyRemoveElement, isInViewport };
