<template>
  <div>

    <Item>

      <template #title>
        {{ name }}
      </template>

      <template #second>
        <div class="ellipsis">
          {{ user.email }}
        </div>
      </template>

      <template #metadata>
        {{ account }}
      </template>

      <template #actions>
        <Button text @click="showUserEdit = true">
          EDIT USER
        </Button>
      </template>

    </Item>

    <UserEditScreen v-if="showUserEdit"
                    @close="showUserEdit = false"
                    :user="user">
    </UserEditScreen>

  </div>
</template>

<script>
import UserEditScreen from './UserEditScreen'

export default {
  components: {
    UserEditScreen
  },
  props: {
    user: Object
  },
  data () {
    return {
      showUserEdit: false
    }
  },
  computed: {
    name () {
      let firstName = this.user.firstName || ''
      let lastName = this.user.lastName || ''

      if (firstName || lastName) {
        return `${firstName} ${lastName}`
      } else {
        return this.user.email
      }
    },
    account () {
      if (this.user.admin) return 'Admin'
      else return 'User'
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
