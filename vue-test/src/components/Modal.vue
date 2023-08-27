<template>
  <div class="modal-wrapper">
    <div class="modal">
      <div class="input-block">
        <label for="name">Name</label>
        <input
          v-model="nameInput"
          name="name"
          class="modal-input"
          type="text"
          placeholder="Eliud Kipchoge"
        />
      </div>
      <div class="input-block">
        <label for="telephone">Telephone</label>
        <input
          v-model="telephoneInput"
          name="telephone"
          class="modal-input"
          type="text"
          placeholder="111-111-111"
        />
      </div>
      <button @click="confirmUserAdd" class="add-button">Confirm</button>
      <span class="modal-error" v-show="modalError">
        Please check your inputs and try again.
      </span>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Modal',
  props: ['closeModal'],
  setup(props) {
    const nameInput = ref(null)
    const telephoneInput = ref(null)
    const modalError = ref(false)

    const { closeModal } = props

    const confirmUserAdd = () => {
      if (!nameInput.value || !telephoneInput.value) {
        modalError.value = true
        return
      } else {
        modalError.value = false
        closeModal()
      }
    }
    return {
      nameInput,
      telephoneInput,
      modalError,
      confirmUserAdd
    }
  }
}
</script>
