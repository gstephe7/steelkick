<template>
  <div>

    <DashboardNav></DashboardNav>

    <h2>
      <router-link :to="{ name: 'Company', query: { id: $store.getters.companyId } }">
        {{ company }}
      </router-link> Dashboard
    </h2>

    <router-view></router-view>

  </div>
</template>

<script>
import DashboardNav from '@/components/dashboard/nav/DashboardNav'

export default {
  components: {
    DashboardNav
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

  h2 {
    text-align: center;
  }

  a {
    color: royalblue;
    text-decoration: none;
  }
</style>
