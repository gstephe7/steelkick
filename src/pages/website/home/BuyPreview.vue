<template>
  <div class="container col">
    <h2>Buy Steel For Less</h2>
    <icon icon="shipping-fast"></icon>
    <p>Need steel? You can find excess steel being sold by other fabricators in your area. You'll most likely get it fast since it's local, pay less per pound for it, and won't have to order a minimum length.</p>
    <Button outline @click="$router.push('Search')">
      Advanced Search
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
