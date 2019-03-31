<template>
  <div main>

    <h1>Edit User</h1>

    <dl>

      <div row>
        <dt>
          First Name:
        </dt>
        <dd grow>
          {{ user.firstName }}
        </dd>
      </div>

      <div row>
        <dt>
          Last Name:
        </dt>
        <dd grow>
          {{ user.lastName }}
        </dd>
      </div>

      <div row>
        <dt>
          Email:
        </dt>
        <dd grow>
          {{ user.email }}
        </dd>
      </div>

    </dl>

    <div>
      <label between align>
        Admin:
        <select v-if="user.owner">
          <option selected>Yes</option>
        </select>
        <select v-else v-model="user.admin">
          <option :value="false">No</option>
          <option :value="true">Yes</option>
        </select>
      </label>
    </div>

    <br>

    <div center>
      <div box around>
        <button small @click="$router.push('manage-users')">Cancel</button>
        <button small green @click="updateUser">Update User</button>
      </div>
    </div>

    <br>

    <div center>
      <button red @click="toggleDelete">Delete User</button>
    </div>

    <div col center v-if="showDelete">
      <p>Are you sure you want to delete this user?</p>
      <div around>
        <button small @click="toggleDelete">No</button>
        <button small @click="deleteUser">Yes</button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      user: {},
      showDelete: false
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios
      .get(`${api.baseUrl}/users/user`, {
        params: {
          id: this.$route.query.id
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.user = res.data.user
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
  },
  methods: {
    toggleDelete () {
      this.showDelete = !this.showDelete
    },
    updateUser () {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/users/edit-user`, {
        user: this.user
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('manage-users')
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    },
    deleteUser () {
      this.$store.dispatch('loading')
      api.axios.delete(`${api.baseUrl}/users/delete-user`, {
        params: {
          id: this.user._id
        }
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('manage-users')
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  dt {
    width: 100px;
  }
</style>
