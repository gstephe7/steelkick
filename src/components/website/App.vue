<template>
  <div>

    <SiteHeader></SiteHeader>

    <router-view></router-view>

    <Footer></Footer>

  </div>
</template>

<script>
import SiteHeader from '@/components/navigation/SiteHeader'
import Footer from '@/components/website/footer/Footer'

export default {
  components: {
    SiteHeader,
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
