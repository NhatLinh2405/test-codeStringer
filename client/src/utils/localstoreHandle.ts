function setItem<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value))
}

function getItem(key: string) {
  const value = localStorage.getItem(key)
  try {
    return value ? JSON.parse(value) : null
  } catch (error) {
    removeItem('accessToken')
    removeItem('refreshToken')
    return null
  }
}

function removeItem(key: string) {
  localStorage.removeItem(key)
}

function handleSaveUser(accessToken: string, refreshToken: string) {
  setItem('accessToken', accessToken)
  setItem('refreshToken', refreshToken)
}

function handleRemoveUser() {
  removeItem('accessToken')
  removeItem('refreshToken')
}

export { getItem, handleRemoveUser, handleSaveUser, removeItem, setItem }
