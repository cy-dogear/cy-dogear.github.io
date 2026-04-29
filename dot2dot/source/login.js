// login.js - 最终稳定版
const JSONBIN_BIN_ID = '69f14522856a6821898445a4'
const JSONBIN_MASTER_KEY = '$2a$10$NnXwFiHdeGX5Q4Gv9IigV..OROpZWRDPiLvnGapCf4fX4Io7VIQVq'

let isLoading = false

//function getBasePath() {
//    const lastSlash = window.location.href.lastIndexOf('/')
//    return lastSlash !== -1 ? window.location.href.substring(0, lastSlash + 1) : './'
//}

const BASE = './'

function isValidEmail(email) {
    return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)
}

function getCurrentDate() {
    const d = new Date()
    return `${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}/${d.getFullYear()}`
}

function showError(msg) {
    const el = document.getElementById('errorMessage')
    if (el) {
        el.textContent = msg
        el.style.display = 'block'
        setTimeout(() => el.style.display = 'none', 3000)
    } else {
        alert(msg)
    }
}

function setLoading(loading) {
    isLoading = loading
    const btn = document.getElementById('loginBtn')
    const guest = document.getElementById('guestBtn')
    const input = document.getElementById('emailInput')
    
    if (btn) {
        btn.disabled = loading
        btn.textContent = loading ? '处理中...' : 'Login / Register'
    }
    if (guest) guest.disabled = loading
    if (input) input.disabled = loading
}

async function fetchUsers() {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}/latest`, {
        headers: { 'X-Master-Key': JSONBIN_MASTER_KEY }
    })
    if (!res.ok) throw new Error(`读取失败: ${res.status}`)
    const data = await res.json()
    return data.record || []
}

async function saveUsers(users) {
    const res = await fetch(`https://api.jsonbin.io/v3/b/${JSONBIN_BIN_ID}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'X-Master-Key': JSONBIN_MASTER_KEY
        },
        body: JSON.stringify(users)
    })
    if (!res.ok) throw new Error(`写入失败: ${res.status}`)
}

async function handleLogin() {
    if (isLoading) return
    
    const email = document.getElementById('emailInput')?.value.trim().toLowerCase()
    if (!email) return showError('请输入邮箱地址')
    if (!isValidEmail(email)) return showError('请输入有效的邮箱地址')
    
    setLoading(true)
    
    try {
        let users = await fetchUsers()
        const today = getCurrentDate()
        const existing = users.find(u => u.user_id === email)
        
        if (existing) {
            existing.login_lastdate = today
            existing.login_times = (existing.login_times || 0) + 1
        } else {
            users.push({
                user_id: email,
                nickname: email.split('@')[0],
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
            })
        }
        
        await saveUsers(users)
        window.location.href = BASE + 'homepage.html?user=' + encodeURIComponent(email)
    } catch (err) {
        showError(err.message)
        setLoading(false)
    }
}

function handleGuest() {
    if (!isLoading) window.open(BASE + 'homepage.html?mode=guest', '_blank')
}

function init() {
    document.getElementById('loginBtn')?.addEventListener('click', handleLogin)
    document.getElementById('guestBtn')?.addEventListener('click', handleGuest)
    document.getElementById('emailInput')?.addEventListener('keypress', e => {
        if (e.key === 'Enter') handleLogin()
    })
}

document.readyState === 'loading' ? document.addEventListener('DOMContentLoaded', init) : init()