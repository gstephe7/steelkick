<template>
  <div>
    <div id="nav">

      <div @click="closeMobileMenu">
        <router-link :to="{ name: 'Home' }">
          <Logo class="logo"></Logo>
        </router-link>
      </div>

      <div>

        <!-- show if mobile screen -->
        <div class="mobile">
          <button class="menu-button" @click="toggleMobileMenu">
            <fa-icon v-if="showMenu" icon="times"></fa-icon>
            <fa-icon v-else icon="bars"></fa-icon>
          </button>
        </div>

        <!-- show if desktop screen -->
        <div class="desktop">
          <ul>
            <li>
              <router-link :to="{ name: 'Search' }">Buy Steel</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'AddMaterial' }">Sell Steel</router-link>
            </li>
            <li>
              <Notify class="notify"></Notify>
              <router-link :to="{ name: 'DashboardHome' }">Dashboard</router-link>
            </li>
            <li>
              <router-link :to="{ name: 'Contact' }">Contact</router-link>
            </li>
            <li>
              <router-link v-if="$store.getters.loggedIn" :to="{ name: 'Logout' }">
                <span @click="$store.dispatch('logout')">Logout</span>
              </router-link>
              <router-link v-else :to="{ name: 'Register' }">
                Create Account
              </router-link>
            </li>
          </ul>
        </div>

      </div>
    </div>
    <MobileMenu class="hide mobile" :class="{ show: showMenu }" @closeMenu="toggleMobileMenu"></MobileMenu>
  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'
import MobileMenu from '@/components/nav/MobileMenu'
import Notify from '@/components/notifications/Notify'

export default {
  components: {
    Logo,
    MobileMenu,
    Notify
  },
  data () {
    return {
      showMenu: false
    }
  },
  methods: {
    toggleMobileMenu () {
      this.showMenu = !this.showMenu
    },
    closeMobileMenu () {
      this.showMenu = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #nav {
    height: 50px;
    width: 100%;
    background-color: $primary;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    margin-left: 10px;
  }

  .mobile {
    @media screen and (max-width: 724px) {
      display: block;
    }
    @media screen and (min-width: 725px) {
      display: none;
    }
  }

  .desktop {
    @media screen and (max-width: 724px) {
      display: none;
    }
    @media screen and (min-width: 725px) {
      display: block;
    }
  }

  .menu-button {
    background-color: rgba(0,0,0,0);
    outline: none;
    border: none;
    color: $accent;
    font-size: 24px;
    width: 40px;
    margin-right: 10px;
    cursor: pointer;
  }

  .hide {
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: 250ms all;
  }

  .show {
    height: 200px;
    visibility: visible;
    opacity: 1;
  }

  ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: inline;
    margin-right: 25px;
  }

  a {
    color: $accent;
    text-decoration: none;
    font-size: 18px;
    transition: 250ms all;
  }

  a:hover {
    color: $secondary;
  }

  .notify {
    position: absolute;
    top: 8px;
    right: 276px;
  }
</style>
