<template>
  <div>

    <header id="header">
      <div @click="closeMobileMenu">
        <router-link :to="{ name: 'Home' }">
          <Logo class="logo"></Logo>
        </router-link>
      </div>

      <!-- show if mobile screen -->
      <div class="mobile">
        <button @click="showMenu = !showMenu">
          <icon v-if="showMenu" icon="times"></icon>
          <icon v-else icon="bars"></icon>
        </button>
      </div>

      <!-- show if desktop screen -->
      <div class="desktop">
        <SiteNav :desktop="true"></SiteNav>
      </div>
    </header>

    <SiteNav class="hide mobile" :class="{ show: showMenu }" @closeMenu="showMenu = false"></SiteNav>

  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'
import SiteNav from '@/components/navigation/SiteNav'

export default {
  components: {
    Logo,
    SiteNav
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

  header {
    @include align;
    @include between;
    height: 56px;
    background-color: $theme;
    color: $accent;
    box-shadow: $box-shadow-dark;
    z-index: 10;
    position: fixed;
    width: 100%;
    max-width: 100%;
    top: 0px;
    transition: 250ms all;
    button {
      background-color: rgba(0,0,0,0);
      outline: none;
      border: none;
      box-shadow: none;
      padding: 0;
      height: 56px;
      width: 56px;
      margin: 0;
      cursor: pointer;
      font-size: 20px;
      color: $accent;
      @include align;
      @include center;
    }
  }

  .hide {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    height: 0;
    opacity: 0;
    visibility: hidden;
    transition: 250ms all;
    z-index: 9;
  }

  .show {
    height: 200px;
    visibility: visible;
    opacity: 1;
    padding-top: 80px;
  }

  a {
    text-decoration: none;
  }

  .logo {
    padding: 15px;
  }
</style>
