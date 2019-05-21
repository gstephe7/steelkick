<template>
  <div class="item">

    <!-- Aside -->
    <div v-if="$slots.thumbnail" class="thumbnail">
      <slot name="thumbnail"></slot>
    </div>

    <!-- Main -->
    <div class="content">
      <!-- First line of item -->
      <div class="row item-title">
        <slot name="title"></slot>
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
    <div v-if="$slots.metadata" class="metadata">
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
    line-height: 1.5;
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
    }
  }

  .content {
    @include grow;
    margin-right: 15px;
  }

  .row {
    @include between;
    font-size: 16px;
    color: $grey;
  }

  .item-title {
    color: $primary;
    font-weight: bold;
    @media screen and (max-width: 999px) {
      font-size: 18px;
    }
    @media screen and (min-width: 1000px) {
      font-size: 20px;
    }
  }

  .metadata {
    @include last;
    text-align: right;
    width: 35px;
    color: $grey;
    font-size: 16px;
  }
</style>
