<template>
  <div>

    <DashboardNav></DashboardNav>

    <h2 class="dashboard-title">
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
  @import '@/assets/scss/variables.scss';

  .dashboard-title {
    text-align: center;
  }

  a {
    text-decoration: none;
    color: royalblue;
  }
</style>
