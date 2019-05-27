<template>
  <transition appear name="slide">
    <div class="overlay">
      <div class="main details">

        <div class="details-title">
          <slot name="title"></slot>
          <icon icon="times"
                class="click icon"
                @click="$emit('close')">
          </icon>
        </div>

        <div class="details-content">
          <slot name="content"></slot>
        </div>

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
    z-index: 2;
    opacity: 1;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    background-color: #fff;
    transition: 250ms all;
    @media screen and (min-width: 1000px) {
      left: 250px;
    }
  }

  .slide-enter, .slide-leave-to {
    left: -5000px;
    opacity: 0;
  }

  .details {
    max-width: 600px;
    margin: 0 auto;
  }

  .details-title {
    @include between;
    @include align;
    font-size: 22px;
    font-weight: bold;
    padding: 0 0 15px 0;
    border-bottom: 1px solid rgba(0,0,0,.12);
  }

  .icon {
    color: rgba(0,0,0,.35);
  }
</style>
