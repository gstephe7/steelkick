<template>
  <header row align id="header">

    <div row align class="left">
      <!-- show if mobile screen -->
      <div mobile>
        <button @click="$emit('toggleMenu')">
          <icon v-if="showMenu" icon="times"></icon>
          <icon v-else icon="bars"></icon>
        </button>
      </div>

      <div @click="$emit('closeMenu')">
        <router-link :to="{ name: 'Home' }">
          <Logo mobile :small="true"></Logo>
          <Logo desktop class="logo"></Logo>
        </router-link>
      </div>
    </div>

    <div row align grow>
      <span title>{{ $route.name }}</span>
    </div>

  </header>
</template>

<script>
import Logo from '@/components/logo/Logo'

export default {
  props: ['showMenu'],
  components: {
    Logo
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

  .logo {
    padding: 20px;
  }

  .left {
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
