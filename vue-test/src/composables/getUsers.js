import { ref } from 'vue'
import { mockUsers } from '@/data/mockUsers.js'

//create a composable function to keep our code clean
export const getUsers = () => {
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))
  const totalUserCount = ref(users.value.length)
  const error = ref(null)

  const getTotalUserCount = usersArray => {
    let count = 0
    usersArray.forEach(user => {
      count += 1
      if (user.isParent) {
        count += getTotalUserCount(user.subUsers)
      }
    })

    return count
  }

  const syncLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const addUser = user => {
    users.value.push(user)
    syncLocalStorage()
    totalUserCount.value = getTotalUserCount(users.value)
  }

  if (!users.value.length) {
    users.value = mockUsers()
    syncLocalStorage()
    totalUserCount.value = getTotalUserCount(users.value)
  }

  if (!users.value.length) {
    error.value = 'No users found. Click the add button!'
  }

  return {
    users,
    error,
    totalUserCount,
    addUser
  }
}
