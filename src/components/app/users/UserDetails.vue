<template>
  <div main v-if="loaded">

    <div col>
      <h1>User Profile</h1>
    </div>

    <hr>

    <div wrap>

      <section box grow card>
        <div between align>
          <h3>User Info</h3>
          <icon small click class="blue" icon="edit" @click="editing = !editing">
          </icon>
        </div>
        <hr>
        <dl>
          <div row>
            <dt>First Name:</dt>
            <dd grow>{{ user.firstName }}</dd>
          </div>
          <div row>
            <dt>Last Name:</dt>
            <dd grow>{{ user.lastName }}</dd>
          </div>
          <div row>
            <dt>Email:</dt>
            <dd grow>{{ user.email }}</dd>
          </div>
        </dl>
      </section>

      <section box grow card>
        <div between align>
          <h3>User Actions</h3>
        </div>
        <hr>
        <div v-if="actions.length > 0">
          <Action v-for="action in actions"
                  :key="action._id"
                  :action="action"
                  :part="action.part">
          </Action>
        </div>
        <div v-else>
          <p col>No actions yet for this user</p>
        </div>
      </section>

    </div>

    <UserEdit v-if="editing"
              :user="user"
              @close="editing = false">
    </UserEdit>

  </div>
</template>

<script>
import api from '@/api/api'
import Action from '@/components/app/actions/Action'
import UserEdit from './UserEdit'

export default {
  components: {
    Action,
    UserEdit
  },
  data () {
    return {
      user: {},
      actions: [],
      loaded: false,
      editing: false
    }
  },
  created () {
    api.get('/users/user', {
      userId: this.$route.query.userId
    }, (res) => {
      this.user = res.data.user
      this.loaded = true
    }, 'load')

    api.get('/actions/user-actions', {
      userId: this.$route.query.userId
    }, (res) => {
      this.actions = res.data.actions
    })
  }
}
</script>

<style lang="scss" scoped>
  dt {
    width: 90px;
  }
</style>
