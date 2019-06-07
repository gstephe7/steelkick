<template>
  <transition appear name="expand">
    <div class="overlay">

      <div id="screen">

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

    </div>
  </transition>
</template>

<script>
export default {
  mounted () {
    document.body.style.overflowY = 'hidden'
  },
  destroyed () {
    document.body.style.overflowY = 'auto'
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow-y: hidden;
    background-color: #fff;
    z-index: 19;
    transform: translateY(0);
    opacity: 1;
    transition: 250ms all ease;
  }

  #screen {
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
      font-size: 18px;
      padding-left: 16px;
    }

    .screen-actions {
      @include grow;
      @include last;
    }
  }

  .screen-content {
    padding: 16px 0 160px;
    z-index: 20;
  }

  .expand-enter, .expand-leave-to {
    transform: translateY(300vh);
    opacity: 0;
    transition: 250ms all ease;
  }
</style>
