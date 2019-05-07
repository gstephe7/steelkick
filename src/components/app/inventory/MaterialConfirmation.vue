<template>
  <div main col center>

    <icon confirm icon="check-circle"></icon>

    <p v-if="$route.query.newEntry">You have successfully added new material!</p>
    <p v-if="$route.query.edit">You have successfully updated your material!</p>

    <button @click="$router.push({name: 'AddMaterial'})">
      + Add Another Entry
    </button>

    <button @click="$router.push({name: 'Inventory'})">
      View Your Inventory
    </button>

    <button @click="$router.push({name: 'Dashboard'})">
      Return to Dashboard
    </button>

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
