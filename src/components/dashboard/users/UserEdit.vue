<template>
  <div id="user-edit">

    <h3>Edit User</h3>

    <div>
      <p>First Name: {{ user.firstName }}</p>
      <p>Last Name: {{ user.lastName }}</p>
      <p>Email: {{ user.email }}</p>
    </div>

    <div>
      <span>
        Admin:
        <select v-if="user.owner">
          <option selected>Yes</option>
        </select>
        <select v-else v-model="user.admin">
          <option :value="false">No</option>
          <option :value="true">Yes</option>
        </select>
      </span>
    </div>

    <div class="buttons">
      <button @click="$router.push('manage-users')">Cancel</button>
      <button class="success" @click="updateUser">Update User</button>
    </div>

    <div class="buttons">
      <button class="alert" @click="toggleDelete">Delete User</button>
    </div>

    <div v-if="showDelete" class="delete-div">
      <p>Are you sure you want to delete this user?</p>
      <div class="delete-buttons">
        <button @click="toggleDelete">No</button>
        <button @click="deleteUser">Yes</button>
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
  @import '@/assets/scss/variables.scss';

  #user-edit {
    max-width: 800px;
    margin: auto;
    padding: 10px;
  }

  h3 {
    text-align: center;
    margin-bottom: 50px;
  }

  select {
    border: 1px solid $accent;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    max-width: 300px;
    margin: 50px auto 0px;
  }

  button {
    margin: 0;
    width: 125px;
  }

  .success {
    background-color: $success;
  }

  .alert {
    background-color: $alert;
    width: 200px;
  }

  .delete-div {
    text-align: center;
    max-width: 300px;
    margin: auto;
  }

  .delete-buttons {
    display: flex;
    justify-content: space-around;
  }
</style>
