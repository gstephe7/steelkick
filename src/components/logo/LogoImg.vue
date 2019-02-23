<template>
  <div>
    <h1 class="logo title-a">STEEL<span class="title-b">KICK</span></h1>

    <h1 class="logo title-a">S<span class="title-b">K</span></h1>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .title-a {
    color: $secondary;
    margin: 0;
    padding: 0;
    font-style: italic;
    letter-spacing: -17px;
  }

  .title-b {
    color: $accent;
  }

  .logo {
    font-size: 200px;
    margin: 100px;
  }
</style>
