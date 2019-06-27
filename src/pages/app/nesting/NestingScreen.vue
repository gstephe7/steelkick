<template>
  <Screen @close="$emit('close')">

    <template #title>
      Nest Job
    </template>

    <template #tabs>
      <Tabs :tabs="tabs" @newTab="changeTab">
      </Tabs>
    </template>

    <template #content>

      <div v-if="loaded">

        <div v-show="currentTab == 0">
          <NestingInventoryTab :parts="parts"
                               @newNest="newNest">
          </NestingInventoryTab>
        </div>

        <div v-show="currentTab == 1">
          <NestingPurchasingTab :parts="parts"
                                @newNest="newNest"
                                @close="$emit('close')">
          </NestingPurchasingTab>
        </div>

      </div>

    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'
import NestingInventoryTab from './NestingInventoryTab'
import NestingPurchasingTab from './NestingPurchasingTab'

export default {
  components: {
    NestingInventoryTab,
    NestingPurchasingTab
  },
  data () {
    return {
      parts: [],
      tabs: ['Inventory', 'Ordering'],
      currentTab: 0,
      loaded: false
    }
  },
  methods: {
    newNest (payload) {
      payload.forEach(item => {
        this.$emit('newNest', item)
      })
    },
    changeTab (payload) {
      this.currentTab = payload
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/jobs/parts',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id
      },
      res: res => {
        this.parts = res.data.parts
        this.loaded = true
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
