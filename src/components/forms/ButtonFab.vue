<template>
  <button id="fab"
          :class="{ hide : toggleHide, extended : extended }"
          @click="$emit('click')">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    extended: Boolean
  },
  data () {
    return {
      toggleHide: false
    }
  },
  mounted () {
    const fab = document.getElementById('fab')
    let prevScroll = window.pageYOffset

    window.onscroll = () => {
      setInterval(() => {
        let currentScroll = window.pageYOffset
        if (window.scrollY > 250) {
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
    height: 56px;
    width: 56px;
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
    outline: none;
    transform: scale(1);
    z-index: 1;
  }

  button.extended {
    position: fixed;
    bottom: 16px;
    height: 48px;
    width: 140px;
    left: 0;
    right: 0;
    margin: 0 auto;
    padding: 0 16px;
    border-radius: 32px;
    font-size: 16px;
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
