<template>
  <span class="helper">
    &#9432;
    <span>
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .helper {
    color: royalblue;
    span {
      display: none;
    }
  }

  .helper:hover {
    cursor: help;
    position: relative;
    span {
      display: block;
      position: absolute;
      color: $accent;
      font-size: 14px;
      width: 250px;
      background-color: $primary;
      padding: 5px;
      border-radius: 5px;
    }
  }
</style>
