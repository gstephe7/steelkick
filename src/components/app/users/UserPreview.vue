<template>
  <section card click @click="viewUser(user)">

    <div between>

      <div>
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
      </div>

      <div>
        <span v-if="user.admin">Admin</span>
        <span v-else>User</span>
      </div>

    </div>

    <div between>
      <span>{{ user.email }}</span>
    </div>

    <br>

    <em col>
      Click to edit
    </em>

  </section>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    viewUser () {
      this.$router.push({
        path: 'edit-user',
        query: {
          id: this.user._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
