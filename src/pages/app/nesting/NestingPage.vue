<template>
  <div class="main">

    <NestingList :nests="nests"></NestingList>

  </div>
</template>

<script>
import api from '@/api/api'
import NestingList from './NestingList'

export default {
  components: {
    NestingList
  },
  data () {
    return {
      nests: []
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/nest/',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id
      },
      res: res => {
        this.nests = res.data.nests
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
