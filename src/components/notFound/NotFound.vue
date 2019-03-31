<template>
  <div main col center>
    <h1>Page Not Found</h1>
    <p>
      We're sorry, we couldn't find the page you're looking for.
    </p>
    <router-link :to="{ name: 'Home' }">Return Home</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
