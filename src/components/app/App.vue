<template>
  <div>

    <AppHeader></AppHeader>

    <div class="row">

      <AppDrawer class="desktop"></AppDrawer>

      <div class="content basis grow">
        <router-view></router-view>
        <Footer></Footer>
      </div>

    </div>

    <SnackBar v-if="$store.getters.snackbarShow"></SnackBar>

  </div>
</template>

<script>
import AppHeader from '@/components/navigation/AppHeader'
import AppDrawer from '@/components/navigation/AppDrawer'
import Footer from '@/components/website/footer/Footer'

export default {
  components: {
    AppHeader,
    AppDrawer,
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
      margin-left: 240px;
    }
  }
</style>
