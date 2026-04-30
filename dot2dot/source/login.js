// login.js
// Dot2Dot 登录模块 - localStorage 缓存版

// ========== 配置区域 ==========
const USERS_BIN_ID = '69f14522856a6821898445a4'
const MESSAGES_BIN_ID = '69f152d436566621a802f2ba'
const JSONBIN_MASTER_KEY = '$2a$10$NnXwFiHdeGX5Q4Gv9IigV..OROpZWRDPiLvnGapCf4fX4Io7VIQVq'
// ==============================

// localStorage 键名
const STORAGE_KEYS = {
    USERS: 'dot2dot_users',
    MESSAGES: 'dot2dot_messages',
    CURRENT_USER: 'dot2dot_currentUser',
    TIMESTAMP: 'dot2dot_timestamp'
}

// 缓存有效期（1小时 = 3600000 毫秒）
const CACHE_DURATION = 60 * 60 * 1000

// 全局变量
let isLoading = false

// ========== 工具函数 ==========
function getBasePath() {
    const lastSlash = window.location.href.lastIndexOf('/')
    return lastSlash !== -1 ? window.location.href.substring(0, lastSlash + 1) : './'
}

const BASE = './'

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
}

function getCurrentDate() {
    const today = new Date()
    const month = String(today.getMonth() + 1).padStart(2, '0')
    const day = String(today.getDate()).padStart(2, '0')
    const year = today.getFullYear()
    return `${month}/${day}/${year}`
}

function showError(message) {
    const errorElement = document.getElementById('errorMessage')
    if (errorElement) {
        errorElement.textContent = message
        errorElement.style.display = 'block'
        setTimeout(() => {
            errorElement.style.display = 'none'
        }, 3000)
    } else {
        alert(message)
    }
}

function setLoading(loading) {
    isLoading = loading
    const loginBtn = document.getElementById('loginBtn')
    const guestBtn = document.getElementById('guestBtn')
    const emailInput = document.getElementById('emailInput')
    
    if (loginBtn) {
        loginBtn.disabled = loading
        loginBtn.textContent = loading ? '处理中...' : 'Login / Register'
    }
    if (guestBtn) guestBtn.disabled = loading
    if (emailInput) emailInput.disabled = loading
}

// ========== JSONBin 数据读取 ==========
async function fetchUsers() {
    const url = `https://api.jsonbin.io/v3/b/${USERS_BIN_ID}/latest`
    const response = await fetch(url, {
        headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
    })
    if (!response.ok) throw new Error(`读取用户数据失败: ${response.status}`)
    const data = await response.json()
    return data.record || []
}

async function fetchMessages() {
    const url = `https://api.jsonbin.io/v3/b/${MESSAGES_BIN_ID}/latest`
    const response = await fetch(url, {
        headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
    })
    if (!response.ok) throw new Error(`读取广播数据失败: ${response.status}`)
    const data = await response.json()
    return data.record || []
}

// ========== localStorage 操作 ==========
function saveToLocalStorage(users, messages, currentUser) {
    try {
        localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users))
        localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages))
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser))
        localStorage.setItem(STORAGE_KEYS.TIMESTAMP, Date.now().toString())
        console.log('数据已存入 localStorage')
    } catch (e) {
        console.warn('localStorage 写入失败:', e)
    }
}

