export const createUser = ({
  name,
  phone,
  id,
  isParent = false,
  isChild = false,
  subUsers = []
}) => {
  return {
    name,
    phone,
    id,
    isParent,
    isChild,
    subUsers
  }
}
