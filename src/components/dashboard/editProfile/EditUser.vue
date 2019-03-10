<template>
  <div>
    <div class="input">
      First Name:
      <input v-model="user.firstName">
    </div>
    <div class="input">
      Last Name:
      <input v-model="user.lastName">
    </div>
    <div class="input">
      Email:
      <input v-model="user.email">
    </div>
    <div class="input">
      Password:
      <input v-model="user.password" type="password">
    </div>
    <div class="button-div">
      <button @click="$emit('close')">Cancel</button>
      <button @click="editUser">Save</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['user'],
  methods: {
    editUser () {
      this.$emit('close')
      api.axios.put(`${api.baseUrl}/users/edit-user`, {
        user: this.user
      })

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
  .button-div {
    display: flex;
    justify-content: space-around;
  }

  .input {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  input {
    border: 1px solid $accent;
    width: 175px;
  }

  select {
    border: 1px solid $accent;
    width: 197px;
  }

  .sub {
    margin: 25px 0 25px 10%;
    input {
      width: 60px;
    }
    select {
      width: 80px;
    }
    textarea {
      width: 90%;
      height: 150px;
    }
    div {
      flex: 1;
    }
    p {
      margin: 0;
    }
    .hours {
      min-width: 180px;
    }
  }
</style>
