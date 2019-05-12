<template>
  <div>

    <header between align id="header">
      <div @click="closeMobileMenu">
        <router-link :to="{ name: 'Home' }">
          <Logo class="logo"></Logo>
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
import Nav from '@/components/website/nav/Nav'

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
    padding-top: 80px;
  }

  a {
    text-decoration: none;
  }

  .logo {
    padding: 15px;
  }
</style>
