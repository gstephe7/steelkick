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

  </section>
</template>

<script>
export default {
  props: ['user'],
  methods: {
    viewUser () {
      this.$router.push({
        path: 'user-details',
        query: {
          userId: this.user._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
