<template>
  <div col>
    <h2>Sell Your Excess Steel</h2>
    <icon icon="dollar-sign"></icon>
    <p>Have excess steel sitting around your shop or at the job site? Make more money by selling it directly to other fabricators in your area.</p>
    <button @click="$router.push('dashboard/add-material')">List New Material</button>
    <button grey @click="$router.push('dashboard/inventory')">Manage My Inventory</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  svg {
    font-size: 50px;
    color: $accent;
  }
</style>
