<template>
  <div id="confirmation">

    <fa-icon icon="check-circle" class="icon"></fa-icon>

    <p>Thank you for contacting SteelKick! We'll get back to you as soon as possible!</p>

    <router-link :to="{ name: 'Home' }">Return Home</router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #confirmation {
    max-width: 600px;
    height: 300px;
    margin: auto;
    padding: 50px 10px;
    text-align: center;
  }

  .icon {
    color: $success;
    font-size: 75px;
  }
</style>
