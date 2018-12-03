<template>
  <div>
    <Nav></Nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Nav from '@/components/nav/Nav'

export default {
  components: {
    Nav
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
</style>
