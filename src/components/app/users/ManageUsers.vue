<template>
  <div main>

    <h1>Manage Users</h1>

    <div>
      <UserPreview :user="user"
                   v-for="user in users"
                   :key="user._id">
      </UserPreview>
    </div>

    <div col center>
      <button @click="$router.push('new-user')">Add New User</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import UserPreview from '@/components/app/users/UserPreview'

export default {
  components: {
    UserPreview
  },
  data () {
    return {
      users: []
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/users/all-users`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.users = res.data.users
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
