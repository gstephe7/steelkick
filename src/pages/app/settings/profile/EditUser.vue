<template>
  <Form @submitForm="editUser" ref="form" viewFirst>

    <template v-slot:content>
      <div class="col">
        <InputText v-model="user.firstName" big required>
          First Name
        </InputText>
        <InputText v-model="user.lastName" big required>
          Last Name
        </InputText>
        <InputText v-model="user.email" big required>
          Email
        </InputText>
        <InputText v-model="user.password" big type="password">
          Password
        </InputText>
      </div>
    </template>

  </Form>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['user'],
  methods: {
    submit () {
      this.$refs.form.submit()
    },
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
