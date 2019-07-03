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
        <NestingPurchasingTab @close="$emit('close')">
        </NestingPurchasingTab>
      </div>

    </template>

  </Screen>
</template>

<script>
import NestingInventoryTab from './NestingInventoryTab'
import NestingPurchasingTab from './NestingPurchasingTab'

export default {
  components: {
    NestingInventoryTab,
    NestingPurchasingTab
  },
  data () {
    return {
      tabs: ['Inventory', 'Ordering'],
      currentTab: 0
    }
  },
  methods: {
    changeTab (payload) {
      this.currentTab = payload
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
