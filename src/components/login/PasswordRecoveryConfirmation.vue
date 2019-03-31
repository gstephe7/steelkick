<template>
  <div main col center>

    <icon confirm icon="check-circle"></icon>

    <p>An email has been sent to you containing a link to reset your password.</p>

    <router-link :to="{ name: 'Login' }">
      Return to sign in page
    </router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
