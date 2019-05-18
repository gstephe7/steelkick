<template>
  <div>

    <header id="header">

      <div class="left">
        <!-- show if mobile screen -->
        <div class="mobile">
          <button @click="showMenu = !showMenu">
            <icon v-if="showMenu" icon="times"></icon>
            <icon v-else icon="bars"></icon>
          </button>
        </div>

        <div @click="showMenu = false">
          <router-link :to="{ name: 'Home' }">
            <Logo class="mobile" :small="true"></Logo>
            <Logo class="desktop logo"></Logo>
          </router-link>
        </div>
      </div>

      <div>
        <span class="header-title">{{ $route.name }}</span>
      </div>

    </header>

    <AppDrawer class="mobile"
               :showMenu="showMenu"
               @closeMenu="showMenu = false">
    </AppDrawer>

  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'
import AppDrawer from './AppDrawer'

export default {
  components: {
    Logo,
    AppDrawer
  },
  data () {
    return {
      showMenu: false
    }
  },
  mounted () {
    const header = document.getElementById('header')
    let prevScroll = window.pageYOffset

    window.onscroll = () => {
      let currentScroll = window.pageYOffset
      if (prevScroll > currentScroll) {
        header.style.top = '0'
      } else {
        header.style.top = '-80px'
      }
      prevScroll = currentScroll
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  header {
    @include align;
    height: 72px;
    background-color: $primary;
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
      height: 72px;
      width: 72px;
      margin: 0;
      cursor: pointer;
      font-size: 20px;
    }
  }

  .logo {
    padding: 20px;
  }

  .left {
    @include align;
    @media screen and (max-width: 999px) {
      width: 150px;
    }
    @media screen and (min-width: 1000px) {
      width: 280px;
    }
  }

  a {
    text-decoration: none;
  }
</style>
