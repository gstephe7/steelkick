<template>
  <div>

    <AdminNav></AdminNav>

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
</style>
