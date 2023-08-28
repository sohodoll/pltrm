<template>
  <div @click="closeModal" class="modal-wrapper">
    <div @click.stop>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: ['closeModal']
}
</script>
