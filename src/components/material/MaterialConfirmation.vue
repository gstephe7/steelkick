<template>
  <div id="material-confirmation">

    <fa-icon icon="check-circle" class="icon"></fa-icon>

    <p v-if="$route.query.newEntry">You have successfully added new material!</p>
    <p v-if="$route.query.edit">You have successfully updated your material!</p>

    <router-link v-if="$route.query.newEntry" :to="{ name: 'AddMaterial' }">
      Add another entry
    </router-link>

    <router-link :to="{ name: 'Inventory' }">
      View your inventory
    </router-link>

    <router-link :to="{ name: 'DashboardHome' }">
      Return to the dashboard
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
    height: 300px;
    margin: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    text-align: center;
  }

  .icon {
    color: $success;
    font-size: 75px;
  }

  a {
    margin: 2px;
  }
</style>
