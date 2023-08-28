<template>
  <main id="app">
    <div class="container">
      <Table :users="users" :sortUsers="sortUsers" />
      <Modal v-if="showModal" :closeModal="closeModal">
        <TableModal
          :closeModal="closeModal"
          :users="users"
          :addUser="addUser"
          :getAllUsers="getAllUsers"
        />
      </Modal>
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
import TableModal from '@/views/Table/components/TableModal'
import Modal from '@/components/Modal'

export default {
  name: 'App',
  components: {
    Table,
    TableModal,
    Modal
  },
  setup() {
    const showModal = ref(false)
    const { users, error, addUser, getAllUsers, sortUsers } = getUsers()

    const closeModal = () => {
      showModal.value = false
    }

    return {
      showModal,
      closeModal,
      sortUsers,
      addUser,
      users,
      error,
      getAllUsers
    }
  }
}
</script>
