<template>
  <div>
    <div id="admin-nav"  @click="toggleAdminMenu">

      <div class="mobile">
        <button class="menu-button">
          <fa-icon v-if="showMenu" icon="times"></fa-icon>
          <fa-icon v-else icon="bars"></fa-icon>
        </button>
        <p>Admin Navigation</p>
      </div>

    </div>

    <AdminMenu class="hide" :class="{ show: showMenu }" @closeMenu="closeMenu"></AdminMenu>

  </div>
</template>

<script>
import AdminMenu from '@/components/admin/nav/AdminMenu'

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

  #admin-nav {
    height: 35px;
    width: 100%;
    background-color: $accent;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: $box-shadow;
    cursor: pointer;
  }

  .mobile {
    display: flex;
    align-items: center;
  }

  .menu-button {
    background-color: rgba(0,0,0,0);
    outline: none;
    border: none;
    color: $primary;
    font-size: 18px;
    width: 25px;
    cursor: pointer;
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
