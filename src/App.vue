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
  },
  beforeCreate () {
    const token = this.$cookies.get('token')
    if (token) {
      this.$store.dispatch('login', {
        user: token.user,
        token: token.token
      })
    } else {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
</style>
