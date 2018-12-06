<template>
  <div>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'

export default {
  components: {
    Nav,
    Footer
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
</style>
