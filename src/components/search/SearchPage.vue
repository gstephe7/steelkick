<template>
  <div id="search-page">

    <h2>Search for Steel</h2>

    <AdvancedSearch buttonText="Search"
                    :searching="true">
    </AdvancedSearch>

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

  #search-page {
    padding: 10px;
    max-width: 670px;
    margin: auto;
  }
</style>
