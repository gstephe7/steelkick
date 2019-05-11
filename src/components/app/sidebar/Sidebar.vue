<template>
  <aside id="sidebar" :class="{ show : showMenu }">

    <div class="logo" align>
      <Logo></Logo>
    </div>

    <hr>

    <Nav @closeMenu="$emit('closeMenu')"></Nav>

  </aside>
</template>

<script>
import Logo from '@/components/logo/Logo'
import Nav from '@/components/app/nav/Nav'

export default {
  props: ['showMenu'],
  components: {
    Logo,
    Nav
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  aside {
    z-index: 3;
    background: #fff;
    width: 250px;
    position: fixed;
    height: 100%;
    padding: 0;
    left: 0;
    box-shadow: 0px 2px 4px rgba(0,0,0,.5);
    @media screen and (max-width: 999px) {
      left: -250px;
      position: fixed;
      height: 100vh;
      transition: 250ms all;
    }
  }

  .show {
    left: 0;
  }

  .logo {
    height: 72px;
    padding-left: 20px;
  }

  hr {
    margin: 0 auto;
    width: 90%;
  }

</style>
