<template>
  <Form @submit="editUser">

    <template v-slot:content>
      <InputText v-model="user.firstName" big>
        First Name
      </InputText>
      <InputText v-model="user.lastName" big>
        Last Name
      </InputText>
      <InputText v-model="user.email" big>
        Email
      </InputText>
      <InputText v-model="user.password" big type="password">
        Password
      </InputText>
    </template>

  </Form>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['user'],
  methods: {
    editUser () {
      api.axios.put(`${api.baseUrl}/users/edit-user`, {
        user: this.user
      })
      .then(() => {
        this.$emit('close')
        this.$store.dispatch('snackbar', 'Successfully updated profile!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
