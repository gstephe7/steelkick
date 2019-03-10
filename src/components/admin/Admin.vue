<template>
  <div>

    <AdminNav></AdminNav>

    <header>
      <h2>SteelKick Admin</h2>      
    </header>

    <router-view></router-view>

  </div>
</template>

<script>
import AdminNav from '@/components/admin/nav/AdminNav'

export default {
  components: {
    AdminNav
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';
</style>
