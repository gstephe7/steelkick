<template>
  <div :class="{ backdrop : showMenu }" @click="$emit('closeMenu')">
    <aside :class="{ show : showMenu }" @click.stop>

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
    width: 240px;
    position: fixed;
    height: 100%;
    padding: 72px 0 0 0;
    left: 0;
    box-shadow: $box-shadow-light;
    @media screen and (max-width: 999px) {
      left: -240px;
      height: 100vh;
      transition: 250ms all;
    }
  }

  .show {
    left: 0;
  }

</style>
