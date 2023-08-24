export const mockUsers = [
  {
    name: 'Andrew',
    id: 1,
    phone: '777 - 777 - 777',
    isParent: true,
    isChild: false,
    subUsers: [
      {
        name: 'Alex',
        id: 4,
        phone: '888 - 888 - 888',
        isParent: false,
        isChild: true,
        subUsers: []
      }
    ]
  },
  {
    name: 'Michael',
    id: 2,
    phone: '777 - 777 - 777',
    isParent: false,
    isChild: false,
    subUsers: []
  },
  {
    name: 'Jane',
    id: 3,
    phone: '777 - 777 - 777',
    isParent: false,
    isChild: false,
    subUsers: []
  }
]
