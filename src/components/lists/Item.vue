<template>
  <div class="item">

    <!-- Aside -->
    <div class="img">
      <slot name="img"></slot>
    </div>

    <!-- Main -->
    <div class="content">
      <!-- First line of item -->
      <div class="row header">
        <slot name="first"></slot>
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
    <div class="index">
      <slot name="index"></slot>
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

  .img {
    @include center;
    @include align;
    margin-right: 15px;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    background-color: $accent;
    overflow: hidden;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    @include grow;
    margin-right: 10px;
  }

  .row {
    @include between;
  }

  .header {
    @media screen and (max-width: 999px) {
      font-size: 16px;
    }
    @media screen and (min-width: 1000px) {
      font-size: 24px;
    }
  }

  .index {
    @include last;
    width: 25px;
    color: rgba(0,0,0,.5);
  }
</style>
