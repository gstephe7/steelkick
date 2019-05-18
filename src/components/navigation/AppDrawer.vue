<template>
  <div :class="{ backdrop : showMenu }" @click="$emit('closeMenu')">
    <aside :class="{ show : showMenu }" @click.stop>

      <div class="logo" align>
        <Logo></Logo>
      </div>

      <hr>

      <AppNav @closeMenu="$emit('closeMenu')"></AppNav>

    </aside>
  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'
import AppNav from './AppNav'

export default {
  props: ['showMenu'],
  components: {
    Logo,
    AppNav
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.75);
    z-index: 4;
  }

  aside {
    z-index: 5;
    background: #fff;
    width: 250px;
    position: fixed;
    height: 100%;
    padding: 0;
    left: 0;
    box-shadow: $box-shadow-light;
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
