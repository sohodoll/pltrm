<template>
  <div class="table-container">
    <div class="header">
      <h3 @click="sortByNames" class="title">Имя</h3>
      <h3 @click="sortByPhone" class="title">Телефон</h3>
    </div>
    <div class="content">
      <UserRow
        v-for="user in users"
        :key="user.id"
        :user="user"
        :nestingLevel="0"
      />
    </div>
  </div>
</template>

<script>
import UserRow from './components/UserRow'
import { ref } from 'vue'

export default {
  name: 'Table',
  components: {
    UserRow
  },
  props: ['users', 'sortUsers'],
  setup(props) {
    const { users, sortUsers } = props

    const sort = ref({
      key: 'name',
      order: 'desc'
    })

    const handleSort = () => {
      sort.value.order = sort.value.order === 'asc' ? 'desc' : 'asc'
      sortUsers(users, sort.value.key, sort.value.order)
    }

    const sortByNames = () => {
      sort.value.key = 'name'
      handleSort()
    }

    const sortByPhone = () => {
      sort.value.key = 'phone'
      handleSort()
    }

    return {
      sortByNames,
      sortByPhone
    }
  }
}
</script>
