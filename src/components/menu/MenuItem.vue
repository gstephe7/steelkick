<template>
  <div class="menu-item" @click="$emit('click')">
    <slot></slot>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .menu-item {
    padding: 16px;
    border-radius: 4px;
    transition: 250ms all;
  }

  .menu-item:hover {
    cursor: pointer;
    background-color: $light;
  }
</style>
