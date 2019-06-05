<template>
  <transition appear name="slide">
    <div class="snackbar">
      <icon icon="check-circle" class="icon"></icon>
      <span>{{ $store.getters.snackbarMessage }}</span>
    </div>
  </transition>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .snackbar {
    position: fixed;
    bottom: 25px;
    left: 0;
    right: 0;
    margin: auto;
    width: 250px;
    border-radius: 5px;
    background-color: #212121;
    padding: 15px;
    color: #fff;
    text-align: center;
    @include align;
    @include center;
    transition: 500ms all;
    z-index: 5;
  }

  .slide-enter, .slide-leave-to {
    bottom: -100px;
  }

  svg.icon {
    font-size: 16px;
    margin-right: 15px;
    color: $success;
  }
</style>
