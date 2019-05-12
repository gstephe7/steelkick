<template>
  <div>

    <Header :showMenu="showMenu"
            @toggleMenu="showMenu = !showMenu"
            @closeMenu="showMenu = false">
    </Header>

    <div row>

      <div :class="{ mobileMenu : showMenu }" @click="showMenu = false">
        <Sidebar :showMenu="showMenu" @closeMenu="showMenu = false"></Sidebar>
      </div>

      <div basis grow class="content" @click="showMenu = false">
        <router-view></router-view>
        <Footer></Footer>
      </div>

    </div>

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
  data () {
    return {
      showMenu: false
    }
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
  .content {
    @media screen and (min-width: 1000px) {
      margin-left: 250px;
    }
  }

  .mobileMenu {
    @media screen and (max-width: 999px) {
      position: fixed;
      width: 100%;
      height: 100%;
      z-index: 9;
      background-color: rgba(0,0,0,.5);
    }
  }
</style>
