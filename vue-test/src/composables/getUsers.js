import { ref } from 'vue'
import { mockUsers } from '@/data/mockUsers.js'

//this is the main logic behind the task
//I decided to use a simple constructor instead of vuex to keep everything simple and lightweight
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

  //sort users by type and order
  const sortUsers = (usersArray, type, order) => {
    if (order === 'asc') {
      usersArray.sort((a, b) => {
        if (a[type] < b[type]) {
          return -1
        }
        if (a[type] > b[type]) {
          return 1
        }
        return 0
      })
      //recursively sorting subusers
      usersArray.forEach(user => {
        if (user.isParent) {
          sortUsers(user.subUsers, type, order)
        }
      })
    } else if (order === 'desc') {
      usersArray.sort((a, b) => {
        if (a[type] > b[type]) {
          return -1
        }
        if (a[type] < b[type]) {
          return 1
        }
        return 0
      })
      usersArray.forEach(user => {
        if (user.isParent) {
          sortUsers(user.subUsers, type, order)
        }
      })
    }
  }

  //recursively finding a user by id
  const findUser = (usersArray, userId) => {
    let user = null

    for (const userItem of usersArray) {
      if (userItem.id === userId) {
        user = userItem
        break
      } else if (userItem.isParent) {
        user = findUser(userItem.subUsers, userId)
        if (user) {
          break
        }
      }
    }
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

    console.log('here')

    syncLocalStorage()
    console.log(users.value)
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
    sortUsers,
    getAllUsers
  }
}
