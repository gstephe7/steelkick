<template>
  <div main col center>

    <icon confirm icon="check-circle"></icon>

    <p>You have successfully added a new part!</p>

    <router-link :to="{ name: 'CreatePart' }" id="create">
      Create another part
    </router-link>

    <router-link :to="{ name: 'Parts' }">
      View all parts
    </router-link>

    <router-link :to="{ name: 'Dashboard' }">
      Return to the dashboard
    </router-link>

  </div>
</template>

<script>
export default {
  mounted () {
    document.getElementById('create').focus()
  }
}
</script>

<style lang="scss" scoped>
</style>
