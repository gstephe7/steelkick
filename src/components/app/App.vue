<template>
  <div>

    <Header id="mobile"></Header>

    <div between>

      <Sidebar id="desktop"></Sidebar>

      <router-view basis grow></router-view>

    </div>

    <Footer></Footer>

  </div>
</template>

<script>
import Header from '@/components/app/header/Header'
import Sidebar from '@/components/app/sidebar/Sidebar'
import Footer from '@/components/website/footer/Footer'

export default {
  components: {
    Header,
    Sidebar,
    Footer
  },
  created () {
    const currentJob = localStorage.getItem('currentJob')
    const currentRole = localStorage.getItem('currentRole')

    if (currentJob) {
      this.$store.dispatch('updateCurrentJob', JSON.parse(currentJob))
    }

    if (currentRole) {
      this.$store.dispatch('updateCurrentRole', JSON.parse(currentRole))
    }
  }
}
</script>

<style lang="scss" scoped>

  #mobile {
    @media screen and (max-width: 999px) {
      display: block;
    }
    @media screen and (min-width: 1000px) {
      display: none;
    }
  }

  #desktop {
    @media screen and (max-width: 999px) {
      display: none;
    }
    @media screen and (min-width: 1000px) {
      display: block;
      margin-right: 5px;
      min-width: 190px;
      max-width: 190px;
    }
  }
</style>
