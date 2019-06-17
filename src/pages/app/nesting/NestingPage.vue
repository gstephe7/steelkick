<template>
  <div class="main">

    <NestingList v-if="nests.length > 0"></NestingList>

    <div v-else class="col">
      <p>
        You haven't nested this job yet
      </p>
      <Button create>
        AUTO NEST
      </Button>
    </div>

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
