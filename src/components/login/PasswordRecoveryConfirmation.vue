<template>
  <div id="confirmation">

    <fa-icon icon="check-circle" class="icon"></fa-icon>

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
  @import '@/assets/scss/variables.scss';

  #confirmation {
    height: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .icon {
    color: $success;
    font-size: 75px;
  }
</style>
