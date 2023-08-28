import { ref } from 'vue'
import { mockUsers } from '@/data/mockUsers.js'

//create a composable function to keep our code simple
export const getUsers = () => {
  const users = ref(JSON.parse(localStorage.getItem('users') || '[]'))
  const error = ref(null)

  //recursively getting all users to select them in the modal
  const getAllUsers = usersArray => {
    let allUsers = []
    usersArray.forEach(user => {
      allUsers.push(user)
      if (user.isParent) {
        allUsers = [...allUsers, ...getAllUsers(user.subUsers)]
      }
    })

    return allUsers
  }

  //recursively finding a user by id
  const findUser = (usersArray, userId) => {
    let user = null

    usersArray.forEach(userItem => {
      if (userItem.id === userId) {
        user = userItem
        return
      } else if (userItem.isParent) {
        user = findUser(userItem.subUsers, userId)
        return
      }
    })

    return user
  }

  const syncLocalStorage = () => {
    localStorage.setItem('users', JSON.stringify(users.value))
  }

  const addUser = (userName, userTelephone, isChild, childToUserId) => {
    const user = {
      id: Date.now(),
      name: userName,
      phone: userTelephone,
      isParent: false,
      isChild,
      subUsers: []
    }

    //pushing the new user to the subusers or the main users array
    if (isChild) {
      const parentUser = findUser(users.value, childToUserId)
      if (parentUser) {
        parentUser.subUsers.push(user)
        parentUser.isParent = true
      } else {
        error.value = 'Parent user not found!'
        return
      }
    } else {
      users.value.push(user)
    }

    syncLocalStorage()
  }

  //fill the array with mock data if it's empty
  if (!users.value.length) {
    users.value = mockUsers()
    syncLocalStorage()
  }

  return {
    users,
    error,
    addUser,
    getAllUsers
  }
}
