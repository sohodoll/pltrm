import { createUser } from '../utils/createUser'

export const mockUsers = () => {
  const mockUsersArray = [
    createUser({
      name: 'John Doe',
      phone: '555-555-5555',
      id: 1,
      isParent: true,
      isChild: false,
      subUsers: [
        createUser({
          name: 'Mary Doe',
          phone: '555-555-5555',
          id: 4,
          isParent: true,
          isChild: true,
          subUsers: [
            createUser({
              name: 'Macy Doe',
              phone: '555-555-5555',
              id: 5,
              isParent: true,
              isChild: true,
              subUsers: [
                createUser({
                  name: 'Jack Last',
                  phone: '555-555-5555',
                  id: 6
                })
              ]
            })
          ]
        })
      ]
    }),
    createUser({
      name: 'Parent Doe',
      phone: '555-555-5555',
      id: 2
    }),
    createUser({
      name: 'John Parent',
      phone: '555-555-5555',
      id: 3
    })
  ]

  return mockUsersArray
}
