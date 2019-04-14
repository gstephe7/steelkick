<template>
  <div main col center>

    <icon confirm icon="check-circle"></icon>

    <p>You have successfully signed out. Come back again soon!</p>

    <router-link :to="{ name: 'Home' }">
      Back to homepage
    </router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
