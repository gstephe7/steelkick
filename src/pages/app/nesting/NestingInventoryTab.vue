<template>
  <List>
    <template #title>
      <span class="center">Confirm Inventory Usage</span>
    </template>
    <template #content>
      <div v-if="finalNest.length > 0">
        <div v-for="(nest, index) in finalNest" :key="nest._id">
          <NestingItem :nest="nest"
                       inventory
                       @confirm="confirm(nest, index)"
                       @remove="remove(index)">
          </NestingItem>
        </div>
      </div>
      <div v-else>
        <div class="div center">
          No matching inventory found to nest          
        </div>
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
  methods: {
    confirm (nest, index) {
      api.request({
        type: 'post',
        endpoint: '/nest/inventory',
        data: {
          nest: nest
        },
        res: res => {},
        err: err => {}
      })
      this.finalNest.splice(index, 1)
      this.$emit('newNest', nest)
      this.$store.dispatch('snackbar', 'New nest created! Inventory item(s) removed!')
    },
    remove (index) {
      this.finalNest.splice(index, 1)
      this.$store.dispatch('snackbar', 'Nest removed from consideration')
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/nest/inventory',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id,
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.finalNest = res.data.nest
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
