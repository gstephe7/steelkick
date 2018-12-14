<template>
  <div id="search-page">

    <h2>Search for Steel</h2>

    <AdvancedSearch buttonText="Search"></AdvancedSearch>

  </div>
</template>

<script>
import AdvancedSearch from '@/components/search/AdvancedSearch'

export default {
  components: {
    AdvancedSearch
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #advanced-search {
    padding: 10px 0 100px 0;
  }

  h2 {
    text-align: center;
  }
</style>
