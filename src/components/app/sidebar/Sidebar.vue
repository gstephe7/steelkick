<template>
  <aside>

    <div id="logo">
      <router-link :to="{ name: 'Home' }">
        <Logo></Logo>
      </router-link>
    </div>

    <hr>

    <Nav :desktop="true"></Nav>

  </aside>
</template>

<script>
import Logo from '@/components/logo/Logo'
import Nav from '@/components/app/nav/Nav'

export default {
  components: {
    Logo,
    Nav
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #logo {
    display: flex;
    padding: 5px 10px;
  }

  aside {
    background-color: $primary;
    width: 250px;
    padding: 5px;
  }

  a {
    text-decoration: none;
  }

</style>
