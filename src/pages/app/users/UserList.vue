<template>
  <div>

    <List>

      <template #fab>
        <ButtonFab @click="showCreateUser = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="users.length > 0">
          <div v-for="user in users" :key="user._id">
            <UserItem :user="user">
            </UserItem>
          </div>
        </div>

        <div v-else class="col">
          <h3>No users created yet</h3>
        </div>

      </template>

    </List>

    <UserCreateScreen v-if="showCreateUser"
                      @close="showCreateUser = false">
    </UserCreateScreen>

  </div>
</template>

<script>
import api from '@/api/api'
import UserItem from './UserItem'
import UserCreateScreen from './UserCreateScreen'

export default {
  components: {
    UserItem,
    UserCreateScreen
  },
  data () {
    return {
      users: [],
      showCreateUser: false
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/users/all-users',
      load: true,
      data: {
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.users = res.data.users
      },
      err: err => {
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
