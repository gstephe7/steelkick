<template>
  <div>

    <div between>
      First Name:
      <input big v-model="user.firstName">
    </div>
    <div between>
      Last Name:
      <input big v-model="user.lastName">
    </div>
    <div between>
      Email:
      <input big v-model="user.email">
    </div>
    <div between>
      Password:
      <input big v-model="user.password" type="password">
    </div>

    <br>

    <div around>
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
</style>
