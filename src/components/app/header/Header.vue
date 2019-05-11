<template>
  <div>

    <header id="header">

      <div row align>
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

      <div>
        <span class="title">{{ $route.name }}</span>
      </div>

    </header>

  </div>
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

  header {
    position: fixed;
    width: 100%;
    top: 0px;
    transition: 250ms all;
  }

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

  .title {
    font-size: 20px;
    padding: 25px;
    margin: 0;
  }

  .logo {
    padding: 20px;
  }

  a {
    text-decoration: none;
  }
</style>
