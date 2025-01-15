// 添加必要的导入语句和依赖库
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// 认证相关函数
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
