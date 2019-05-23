<template>
  <div class="main">

    <div col class="title">
      <h1>Company Users</h1>
      <h2>{{ $store.getters.companyName }}</h2>
    </div>

    <hr>

    <div col center>
      <button green @click="$router.push('new-user')">
        + Add New User
      </button>
    </div>

    <br>

    <div>
      <UserPreview :user="user"
                   v-for="user in users"
                   :key="user._id">
      </UserPreview>
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
        companyId: this.$store.getters.companyId
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
  .title {
    h1 {
      margin-bottom: 0;
    }
    h2 {
      margin-top: 0;
    }
  }
</style>
