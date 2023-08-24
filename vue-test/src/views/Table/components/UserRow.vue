<template>
  <div>
    <div :class="rowClass">
      <div class="cell">
        <span class="svg-wrapper" :style="nameCellStyle">
          <DotIcon v-if="nestingLevel > 0"> </DotIcon>
        </span>
        {{ user.name }}
        <span
          class="svg-wrapper"
          @click="toggleSubUsers"
          v-if="user.subUsers && user.subUsers.length"
        >
          <DotsIcon />
        </span>
      </div>
      <div class="cell">{{ user.phone }}</div>
    </div>
    <div
      v-if="showSubUsers && user.subUsers && user.subUsers.length"
      class="sub-users"
    >
      <UserRow
        v-for="subUser in user.subUsers"
        :user="subUser"
        :key="subUser.id"
        :nestingLevel="nestingLevel + 1"
      />
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import UserRow from './UserRow'
import DotsIcon from '@/icons/DotsIcon'
import DotIcon from '@/icons/DotIcon'

export default {
  name: 'UserRow',
  components: {
    UserRow,
    DotsIcon,
    DotIcon
  },
  props: ['user', 'nestingLevel', 'totalUserCount'],
  setup(props) {
    const rowClass =
      props.totalUserCount === props.user.id ? 'row last-row' : 'row'

    const nameCellStyle = {
      marginLeft: `${props.nestingLevel * 20}px`
    }

    const showSubUsers = ref(false)

    const toggleSubUsers = () => {
      showSubUsers.value = !showSubUsers.value
    }

    return {
      rowClass,
      nameCellStyle,
      showSubUsers,
      toggleSubUsers
    }
  }
}
</script>
