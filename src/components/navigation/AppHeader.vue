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
            <Logo v-if="!$route.meta.parent" class="mobile small-logo" :small="true">
            </Logo>
            <Logo class="desktop logo">
            </Logo>
          </router-link>
        </div>
      </div>

      <!-- Breadcrumbs -->
      <div class="breadcrumbs align">
        <!-- <span v-if="$route.meta.parent">
          <span @click="navBack"
                class="breadcrumb click">
            {{ $route.meta.parent.name }}
          </span>
          <icon v-if="$route.meta.parent"
                icon="angle-right"
                class="breadcrumb">
          </icon>
        </span> -->
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
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  header {
    @include align;
    @include wrap;
    background-color: $theme;
    color: $accent;
    box-shadow: $box-shadow-dark;
    z-index: 10;
    position: fixed;
    width: 100%;
    max-width: 100%;
    height: 56px;
    top: 0px;
    transition: 350ms all ease;
    button {
      background-color: rgba(0,0,0,0);
      outline: none;
      border: none;
      box-shadow: none;
      padding: 0;
      margin: 0;
      height: 56px;
      width: 56px;
      cursor: pointer;
      font-size: 20px;
      color: $accent;
      @include align;
      @include center;
    }
  }

  .logo {
    padding: 0px 16px;
  }

  .small-logo {
    padding: 0 8px;
  }

  .left {
    @include align;
    @media screen and (min-width: 1000px) {
      width: 240px;
    }
  }

  .breadcrumbs {
    padding-left: 16px;
  }

  .breadcrumb {
    padding-right: 8px;
    font-size: 20px;
    color: $accent;
  }

  a {
    text-decoration: none;
  }
</style>
