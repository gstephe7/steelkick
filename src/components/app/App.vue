<template>
  <div>

    <Header :showMenu="showMenu"
            @toggleMenu="showMenu = !showMenu"
            @closeMenu="showMenu = false">
    </Header>

    <div row>

      <Sidebar :showMenu="showMenu" @closeMenu="showMenu = false"></Sidebar>

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
    @media screen and (min-width: 999px) {
      margin-left: 250px;
    }
  }
</style>
