<template>
  <div main col center>

    <icon confirm icon="check-circle"></icon>

    <p>You have successfully updated your company's workflow!</p>

    <router-link :to="{ name: 'Settings' }">
      Back to settings
    </router-link>

    <router-link :to="{ name: 'Dashboard' }">
      Back to dashboard
    </router-link>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

  p {
    text-align: center;
  }

  a {
    margin: 2px;
  }
</style>
