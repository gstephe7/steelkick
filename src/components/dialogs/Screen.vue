<template>
  <transition appear name="expand">
    <div id="screen" class="overlay">

      <div class="screen-header">
        <Button text @click="$emit('close')">
          <icon class="icon" icon="times"></icon>
        </Button>
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
    z-index: 20;
    height: 56px;
    background-color: #fff;
    @include align;
    box-shadow: $box-shadow-light;

    .icon {
      color: $dark;
      font-size: 20px;
    }

    .screen-title {
      font-weight: bold;
      padding-left: 16px;
    }

    .screen-actions {
      @include grow;
      @include last;
      @media screen and (min-width: 1000px) {
        padding-right: 16px;
      }
    }
  }

  .screen-content {
    padding: 16px 0;
    z-index: 20;
  }

  .expand-enter, .expand-leave-to {
    transform: translateY(300vh);
    opacity: 0;
    transition: 250ms all ease;
  }
</style>
