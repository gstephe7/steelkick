<template>
  <div>
    <span v-if="small">
      <h1 class="title-a small">
        STEEL<span class="title-b">KICK</span>
      </h1>
    </span>
    <span v-else>
      <h1 class="title-a">
        STEEL<span class="title-b">KICK</span>
      </h1>
    </span>
  </div>
</template>

<script>
export default {
  props: ['small']
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
    font-weight: 700;
    font-size: 36px;
  }

  .title-b {
    color: $accent;
  }

  .small {
    font-size: 30px;
  }
</style>
