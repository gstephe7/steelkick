<template>
  <button id="fab"
          :class="{ hide : toggleHide,
                    extended : extended,
                    center : center }"
          @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    extended: Boolean,
    center: Boolean
  },
  data () {
    return {
      toggleHide: false
    }
  },
  mounted () {
    let prevScroll = window.pageYOffset

    window.onscroll = () => {
      setInterval(() => {
        let currentScroll = window.pageYOffset
        if (currentScroll > 250) {
          if (currentScroll < prevScroll - 50) {
            this.toggleHide = false
          } else if (currentScroll > prevScroll + 25) {
            this.toggleHide = true
          }
        } else {
          this.toggleHide = false
        }
        prevScroll = currentScroll
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  button {
    position: absolute;
    right: 16px;
    bottom: 16px;
    height: 56px;
    width: 56px;
    padding: 0;
    opacity: 1;
    font-size: 28px;
    background-color: $success;
    border: none;
    border-radius: 50%;
    color: #fff;
    box-shadow: 0 6px 8px rgba(0,0,0,.2);
    cursor: pointer;
    transition: 250ms all;
    font-family: 'Roboto', sans-serif;
    text-align: center;
    outline: none;
    transform: scale(1);
    z-index: 1;
  }

  button.extended {
    right: 0;
    left: 0;
    margin: 0 auto;
    height: 48px;
    width: 140px;
    padding: 0 16px;
    border-radius: 32px;
    font-size: 16px;
  }

  button.center {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 16px;
    margin: 0 auto;
  }

  button:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }

  button.hide {
    visibility: hidden;
    transform: scale(0);
    opacity: 0;
  }
</style>
