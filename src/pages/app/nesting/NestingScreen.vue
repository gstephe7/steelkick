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

      <div v-show="currentTab == 0">
        <NestingInventoryTab>
        </NestingInventoryTab>
      </div>

      <div v-show="currentTab == 1">
        <NestingOrderingTab @newNest="newNest">
        </NestingOrderingTab>
      </div>

      <div v-show="currentTab == 2">
        <NestingOptionsTab>
        </NestingOptionsTab>
      </div>

    </template>

  </Screen>
</template>

<script>
import NestingInventoryTab from './NestingInventoryTab'
import NestingOrderingTab from './NestingOrderingTab'
import NestingOptionsTab from './NestingOptionsTab'


export default {
  components: {
    NestingInventoryTab,
    NestingOrderingTab,
    NestingOptionsTab
  },
  data () {
    return {
      tabs: ['Inventory', 'Ordering', 'Options'],
      currentTab: 0
    }
  },
  methods: {
    changeTab (payload) {
      this.currentTab = payload
    },
    newNest (payload) {
      this.$emit('newNest', payload)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
