<template>
  <div class="overlay" @click="$emit('close')">
    <transition appear name="slide">
      <div class="modal" @click.stop>

        <div class="modal-title">
          <slot name="title"></slot>
        </div>

        <div class="modal-content">
          <slot name="content"></slot>
        </div>

        <div v-if="$slots.actions" class="modal-actions">
          <slot name="actions"></slot>
        </div>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
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
    @include col;
    @include center;
    background-color: rgba(0,0,0,.75);
    z-index: 999;
  }

  .modal {
    width: 80%;
    min-width: 280px;
    max-width: 560px;
    border-radius: 4px;
    box-shadow: 0px 16px 16px 8px rgba(0,0,0,.5);
    overflow-y: hidden;
    background-color: #fff;
    transform: translateY(0);
    opacity: 1;
    transition: 250ms all;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(500px);
  }

  .modal-title {
    @include align;
    height: 56px;
    font-size: 20px;
    font-weight: bold;
    padding: 0 16px;
    box-shadow: 0px 4px 8px -8px rgba(0,0,0,.2);
  }

  .modal-content {
    padding: 0 16px;
    max-height: 280px;
    overflow-y: auto;
  }

  .modal-actions {
    height: 56px;
    box-shadow: 0px -4px 8px -8px rgba(0,0,0,.2);
  }
</style>
