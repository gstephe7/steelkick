<template>
  <div main>

    <div col>
      <h1>Admin Home</h1>
    </div>

    <hr>

    <Companies></Companies>

  </div>
</template>

<script>
import Companies from './components/companies/CompaniesPreview'

export default {
  components: {
    Companies
  }
}
</script>

<style lang="scss" scoped>
</style>
