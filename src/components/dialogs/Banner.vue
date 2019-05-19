<template>
  <transition appear name="slide">
    <div class="banner">
      <div class="content">
        <div class="message">
          <span>Save your changes</span>
        </div>
        <div>
          <button class="green small" @click="$emit('save')">
            Save
          </button>
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

  .banner {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    box-shadow: 0 -4px 8px rgba(0,0,0,.2);
    transition: 500ms all;
    background-color: #fff;
    z-index: 1;
    @media screen and (min-width: 1000px) {
      left: 250px;
    }
  }

  .content {
    @include align;
    @include between;
    max-width: 600px;
    padding: 10px;
    margin: auto;
  }

  .message {
    padding: 10px;
  }

  .slide-enter, .slide-leave-to {
    bottom: -100px;
  }
</style>
