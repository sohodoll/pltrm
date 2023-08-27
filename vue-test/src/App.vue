<template>
  <main id="app">
    <div class="container">
      <Table :users="users" :totalUserCount="totalUserCount" />
      <Modal v-if="showModal" :closeModal="closeModal" />
      <button type="button" class="add-button" @click="showModal = !showModal">
        Add User
      </button>
    </div>
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
    const { users, error, totalUserCount, addUser } = getUsers()

    const closeModal = () => {
      showModal.value = false
    }

    return {
      showModal,
      closeModal,
      users,
      error,
      totalUserCount
    }
  }
}
</script>
