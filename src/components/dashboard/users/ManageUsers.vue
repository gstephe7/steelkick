<template>
  <div id="manage-users">

    <h3>Manage Users</h3>

    <div class="users">

      <div class="user" v-for="user in users" :key="user.email" @click="viewUser(user)">

        <UserPreview :user="user"></UserPreview>

      </div>

    </div>

    <div>
      <button @click="$router.push('new-user')">Add New User</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import UserPreview from '@/components/dashboard/users/UserPreview'

export default {
  components: {
    UserPreview
  },
  data () {
    return {
      users: []
    }
  },
  methods: {
    viewUser (user) {
      this.$router.push({
        path: 'edit-user',
        query: {
          user: user
        }
      })
    }
  },
  created () {
    api.axios.get(`${api.baseUrl}/users/all-users`, {
      params: {
        company: this.$store.getters.companyName
      }
    })
    .then(res => {
      this.users = res.data.users
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #manage-users {
    max-width: 800px;
    margin: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .users {
    width: 100%;
  }

  .user {
    cursor: pointer;
  }
</style>
