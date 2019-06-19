<template>
  <div class="main">

    <NestingList :nests="nests"></NestingList>

  </div>
</template>

<script>
import NestingList from './NestingList'

export default {
  components: {
    NestingList
  },
  data () {
    return {
      nests: []
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
