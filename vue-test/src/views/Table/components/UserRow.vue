<template>
  <div>
    <div :class="rowClass">
      <div class="cell">
        <span :style="nameCellStyle">{{ user.name }}</span>
        <DotsIcon v-if="user.subUsers && user.subUsers.length" />
      </div>
      <div class="cell">{{ user.phone }}</div>
    </div>
    <div v-if="user.subUsers && user.subUsers.length" class="sub-users">
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
import UserRow from './UserRow'
import DotsIcon from '@/icons/DotsIcon'

export default {
  name: 'UserRow',
  components: {
    UserRow,
    DotsIcon
  },
  props: ['user', 'nestingLevel', 'totalUserCount'],
  setup(props) {
    const rowClass =
      props.totalUserCount === props.user.id ? 'row last-row' : 'row'

    const nameCellStyle = {
      marginLeft: `${props.nestingLevel * 20}px`
    }

    return {
      rowClass,
      nameCellStyle
    }
  }
}
</script>
