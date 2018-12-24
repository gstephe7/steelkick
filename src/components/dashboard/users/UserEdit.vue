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
        <select v-model="admin">
          <option :value="false">No</option>
          <option :value="true">Yes</option>
        </select>
      </span>
    </div>

    <div class="buttons">
      <button @click="$router.push('manage-users')">Cancel</button>
      <button class="success" @click="$router.push('manage-users')">Update User</button>
    </div>

    <div class="buttons">
      <button class="alert" @click="toggleDelete">Delete User</button>
    </div>

    <div v-if="showDelete" class="delete-div">
      <p>Are you sure you want to delete this user?</p>
      <div class="delete-buttons">
        <button @click="toggleDelete">No</button>
        <button @click="$router.push('manage-users')">Yes</button>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      user: this.$route.query.user,
      admin: this.$route.query.user.admin,
      showDelete: false
    }
  },
  methods: {
    toggleDelete () {
      this.showDelete = !this.showDelete
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
