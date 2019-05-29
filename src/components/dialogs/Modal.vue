<template>
  <div class="overlay" @click="$emit('close')">
    <transition appear name="slide">
      <div class="modal" @click.stop>

        <div class="header">
          <slot name="title"></slot>
          <button class="text" @click="$emit('close')">
            <icon class="close" icon="times"></icon>
          </button>
        </div>

        <div class="content">
          <slot name="content"></slot>
        </div>

        <div class="footer">
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
    right: 0;
    bottom: 0;
    @include col;
    @include center;
    background-color: rgba(0,0,0,.75);
    z-index: 99;
  }

  .modal {
    width: 95%;
    min-width: 280px;
    max-width: 500px;
    border-radius: 5px;
    box-shadow: $box-shadow-dark;
    overflow-y: hidden;
    transform: translateY(0);
    opacity: 1;
    transition: 250ms all;
  }

  .slide-enter, .slide-leave-to {
    opacity: 0;
    transform: translateY(500px);
  }

  .header {
    @include between;
    @include align;
    background-color: $blue;
    color: #fff;
    padding: 10px;
    border-radius: 5px 5px 0 0;
  }

  .close {
    font-size: 20px;
    color: #fff;
    cursor: pointer;
    transition: 250ms all;
  }

  .close:hover {
    transform: scale(1.05);
  }

  .content {
    background-color: #fff;
    padding: 10px;
    min-height: 50px;
    max-height: 400px;
    overflow-y: auto;
  }

  .footer {
    background-color: #fff;
    padding: 10px;
    border-radius: 0 0 5px 5px;
  }
</style>
