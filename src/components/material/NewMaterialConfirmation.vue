<template>
  <div id="material-confirmation">

    <fa-icon icon="check-circle" class="icon"></fa-icon>

    <p>You have successfully added new material!</p>

    <router-link :to="{ name: 'Inventory' }">
      View your inventory
    </router-link>

    <router-link :to="{ name: 'DashboardHome' }">
      Return to the dashboard
    </router-link>

    <router-link :to="{ name: 'Home' }">
      Return to the homepage
    </router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #material-confirmation {
    padding: 10px;
    max-width: 800px;
    height: 400px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    color: $success;
    font-size: 75px;
  }

  a {
    margin: 2px;
  }
</style>
