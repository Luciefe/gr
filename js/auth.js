// 从 utils.js 文件中导入 showToast 函数，用于显示提示信息
import { showToast } from './utils.js';

// 定义一个变量，用于存储当前登录的用户信息，初始值为 null
let currentUser = null;

// 定义一个数组，存储用户信息，初始时包含一个示例用户
let users = [
    { username: 'demo', password: 'password' }
];

// 定义登录函数，接收用户名和密码作为参数
function login(username, password) {
    // 使用数组的 find 方法查找是否存在匹配用户名和密码的用户
    const user = users.find(u => u.username === username && u.password === password);
    // 如果找到匹配的用户
    if (user) {
        // 将当前用户设置为找到的用户，只存储用户名
        currentUser = { username: user.username };
        // 调用 showToast 函数显示登录成功的提示
        showToast('登录成功！');
        // 返回 true 表示登录成功
        return true;
    }
    // 如果未找到匹配的用户，返回 false 表示登录失败
    return false;
}

// 定义注册函数，接收用户名和密码作为参数
function register(username, password) {
    // 使用数组的 some 方法检查是否已存在相同用户名的用户
    if (users.some(u => u.username === username)) {
        // 如果已存在，返回 false 表示注册失败
        return false;
    }
    // 如果不存在，将新用户信息添加到用户数组中
    users.push({ username, password });
    // 将当前用户设置为新注册的用户
    currentUser = { username };
    // 调用 showToast 函数显示注册成功的提示
    showToast('注册成功！');
    // 返回 true 表示注册成功
    return true;
}

// 定义登出函数
function logout() {
    // 将当前用户设置为 null，表示用户已登出
    currentUser = null;
}

// 定义获取当前用户信息的函数
function getCurrentUser() {
    // 返回当前用户信息
    return currentUser;
}

// 将 login、register、logout 和 getCurrentUser 函数导出，供其他模块使用
export { login, register, logout, getCurrentUser };
