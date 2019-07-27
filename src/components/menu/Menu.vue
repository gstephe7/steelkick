<template>
  <span class="menu-container">
    <Button text
            @click="showMenu = !showMenu"
            :class="{ horizontal : horizontal }">
      <span v-if="horizontal">
        <icon icon="ellipsis-h" class="menu-button horizontal"></icon>
      </span>
      <span v-else>
        <icon icon="ellipsis-v" class="menu-button"></icon>
      </span>
    </Button>

    <transition appear name="expand">
      <div v-if="showMenu" class="menu">

        <div v-for="item in options"
             class="menu-item"
             @click="$emit('select', item.action)">
          {{ item.name }}
        </div>

      </div>
    </transition>
  </span>
</template>

<script>
export default {
  props: {
    options: Array,
    horizontal: Boolean
  },
  data () {
    return {
      showMenu: false
    }
  },
  mounted () {
    // document.addEventListener('click', () => {
    //   if (this.showMenu === true) {
    //     this.showMenu = false
    //   }
    // })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .menu-container {
    position: relative;
  }

  .menu-button {
    font-size: 16px;
    color: $accent;
    width: 16px;
  }

  .horizontal {
    color: $dark;
    width: auto;
    margin: 0;
    font-size: 18px;
  }

  .menu {
    width: 176px;
    background-color: #fff;
    border-radius: 4px;
    position: absolute;
    top: -8px;
    right: -8px;
    box-shadow: 0px 6px 4px 2px rgba(0,0,0,.2);
    transition: 250ms all;
    z-index: 10;
  }

  .menu-item {
    padding: 16px;
    border-radius: 4px;
    transition: 250ms all;
  }

  .menu-item:hover {
    cursor: pointer;
    background-color: $light;
  }

  .expand-enter, .expand-leave-to {
    width: 0;
    top: -20px;
    opacity: 0;
    transition: 250ms all;
  }
</style>
