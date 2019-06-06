<template>
  <Screen @close="$emit('close')">

    <template #title>
      Edit Profile
    </template>

    <template #actions>
      <Button text @click="$refs.edit.editUser()">
        SAVE
      </Button>
    </template>

    <template #content>
      <EditUser ref="edit" :user="user" @close="$emit('close')">
      </EditUser>
    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'
import EditUser from './EditUser'

export default {
  components: {
    EditUser
  },
  data () {
    return {
      user: {}
    }
  },
  created () {
    api.get('/users/user', {
      userId: this.$store.getters.userId
    }, res => {
      this.user = res.data.user
      this.loaded = true
    }, 'load')
  }
}
</script>

<style lang="scss" scoped>
</style>
