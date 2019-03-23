<template>
  <div col>
    <h2>Buy Steel For Less</h2>
    <icon icon="shipping-fast"></icon>
    <p>Need steel? You can find excess steel being sold by other fabricators in your area. You'll most likely get it fast since it's local, pay less per pound for it, and won't have to order a minimum length.</p>
    <button @click="$router.push('Search')">Advanced Search</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';
</style>
