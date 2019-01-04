<template>
  <div id="logout">

    <fa-icon icon="check-circle" class="icon"></fa-icon>

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
  @import '@/assets/scss/variables.scss';

  #logout {
    max-width: 800px;
    height: 300px;
    margin: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
  }

  .icon {
    color: $success;
    font-size: 75px;
  }
</style>