// ========== 登录逻辑 ==========
async function updateUser(email, nickname) {
    // 1. 读取两个 Bin
    console.log('读取 JSONBin 数据...')
    const [users, messages] = await Promise.all([fetchUsers(), fetchMessages()])
    
    if (!Array.isArray(users) || users.length === 0) {
        throw new Error('用户数据异常')
    }
    
    // 2. 查找或创建用户
    let user = users.find(u => u.user_id === email)
    const today = getCurrentDate()
    
    if (user) {
        user.login_lastdate = today
        user.login_times = (user.login_times || 0) + 1
        console.log(`更新用户: ${email}, 登录次数: ${user.login_times}`)
    } else {
        user = {
            user_id: email,
            nickname: nickname,
            login_lastdate: today,
            login_times: 1,
            aipost_lastdate: '',
            aipost_times: 0,
            user_weight: 10,
            user_tag: '',
            count_A: 0,
            count_B: 0,
            count_C: 0,
            tag_length: 0
        }
        users.push(user)
        console.log(`创建新用户: ${email}`)
    }
    
    // 3. 写回 JSONBin
    const writeUrl = `https://api.jsonbin.io/v3/b/${USERS_BIN_ID}`
    const writeResponse = await fetch(writeUrl, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_MASTER_KEY
        },
        body: JSON.stringify(users)
    })
    
    if (!writeResponse.ok) {
        throw new Error(`写入失败: ${writeResponse.status}`)
    }
    
    console.log('写入 JSONBin 成功')
    
    // 4. 存入 localStorage
    saveToLocalStorage(users, messages, user)
    
    return { success: true, isNewUser: user.login_times === 1 }
}

async function handleLogin() {
    if (isLoading) return
    
    const emailInput = document.getElementById('emailInput')
    let email = emailInput ? emailInput.value.trim().toLowerCase() : ''
    
    if (!email) {
        showError('请输入邮箱地址')
        return
    }
    
    if (!isValidEmail(email)) {
        showError('请输入有效的邮箱地址（例如 alice@gmail.com）')
        return
    }
    
    const nickname = email.split('@')[0]
    
    setLoading(true)
    
    try {
        const result = await updateUser(email, nickname)
        
        if (result.success) {
            console.log(result.isNewUser ? '注册成功' : '登录成功')
            window.location.href = BASE + 'homepage.html'
        } else {
            showError('登录失败，请重试')
            setLoading(false)
        }
    } catch (error) {
        console.error('登录错误:', error)
        showError(error.message || '网络错误，请检查连接后重试')
        setLoading(false)
    }
}

// ========== 访客模式 ==========
function handleGuest() {
    if (isLoading) return
    window.open(BASE + 'homepage.html?mode=guest', '_blank')
}

// ========== 自动跳转（已登录用户）==========
function checkAndRedirect() {
    const cachedUser = localStorage.getItem(STORAGE_KEYS.CURRENT_USER)
    const timestamp = localStorage.getItem(STORAGE_KEYS.TIMESTAMP)
    
    if (cachedUser && timestamp) {
        const age = Date.now() - parseInt(timestamp)
        if (age < CACHE_DURATION) {
            // 缓存未过期，直接跳转到 homepage
            console.log('检测到有效缓存，自动跳转')
            window.location.href = BASE + 'homepage.html'
            return true
        } else {
            // 缓存已过期，清除
            console.log('缓存已过期，清除')
            localStorage.removeItem(STORAGE_KEYS.USERS)
            localStorage.removeItem(STORAGE_KEYS.MESSAGES)
            localStorage.removeItem(STORAGE_KEYS.CURRENT_USER)
            localStorage.removeItem(STORAGE_KEYS.TIMESTAMP)
        }
    }
    return false
}

// ========== 初始化 ==========
function init() {
    // 检查是否已登录且缓存未过期
    if (checkAndRedirect()) {
        return
    }
    
    // 否则显示登录表单
    const loginBtn = document.getElementById('loginBtn')
    const guestBtn = document.getElementById('guestBtn')
    const emailInput = document.getElementById('emailInput')
    
    if (loginBtn) {
        loginBtn.addEventListener('click', handleLogin)
    }
    
    if (guestBtn) {
        guestBtn.addEventListener('click', handleGuest)
    }
    
    if (emailInput) {
        emailInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault()
                handleLogin()
            }
        })
    }
    
    console.log('登录模块已初始化（localStorage 缓存版）')
}

// 启动
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}