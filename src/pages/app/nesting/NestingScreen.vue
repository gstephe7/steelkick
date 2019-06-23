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

        <div v-if="currentTab == 0">
          <NestingInventoryTab :parts="parts">
          </NestingInventoryTab>
        </div>

        <div v-else>

        </div>

      </div>

    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'
import NestingInventoryTab from './NestingInventoryTab'

export default {
  components: {
    NestingInventoryTab
  },
  data () {
    return {
      parts: [],
      tabs: ['Inventory', 'Purchase'],
      currentTab: 0,
      loaded: false
    }
  },
  methods: {
    changeTab (payload) {
      this.currentTab == payload
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
