<template>
  <div id="about">
    <h2>How Does SteelKick Work?</h2>
    <fa-icon class="icon" icon="exchange-alt"></fa-icon>
    <p>Need steel? You can find excess steel being sold by other fabricators in your area. You'll most likely pay less per pound for it and won't have to order a minimum length. Just search for the material you need, place an order, and contact the seller to arrange pickup or delivery - no greedy steel suppliers involved.</p>
    <button>Create Free Account</button>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #about {
    height: 400px;
    max-width: 400px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .icon {
    font-size: 50px;
    color: $accent;
  }
</style>
