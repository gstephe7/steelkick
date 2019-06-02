<template>
  <span class="search-bar">
    <icon icon="search"></icon>
    <input id="search-input"
           class="grow"
           :value="value"
           @input="$emit('input', $event.target.value)"
           placeholder="Search"
           autocomplete="off">
  </span>
</template>

<script>
export default {
  props: ['value']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .search-bar {
    width: 264px;
    height: 38px;
    border: 1px solid $accent;
    border-radius: 16px;
    padding: 0px 8px;
    margin: 0 16px 16px;
    @include align;
  }

  input#search-input {
    border: none;
    outline: none;
    margin: 8px;
    font-size: 16px;
    color: $theme;
  }
</style>
