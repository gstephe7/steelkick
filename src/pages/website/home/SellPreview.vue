<template>
  <div class="container col">
    <h2>Sell Your Excess Steel</h2>
    <icon icon="dollar-sign"></icon>
    <p>Have excess steel sitting around your shop or at the job site? Make more money by selling it directly to other fabricators in your area.</p>
    <Button outline @click="$router.push('/add-material')">
      List New Material
    </Button>
    <Button text @click="$router.push('/inventory')">
      Manage My Inventory
    </Button>
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
    margin-bottom: 8px;
  }
</style>
