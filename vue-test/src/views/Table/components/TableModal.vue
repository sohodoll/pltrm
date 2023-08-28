<template>
  <div class="modal">
    <div class="input-block">
      <label for="name">Name:</label>
      <input
        v-model="nameInput"
        name="name"
        class="modal-input"
        type="text"
        placeholder="Eliud Kipchoge (at least 5 symbols)"
      />
    </div>
    <div class="input-block">
      <label for="telephone">Telephone:</label>
      <input
        v-model="telephoneInput"
        name="telephone"
        class="modal-input"
        type="text"
        placeholder="111-111-111 (9 numbers)"
        @input="onTelephoneInput"
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
    <button @click="confirmButtonAction" class="add-button">Confirm</button>
    <span class="modal-error" v-show="modalError">
      Please check your inputs and try again.
    </span>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'TableModal',
  props: ['closeModal', 'submitAction', 'users', 'getAllUsers'],
  setup(props) {
    const nameInput = ref(null)
    const telephoneInput = ref(null)
    const parentUser = ref(null)
    const modalError = ref(false)

    const { closeModal, users, submitAction, getAllUsers } = props
    const currentUsers = getAllUsers(users)

    //formatting the telephone input
    const onTelephoneInput = () => {
      if (telephoneInput.value.length === 3) {
        telephoneInput.value += '-'
      } else if (telephoneInput.value.length === 7) {
        telephoneInput.value += '-'
      } else if (telephoneInput.value.length === 12) {
        telephoneInput.value = telephoneInput.value.slice(0, -1)
      }
    }

    //client-side validation
    const validateInputs = () => {
      if (
        !nameInput.value ||
        !telephoneInput.value ||
        nameInput.value.length < 5 ||
        telephoneInput.value.length < 11
      ) {
        modalError.value = true
        return
      } else {
        modalError.value = false
      }
    }

    const confirmButtonAction = () => {
      validateInputs()
      if (modalError.value) {
        return
      } else {
        //if there is no parent user, we pass false and null to the submitAction function (addUser, in this case)
        if (!parentUser.value) {
          submitAction(nameInput.value, telephoneInput.value, false, null)
        } else {
          submitAction(
            nameInput.value,
            telephoneInput.value,
            true,
            parentUser.value
          )
        }
      }
      closeModal()
    }

    return {
      nameInput,
      telephoneInput,
      onTelephoneInput,
      parentUser,
      currentUsers,
      modalError,
      confirmButtonAction
    }
  }
}
</script>
