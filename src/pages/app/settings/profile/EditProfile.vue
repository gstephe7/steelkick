<template>
  <div class="main">

    <div v-if="loaded" class="article">

      <h1>Edit Your Profile</h1>

      <br>

      <div>
        <EditUser v-if="editing.user"
                  :user="user"
                  @close="editing.user = false">
        </EditUser>

        <ViewUser v-else
                  :user="user"
                  @editing="editing.user = true">
        </ViewUser>
      </div>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import ViewUser from './ViewUser'
import EditUser from './EditUser'

export default {
  components: {
    ViewUser,
    EditUser
  },
  data () {
    return {
      user: {},
      editing: {
        user: false
      },
      loaded: false
    }
  },
  created () {
    api.get('/users/user', {
      userId: this.$store.getters.userId
    }, res => {
      this.user = res.data.user
      this.loaded = true
    }, 'load')
  }
}
</script>

<style lang="scss" scoped>
  .main {
    max-width: 600px;
  }
</style>
