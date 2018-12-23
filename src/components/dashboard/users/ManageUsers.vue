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
import UserPreview from '@/components/dashboard/users/UserPreview'

export default {
  components: {
    UserPreview
  },
  data () {
    return {
      users: [
        {
          firstName: 'Greg',
          lastName: 'Stephens',
          email: 'gstephe7@gmail.com',
          admin: true
        },
        {
          firstName: 'Jose',
          lastName: 'Valencia',
          email: 'jvalencia@gmail.com',
          admin: false
        },
        {
          firstName: 'Tyler',
          lastName: 'Keifer',
          email: 'tkmoney@gmail.com',
          admin: true
        },
        {
          firstName: 'Butch',
          lastName: 'Davis',
          email: 'butch@bencowelding.com',
          admin: true
        },
        {
          firstName: 'Ken',
          lastName: 'Bennett',
          email: 'ken@bencowelding.com',
          admin: true
        },
        {
          firstName: 'Al',
          lastName: 'Yargo',
          email: 'ayargo@gmail.com',
          admin: false
        }
      ]
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
