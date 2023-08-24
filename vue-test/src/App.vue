<template>
  <main id="app">
    <Table :users="users" />
    <Modal v-if="showModal" />
  </main>
</template>

<script>
import { ref } from 'vue'
import { getUsers } from '@/composables/getUsers'
import Table from '@/views//Table/Table'
import Modal from '@/components/Modal'

export default {
  name: 'App',
  components: {
    Table,
    Modal
  },
  setup() {
    const showModal = ref(false)
    const { users, error } = getUsers()

    return {
      showModal,
      users,
      error
    }
  }
}
</script>
