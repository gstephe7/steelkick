<template>
  <div class="list">

    <div class="list-title">
      <slot name="title"></slot>
    </div>

    <div class="actions">
      <slot name="actions"></slot>
    </div>

    <hr>

    <div class="content">
      <slot name="content"></slot>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .list {
    position: relative;
    max-width: 600px;
    margin: auto;
    hr {
      margin: 10px 0 0 0;
    }
  }

  .actions {
    @include around;
    @include wrap;
  }

  .list-title {
    margin-bottom: 10px;
  }
</style>
