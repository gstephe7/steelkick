<template>
  <div>
    <h1 v-if="footer" class="footer">STEELKICK</h1>
    <h1 v-else class="title-a">STEEL<span class="title-b">KICK</span></h1>
  </div>
</template>

<script>
export default {
  props: ['footer']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .title-a {
    color: $secondary;
    margin: 0;
    padding: 0;
    font-style: italic;
    letter-spacing: -3px;
  }

  .title-b {
    color: $accent;
  }

  .footer {
    color: $accent;
    opacity: .5;
    margin: 0;
    padding: 0;
    font-style: italic;
    letter-spacing: -3px;
  }
</style>
