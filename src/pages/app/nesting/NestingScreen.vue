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

      <div v-if="currentTab == 0">
        <NestingInventoryTab>
        </NestingInventoryTab>
      </div>

      <div v-else>



      </div>

    </template>

  </Screen>
</template>

<script>
import NestingInventoryTab from './NestingInventoryTab'

export default {
  components: {
    NestingInventoryTab
  },
  data () {
    return {
      tabs: ['Inventory', 'Purchase'],
      currentTab: 0
    }
  },
  methods: {
    changeTab (payload) {
      this.currentTab == payload
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
