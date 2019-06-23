<template>
  <transition appear name="slide">
    <div class="snackbar" @click="$store.dispatch('hideSnackbar')">
      <span v-if="$store.getters.snackbarError">
        <icon icon="times-circle" class="icon-error">
        </icon>
      </span>
      <span v-else>
        <icon icon="check-circle" class="icon">
        </icon>
      </span>
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
    z-index: 21;
  }

  .slide-enter, .slide-leave-to {
    bottom: -100px;
  }

  svg.icon {
    font-size: 16px;
    margin-right: 15px;
    color: $success;
  }

  svg.icon-error {
    font-size: 16px;
    margin-right: 15px;
    color: $alert;
  }
</style>
