<template>
  <main col center>

    <h1>Create Your Free Account</h1>

    <CreateAccount></CreateAccount>

  </main>
</template>

<script>
import CreateAccount from '@/components/createAccount/CreateAccount'

export default {
  components: {
    CreateAccount
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';
</style>
