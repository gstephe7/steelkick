<template>
  <List>
    <template #content>
      <div v-for="nest in finalNest">
        <NestingItem :nest="nest"
                     inventory>
        </NestingItem>
      </div>
    </template>
  </List>
</template>

<script>
import api from '@/api/api'
import NestingItem from './NestingItem'

export default {
  components: {
    NestingItem
  },
  data () {
    return {
      finalNest: []
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/jobs/create-nest-inventory',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id,
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.finalNest = res.data.nest
      },
      err: err => {
        console.log(err)
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
