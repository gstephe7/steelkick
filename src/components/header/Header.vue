<template>
  <div>

    <header>
      <div @click="closeMobileMenu">
        <router-link :to="{ name: 'Home' }">
          <Logo></Logo>
        </router-link>
      </div>

      <!-- show if mobile screen -->
      <div class="mobile">
        <button @click="toggleMobileMenu">
          <icon v-if="showMenu" icon="times"></icon>
          <icon v-else icon="bars"></icon>
        </button>
      </div>

      <!-- show if desktop screen -->
      <div class="desktop">
        <Nav :desktop="true"></Nav>
      </div>
    </header>

    <Nav class="hide mobile" :class="{ show: showMenu }" @closeMenu="toggleMobileMenu"></Nav>

  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'
import Nav from '@/components/nav/Nav'
import Notify from '@/components/notifications/Notify'

export default {
  components: {
    Logo,
    Nav
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

  .mobile {
    @media screen and (max-width: 800px) {
      display: block;
    }
    @media screen and (min-width: 801px) {
      display: none;
    }
  }

  .desktop {
    @media screen and (max-width: 800px) {
      display: none;
    }
    @media screen and (min-width: 801px) {
      display: block;
    }
  }

  button {
    background-color: rgba(0,0,0,0);
    outline: none;
    border: none;
    box-shadow: none;
    width: 40px;
    margin: 0;
    cursor: pointer;
    font-size: 24px;
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

  a {
    text-decoration: none;
  }
</style>
