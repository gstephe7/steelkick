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

      <!-- Breadcrumbs -->
      <div class="breadcrumbs align">
        <span v-if="$route.meta.parent">
          <span @click="navBack"
                class="breadcrumb click">
            {{ $route.meta.parent.name }}
          </span>
          <icon v-if="$route.meta.parent"
                icon="angle-right"
                class="breadcrumb">
          </icon>
        </span>
        <span class="breadcrumb">
          {{ $route.name }}
        </span>
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
  methods: {
    navBack () {
      this.$router.push(this.$route.meta.parent.path)
      this.showMenu = false
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
        header.style.top = '-150px'
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
    @include wrap;
    background-color: $primary;
    color: $accent;
    box-shadow: $box-shadow-dark;
    z-index: 10;
    position: fixed;
    width: 100%;
    max-width: 100%;
    top: 0px;
    transition: 350ms all ease;
    button {
      background-color: rgba(0,0,0,0);
      outline: none;
      border: none;
      box-shadow: none;
      padding: 0;
      height: 50px;
      width: 50px;
      margin: 10px;
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
      width: 250px;
    }
  }

  .breadcrumbs {
    margin-left: 25px;
    height: 35px;
    @media screen and (max-width: 999px) {
      @include start
      @include basis
    }
  }

  .breadcrumb {
    margin-right: 10px;
    font-size: 16px;
    color: $accent;
    @media screen and (min-width: 1000px) {
      font-size: 18px;
    }
  }

  a {
    text-decoration: none;
  }
</style>
