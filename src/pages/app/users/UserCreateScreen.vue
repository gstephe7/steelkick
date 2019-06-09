<template>
  <Screen @close="$emit('close')">

    <template #title>
      Create New User
    </template>

    <template #actions>
      <Button text @click="submit">
        SAVE
      </Button>
    </template>

    <template #content>
      <UserForm ref="userForm" @close="$emit('close')">
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
      this.$refs.userForm.submit()
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
