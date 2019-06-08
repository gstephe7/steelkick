<template>
  <div>
    <Loading v-if="$store.getters.loading"></Loading>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/progress/Loading'

export default {
  components: {
    Loading
  },
  beforeCreate () {
    if (this.$store.getters.loggedIn == false) {
      const token = this.$cookies.get('sk-user')
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
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
</style>
