<template>
  <div>
    <div id="dashboard-nav"  @click="toggleDashboardMenu">

      <div class="mobile">
        <button class="menu-button">
          <fa-icon v-if="showMenu" icon="times"></fa-icon>
          <fa-icon v-else icon="bars"></fa-icon>
        </button>
        <p>Dashboard Navigation</p>
      </div>

    </div>

    <DashboardMenu class="hide" :class="{ show: showMenu }" @closeMenu="closeMenu"></DashboardMenu>

  </div>
</template>

<script>
import DashboardMenu from '@/components/dashboard/nav/DashboardMenu'

export default {
  components: {
    DashboardMenu
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleDashboardMenu () {
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

  #dashboard-nav {
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
    box-shadow: none;
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
    height: 275px;
    visibility: visible;
    opacity: 1;
  }
</style>
