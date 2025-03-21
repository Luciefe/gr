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

function debounce(func, wait) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
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

export { getFaviconUrl, showToast, debounce, throttle };