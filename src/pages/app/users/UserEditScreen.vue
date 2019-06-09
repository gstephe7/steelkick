<template>
  <Screen @close="$emit('close')">

    <template #title>
      Edit User
    </template>

    <template #actions>
      <Button text @click="submit">
        SAVE
      </Button>
    </template>

    <template #content>
      <UserForm :edit="user" ref="userForm" @close="$emit('close')">
      </UserForm>
    </template>

  </Screen>
</template>

<script>
import UserForm from './UserForm'

export default {
  props: {
    user: Object
  },
  components: {
    UserForm
  },
  methods: {
    submit () {
      this.$refs.userForm.submitForm()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
