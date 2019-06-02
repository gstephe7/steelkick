<template>
  <div>
    <nav row @click="toggleAdminMenu">

      <div row align>
        <button class="menu-button">
          <icon v-if="showMenu" icon="times"></icon>
          <icon v-else icon="bars"></icon>
        </button>
        <span>Admin Navigation</span>
      </div>

    </nav>

    <AdminMenu class="hide" :class="{ show: showMenu }" @closeMenu="closeMenu"></AdminMenu>

  </div>
</template>

<script>
import AdminMenu from './AdminMenu'

export default {
  components: {
    AdminMenu
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleAdminMenu () {
      this.showMenu = !this.showMenu
    },
    closeMenu () {
      this.showMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  nav {
    background-color: $accent;
    box-shadow: $box-shadow;
    cursor: pointer;
  }

  .menu-button {
    background-color: rgba(0,0,0,0);
    outline: none;
    border: none;
    box-shadow: none;
    color: $primary;
    font-size: 18px;
    width: 25px;
    cursor: pointer;
  }

  svg {
    color: $primary;
  }

  .hide {
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: 250ms all;
  }

  .show {
    height: 40px;
    visibility: visible;
    opacity: 1;
  }
</style>
