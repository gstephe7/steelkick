<template>
  <transition appear name="slide">
    <div class="search-header">

      <Button text @click="$emit('close')">
        <icon icon="arrow-left" class="icon"></icon>
      </Button>

      <input id="search-input"
             class="input"
             type="text"
             placeholder="Search"
             @input="$emit('input', $event.target.value)">

    </div>
  </transition>
</template>

<script>
export default {
  mounted () {
    let input = document.getElementById('search-input')
    input.focus()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .search-header {
    @include align;
    width: 100%;
    height: 56px;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #fff;
    z-index: 14;
    transform: translateX(0);
    transition: 250ms transform;
  }

  .icon {
    font-size: 20px;
    color: $theme;
  }

  input.input {
    @include grow;
    margin: 0 0 0 16px;
    outline: none;
    color: $theme;
    padding-right: 16px;
    height: 32px;
    font-size: 18px;
    border: none;
  }

  input::placeholder {
    color: $dark;
  }

  .input:focus {
    outline: none;
  }

  .slide-enter, .slide-leave-to {
    transform: translateX(250vw);
  }
</style>
