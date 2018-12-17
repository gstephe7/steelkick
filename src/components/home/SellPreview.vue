<template>
  <div id="sell-preview">
    <h2>Sell Your Excess Steel</h2>
    <fa-icon class="icon" icon="dollar-sign"></fa-icon>
    <p>Have excess steel sitting around your shop or at the job site? Make more money by selling it directly to other fabricators in your area.</p>
    <button @click="$router.push('/new-listing')">List New Material</button>
    <button class="button-secondary">Manage My Inventory</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #sell-preview {
    height: 400px;
    max-width: 400px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .icon {
    color: $accent;
    font-size: 50px;
  }
</style>
