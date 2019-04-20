<template>
  <div main col>

    <icon confirm icon="check-circle"></icon>

    <p v-if="$route.query.newEntry">You have successfully added new material!</p>
    <p v-if="$route.query.edit">You have successfully updated your material!</p>

    <router-link v-if="$route.query.newEntry" :to="{ name: 'AddMaterial' }">
      Add another entry
    </router-link>

    <router-link :to="{ name: 'Inventory' }">
      View your inventory
    </router-link>

    <router-link :to="{ name: 'Dashboard' }">
      Return to the dashboard
    </router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

  p {
    text-align: center;
  }

  a {
    margin: 2px;
  }
</style>
