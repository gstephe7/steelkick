<template>
  <div id="buy-preview">
    <h2>Buy Steel For Less</h2>
    <fa-icon class="icon" icon="shipping-fast"></fa-icon>
    <p>Need steel? You can find excess steel being sold by other fabricators in your area. You'll most likely get it fast since it's local, pay less per pound for it, and won't have to order a minimum length.</p>
    <button @click="$router.push('Search')">Advanced Search</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #buy-preview {
    height: 400px;
    width: 100%;
    max-width: 400px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    p {
      width: 100%;
    }
  }

  .icon {
    font-size: 50px;
    color: $accent;
  }
</style>
