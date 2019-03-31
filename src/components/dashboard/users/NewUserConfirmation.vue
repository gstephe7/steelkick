<template>
  <div main col>

    <icon confirm icon="check-circle"></icon>

    <p>New user successfully added! An email invite has been sent.</p>

    <router-link :to="{ name: 'ManageUsers' }">
      Back to user management
    </router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
