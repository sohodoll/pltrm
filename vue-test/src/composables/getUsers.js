import { ref } from 'vue'
import { mockUsers } from '@/data/mockUsers.js'

//create a composable function to keep our code clean
export const getUsers = () => {
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))
  const error = ref(null)

  if (!users.value.length) {
    localStorage.setItem('users', JSON.stringify(mockUsers))
    users.value = mockUsers
  }

  if (!users.value.length) {
    error.value = 'No users found. Click the add button!'
  }

  return {
    users,
    error
  }
}
