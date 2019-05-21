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
    width: 250px;
    border: 1px solid $accent;
    border-radius: 20px;
    padding: 0px 10px;
    margin: 15px 10px;
    @include align;
  }

  #search-input {
    border: none;
    outline: none;
    margin: 0;
  }
</style>
