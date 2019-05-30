
<template>
  <div class="item" @click="expand = true">

    <!-- Item Preview -->
    <div class="between">

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
        <div class="row third">
          <slot name="third"></slot>
        </div>
      </div>

      <!-- Index -->
      <div v-if="$slots.metadata" class="metadata">
        <slot name="metadata"></slot>
      </div>

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
    padding: 16px 0;
  }

  .thumbnail {
    @include center;
    @include align;
    margin-right: 16px;
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
  }

  .row {
    @include between;
    font-size: 16px;
    color: $grey;
  }

  .item-title {
    color: $primary;
    font-weight: bold;
    font-size: 20px;
    margin-bottom: 4px;
  }

  .metadata {
    @include last;
    text-align: right;
    width: 32px;
    color: $grey;
    font-size: 14px;
    margin-left: 16px;
  }
</style>
