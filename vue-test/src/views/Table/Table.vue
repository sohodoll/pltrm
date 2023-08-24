<template>
  <div class="container">
    <div class="header">
      <h3 class="title">Имя</h3>
      <h3 class="title">Телефон</h3>
    </div>
    <div class="content">
      <article class="parent" v-for="user in users" :key="user.id">
        <UserRow
          :user="user"
          :nestingLevel="0"
          :totalUserCount="totalUserCount"
        />
      </article>
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
