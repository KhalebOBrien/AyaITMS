const addToLocal = (key, data) => {
  try {
    localStorage.setItem(key, data)
    return true
  } catch (error) {
    console.log(error)
    return false
  }
}

const readFromLocal = (key) => {
  return localStorage.getItem(key)
}
