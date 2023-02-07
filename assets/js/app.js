const html = document.querySelector('html')
const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const logout = body.querySelector('#logout')
const welcome = body.querySelector('#welcome')
const tlist = body.querySelector('#workspaceTaskBoard')

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close')
})

let getMode = localStorage.getItem('mode')
if (getMode && getMode === 'dark') {
  body.classList.toggle('dark')
  html.setAttribute('data-bs-theme', 'dark')
} else {
  html.setAttribute('data-bs-theme', 'light')
}

modeSwitch.addEventListener('click', () => {
  body.classList.toggle('dark')

  if (body.classList.contains('dark')) {
    modeText.innerText = 'Light mode'
    addToLocal('mode', 'dark')
    html.setAttribute('data-bs-theme', 'dark')
  } else {
    modeText.innerText = 'Dark mode'
    addToLocal('mode', 'light')
    html.setAttribute('data-bs-theme', 'light')
  }
})

logout.addEventListener('click', () => {
  clearLocal()
  location.assign('/login')
})

const checkAccess = (res) => {
  if (res?.status == 401) {
    alert(
      'Your access to these system have expired. Please login again to regain access.',
    )
    clearLocal()
    location.assign('/login')
  }
}

const setupUserData = () => {
  const user = JSON.parse(readFromLocal("user"))
  welcome.innerText = (user) ? `Welcome, ${user.first_name}` : `Hello`
}

setupUserData()

tlist.addEventListener('click', (e) => {
  if (e.target.classList.contains('checker')) {
    e.target.closest('div.titem').querySelector('span.item-text').classList.toggle('text-decoration-line-through')
  }
})
