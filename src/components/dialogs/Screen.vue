<template>
  <transition appear name="expand">
    <div id="screen" class="overlay">

      <div class="screen-header">
        <button class="text" @click="$emit('close')">
          <icon icon="times"></icon>
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
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .overlay {
    position: fixed;
    overflow-y: auto;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100%;
    background-color: #fff;
    z-index: 19;
    transform: translateY(0);
    opacity: 1;
    transition: 250ms all ease;
  }

  .screen-header {
    position: sticky;
    top: 0;
    left: 0;
    right: 0;
    z-index: 20;
    height: 56px;
    background-color: #fff;
    @include align;
    box-shadow: $box-shadow-light;

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
      padding-right: 16px;
    }
  }

  .screen-content {
    padding: 24px 0;
  }

  .expand-enter, .expand-leave-to {
    transform: translateY(300vh);
    opacity: 0;
    transition: 250ms all ease;
  }
</style>
