<template>
  <div>

    <AdminNav></AdminNav>

    <router-view></router-view>

  </div>
</template>

<script>
import AdminNav from './nav/AdminNav'

export default {
  components: {
    AdminNav
  }
}
</script>

<style lang="scss" scoped>
</style>
