<template>
  <div class="table-container">
    <div class="header">
      <h3 class="title">Имя</h3>
      <h3 class="title">Телефон</h3>
    </div>
    <div class="content">
      <UserRow
        v-for="user in users"
        :key="user.id"
        :user="user"
        :nestingLevel="0"
        :totalUserCount="totalUserCount"
      />
    </div>
  </div>
</template>

<script>
import UserRow from './components/UserRow'

export default {
  name: 'Table',
  components: {
    UserRow
  },
  props: ['users', 'totalUserCount'],
  setup() {
    return {}
  }
}
</script>
