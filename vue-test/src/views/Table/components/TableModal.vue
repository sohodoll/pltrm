<template>
  <div class="modal">
    <div class="input-block">
      <label for="modal-name">Name:</label>
      <input
        v-model="nameInput"
        name="name"
        id="modal-name"
        class="modal-input"
        type="text"
        placeholder="Eliud Kipchoge (at least 5 symbols)"
      />
    </div>
    <div class="input-block">
      <label for="modal-phone">Phone:</label>
      <input
        v-model="phoneInput"
        id="modal-phone"
        name="phone"
        class="modal-input"
        type="text"
        placeholder="111-111-111 (9 numbers)"
        @input="onPhoneInput"
      />
    </div>
    <div class="input-block">
      <label for="users">Subuser of:</label>
      <select class="modal-input" v-model="parentUser" name="users" id="users">
        <option v-for="user in currentUsers" :key="user.id" :value="user.id">
          {{ user.name }}
        </option>
      </select>
    </div>
    <button @click="onConfirmButton" class="add-button">Confirm</button>
    <span class="modal-error" v-show="modalError">
      Please check your inputs and try again.
    </span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TableModal',
  props: ['closeModal', 'addUser', 'users', 'getAllUsers'],
  setup(props) {
    const nameInput = ref(null)
    const phoneInput = ref(null)
    const parentUser = ref(null)
    const modalError = ref(false)

    const { closeModal, users, addUser, getAllUsers } = props
    const currentUsers = getAllUsers(users)

    //formatting the telephone input
    const onPhoneInput = event => {
      if (event && event.inputType === 'deleteContentBackward') {
        return
      }

      phoneInput.value = phoneInput.value.replace(/[^\d-]/g, '')
      if (phoneInput.value.length === 3) {
        phoneInput.value += '-'
      } else if (phoneInput.value.length === 7) {
        phoneInput.value += '-'
      } else if (phoneInput.value.length === 12) {
        phoneInput.value = phoneInput.value.slice(0, -1)
      }
    }

    //client-side validation
    const validateInputs = () => {
      if (
        !nameInput.value ||
        !phoneInput.value ||
        nameInput.value.length < 5 ||
        phoneInput.value.length < 11
      ) {
        modalError.value = true
        return
      } else {
        modalError.value = false
      }
    }

    const onConfirmButton = () => {
      validateInputs()
      if (modalError.value) {
        return
      } else {
        //if there is no parent user, we pass false and null to the addUser function (will be clearer with TS)
        if (!parentUser.value) {
          addUser(nameInput.value, phoneInput.value, false, null)
        } else {
          addUser(nameInput.value, phoneInput.value, true, parentUser.value)
        }
      }
      closeModal()
    }

    return {
      nameInput,
      phoneInput,
      onPhoneInput,
      parentUser,
      currentUsers,
      modalError,
      onConfirmButton
    }
  }
}
</script>
