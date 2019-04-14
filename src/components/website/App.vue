<template>
  <div>

    <Header></Header>

    <router-view></router-view>

    <Footer></Footer>

  </div>
</template>

<script>
import Header from '@/components/website/header/Header'
import Footer from '@/components/website/footer/Footer'

export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      company: ''
    }
  },
  created () {
    this.company = this.$store.getters.companyName
  }
}
</script>

<style lang="scss" scoped>
</style>
