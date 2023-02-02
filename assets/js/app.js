const html = document.querySelector('html')
const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const logout = body.querySelector('#logout')

toggle.addEventListener('click', () => {
  sidebar.classList.toggle('close')
})

let getMode = localStorage.getItem("mode");
if(getMode && getMode ==="dark"){
  body.classList.toggle("dark");
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
