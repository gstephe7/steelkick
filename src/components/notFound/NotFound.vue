<template>
  <div id="not-found">
    <h2>Page Not Found</h2>
    <p>We're sorry, we couldn't find the page you're looking for.</p>
    <router-link :to="{ name: 'Home' }">Return Home</router-link>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #not-found {
    max-width: 600px;
    margin: auto;
    height: 400px;
    padding: 50px 10px;
    text-align: center;
    h2 {
      font-size: 40px;
    }
  }
</style>
