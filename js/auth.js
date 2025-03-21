import { showToast } from './utils.js';

let currentUser = null;
let users = [
    { username: 'demo', password: 'password' }
];

function login(username, password) {
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        currentUser = { username: user.username };
        showToast('登录成功！');
        return true;
    }
    return false;
}

function register(username, password) {
    if (users.some(u => u.username === username)) {
        return false;
    }
    users.push({ username, password });
    currentUser = { username };
    showToast('注册成功！');
    return true;
}

function logout() {
    currentUser = null;
}

function getCurrentUser() {
    return currentUser;
}

export { login, register, logout, getCurrentUser };