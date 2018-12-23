<template>
  <div id="new-user-confirmation">

    <fa-icon icon="check-circle" class="icon"></fa-icon>

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
  @import '@/assets/scss/variables.scss';

  #new-user-confirmation {
    max-width: 800px;
    margin: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon {
    color: $success;
    font-size: 75px;
  }
</style>
