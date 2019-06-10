<template>
  <span class="chip">
    <slot></slot>
  </span>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .chip {
    @include align;
    position: relative;
    height: 30px;
    margin: 8px 8px 0 0;
    padding: 0 8px;
    border-radius: 16px;
    border: 1px solid $accent;
    overflow: hidden;
    font-size: 12px;
  }
</style>
