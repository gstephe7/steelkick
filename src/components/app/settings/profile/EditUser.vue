<template>
  <div>
    <Form @submit="editUser">

      <template v-slot:content>
        <InputText v-model="user.firstName" size="big">
          First Name
        </InputText>
        <InputText v-model="user.lastName" size="big">
          Last Name
        </InputText>
        <InputText v-model="user.email" size="big">
          Email
        </InputText>
        <InputText v-model="user.password" size="big" type="password">
          Password
        </InputText>
      </template>

      <template v-slot:action>
        Save
      </template>

    </Form>

    <div class="col">
      <button type="button" @click="$emit('close')">Cancel</button>
    </div>
  </div>
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
