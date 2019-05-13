<template>
  <div fixed bottom right class="save hide" :class="{ show : changed }">
    <div last align class="dialog">
      <span margin>Save your changes when you are done</span>
      <button green small @click="$emit('submit')">Save</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['changed']
}
</script>

<style lang="scss" scoped>
  .save {
    z-index: 5;
    width: 100%;
    background-color: #fff;
    box-shadow: 0 -4px 8px rgba(0,0,0,.2);
    transition: 250ms all;
  }

  .dialog {
    width: 90%;
    height: 64px;
    min-width: 280px;
    max-width: 1000px;
    margin: auto;
  }

  .hide {
    bottom: -80px;
  }

  .show {
    bottom: 0;
  }
</style>
