<template>
  <div class="menu-container" @click.stop>
    <Button text
            @click="showMenu = !showMenu"
            class="menu-button"
            :class="{ horizontal : horizontal }">
      <span v-if="horizontal">
        <icon icon="ellipsis-h"></icon>
      </span>
      <span v-else>
        <icon icon="ellipsis-v"></icon>
      </span>
    </Button>

    <transition appear name="expand">
      <div v-if="showMenu" class="menu" @click="showMenu = false">

        <slot></slot>

      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: {
    horizontal: Boolean
  },
  data () {
    return {
      showMenu: false
    }
  },
  mounted () {
    document.addEventListener('click', () => {
      if (this.showMenu === true) {
        this.showMenu = false
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .menu-container {
    position: relative;
  }

  .menu-button {
    font-size: 18px;
    margin: 0;
    padding: 0;
    width: 40px;
    color: $accent;
  }

  .horizontal {
    color: $dark;
    height: 32px;
    width: 32px;
  }

  .menu {
    width: 176px;
    height: auto;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top: 44px;
    right: 16px;
    box-shadow: 0px 4px 8px 0px rgba(0,0,0,.2);
    transition: 250ms all;
    transform: scale(1);
    transform-origin: top right;
    z-index: 10;
  }

  .expand-enter, .expand-leave-to {
    transform: scale(0);
    transform-origin: top right;
    opacity: 0;
    transition: 250ms all;
  }
</style>
