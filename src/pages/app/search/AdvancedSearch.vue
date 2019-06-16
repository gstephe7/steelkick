<template>
  <div class="main col">

    <h1>Search for Steel</h1>

    <Search :searching="true"></Search>

  </div>
</template>

<script>
import Search from './Search'

export default {
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
</style>
