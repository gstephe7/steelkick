<template>
  <div class="item">

    <!-- Aside -->
    <div class="thumbnail">
      <slot name="thumbnail"></slot>
    </div>

    <!-- Main -->
    <div class="content">
      <!-- First line of item -->
      <div class="row header">
        <slot name="header"></slot>
      </div>

      <!-- Second line of item -->
      <div class="row">
        <slot name="second"></slot>
      </div>

      <!-- Third line of item -->
      <div class="row">
        <slot name="third"></slot>
      </div>
    </div>

    <!-- Index -->
    <div class="metadata">
      <slot name="metadata"></slot>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .item {
    border-bottom: 0.5px solid rgba(0,0,0,.2);
    padding: 15px 10px;
    @include between
  }

  .thumbnail {
    @include center;
    @include align;
    margin-right: 15px;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    background-color: $accent;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    @include grow;
    margin-right: 15px;
  }

  .row {
    @include between;
    font-size: 14px;
    color: $grey;
  }

  .header {
    color: $primary;
    margin-bottom: 5px;
    @media screen and (max-width: 999px) {
      font-size: 16px;
    }
    @media screen and (min-width: 1000px) {
      font-size: 20px;
    }
  }

  .metadata {
    @include last;
    width: 25px;
    color: $grey;
    font-size: 14px;
  }
</style>
