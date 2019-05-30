<template>
  <transition appear name="expand">
    <div id="screen" class="overlay">

      <div class="screen-header">
        <button class="text" @click="$emit('close')">
          <icon icon="arrow-left"></icon>
        </button>
        <div class="screen-title">
          <slot name="title"></slot>
        </div>
        <div class="screen-actions">
          <slot name="actions"></slot>
        </div>
      </div>

      <div class="screen-content">
        <slot name="content"></slot>
      </div>

    </div>
  </transition>
</template>

<script>
export default {
  mounted () {
    document.body.style.overflow = 'hidden'
  },
  destroyed () {
    document.body.style.overflow = 'auto'
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-color: #fff;
    z-index: 999;
    transform: scaleY(1);
    transition: 250ms all ease;
  }

  .overlay:hover {
    transform: none;
    cursor: default;
  }

  .screen-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 56px;
    @include align;
    box-shadow: $box-shadow-dark;

    button.text {
      color: $primary;
      font-size: 20px;
      height: 56px;
      width: 56px;
      margin: 0;
    }

    button.text:hover {
      background-color: #fff;
    }

    .screen-title {
      font-weight: bold;
      padding-left: 16px;
    }

    .screen-actions {
      @include grow;
      @include last;
    }
  }

  .screen-content {
    overflow-y: auto;
  }

  .expand-enter, .expand-leave-to {
    transform: scaleY(0);
  }
</style>
