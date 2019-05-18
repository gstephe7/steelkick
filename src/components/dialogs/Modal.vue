<template>
  <div class="overlay" @click="$emit('close')">
    <div class="modal" @click.stop>

      <div class="header">
        <slot name="title"></slot>
        <icon class="close"
              icon="times"
              @click="$emit('close')">
        </icon>
      </div>

      <div class="content">
        <slot name="content"></slot>
      </div>

      <div class="footer">
        <slot name="actions"></slot>
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

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include col;
    @include center;
    background-color: rgba(0,0,0,.75);
    z-index: 99;
  }

  .modal {
    width: 90%;
    min-width: 280px;
    max-width: 500px;
    border-radius: 5px;
    box-shadow: $box-shadow-dark;
    overflow-y: hidden;
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
