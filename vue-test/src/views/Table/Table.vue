<template>
  <div class="container">
    <div class="header">
      <h3 class="title">Имя</h3>
      <h3 class="title">Телефон</h3>
    </div>
    <div class="content">
      <div class="row" v-for="user in users" :key="user.id">
        <div class="cell">{{ user.name }}</div>
        <div class="cell">{{ user.phone }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Table',
  components: {},
  props: ['users'],
  setup() {
    return {}
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
}

.header {
  display: flex;
  background-color: var(--color-secondary);
  border-top-left-radius: var(--border-radius);
  border-top-right-radius: var(--border-radius);
  font-weight: bold;
  border-bottom: 2px solid var(--color-primary);
}

.title {
  flex: 1;
  text-align: center;
  padding: 10px;
}

.title:not(:last-child) {
  border-right: 2px solid var(--color-primary);
}

.content {
  display: flex;
  flex-direction: column;
  background: var(--color-background);
  border-bottom-right-radius: var(--border-radius);
  border-bottom-left-radius: var(--border-radius);
}

.row {
  display: flex;
  justify-content: space-between;
}

.row:not(:last-child) {
  border-bottom: 2px solid var(--color-primary);
}

.cell {
  flex: 1;
  text-align: center;
  padding: 15px;
}

.cell:not(:last-child) {
  border-right: 2px solid var(--color-primary);
}
</style>
