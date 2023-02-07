const html = document.querySelector('html')
const body = document.querySelector('body')
const sidebar = body.querySelector('nav')
const toggle = body.querySelector('.toggle')
const modeSwitch = body.querySelector('.toggle-switch')
const modeText = body.querySelector('.mode-text')
const logout = body.querySelector('#logout')
const welcome = body.querySelector('#welcome')
const workspaceTaskBoard = body.querySelector('#workspaceTaskBoard')

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

const toggleClass = (el, ...args) => {
  args.map(e => el.classList.toggle(e))
}

workspaceTaskBoard?.addEventListener('click', (e) => {
  if (e.target.classList.contains('add-task')) {
    e.target.closest('div.tBbody').querySelector('.tlist').innerHTML += `<div class="col-12 bg-white mb-2 p-3 titem">
        <div class="text-group d-none">
          <input type="checkbox" class="checker">
          <span class="item-text"></span>
          <i class="bx bx-trash icon text-danger float-end p-1 item-trash"></i>
        </div>
        <div class="input-group active">
          <input type="text" class="form-control bg-white task-input" data-task-id="">
          <div class="input-group-text bg-primary text-white task-input-save-btn"><i class="bx bx-check icon task-input-save-btn"></i></div>
        </div>
      </div>`
  }
  
  if (e.target.classList.contains('checker')) {
    let itemText = e.target.closest('div.titem').querySelector('span.item-text')
    toggleClass(itemText, 'text-decoration-line-through')
    
    let inputGroup = e.target.closest('div.titem').querySelector('.input-group')
    if(inputGroup.classList.contains('active')){
      toggleClass(inputGroup, 'active', 'd-none')
    }
  }
  
  if (e.target.classList.contains('item-text')) {
    toggleClass(e.target.closest('div.titem').querySelector('.input-group'), 'active', 'd-none')
    toggleClass(e.target.closest('div.titem').querySelector('.text-group'), 'd-none')
  }

  if (e.target.classList.contains('task-input-save-btn')) {
    let taskInput = e.target.closest('div.titem').querySelector('.task-input')
    let tasboardId = e.target.closest('div.tBbody').querySelector('.taskboard-id').value
    e.target.closest('div.titem').querySelector('span.item-text').innerText = taskInput.value

    toggleClass(e.target.closest('div.titem').querySelector('.input-group'), 'active', 'd-none')
    toggleClass(e.target.closest('div.titem').querySelector('.text-group'), 'd-none')

    // submit to backend
    const newtask = async () => {
      const createdTask = await createOrUpdateTask(tasboardId, taskInput.value, taskInput.dataset.taskId)
      if (createdTask._id) {
        taskInput.dataset.taskId = createdTask._id
      }
    }
    newtask()
  }

  if (e.target.classList.contains('item-trash')) {
    let taskInput = e.target.closest('div.titem').querySelector('.task-input')
    // delete from db too
    const removeTask = async () => {
      await deleteTask(taskInput.dataset.taskId)
      e.target.closest('div.titem').remove()
    }
    removeTask()
  }
})


