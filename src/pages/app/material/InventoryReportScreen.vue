<template>
  <Screen @close="$emit('close')">

    <template #title>
      Inventory Breakdown
    </template>

    <template #content>

      <div class="container">
        Total Items: {{ totalCount }}
      </div>

      <div class="container">
        Total Weight: {{ Math.ceil(totalWeight).toLocaleString() }} lbs
      </div>

      <div class="container">
        Total Value: {{ totalValue.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
      </div>

    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'

export default {
  props: {
    inventory: Array
  },
  computed: {
    totalCount () {
      return this.inventory.reduce((total, item) => {
        return total + item.quantity
      }, 0)
    },
    totalWeight () {
      return this.inventory.reduce((total, item) => {
        const itemWeight = item.weightPerFoot * (item.length / 12)
        return total + (itemWeight * item.quantity)
      }, 0)
    },
    totalValue () {
      return this.inventory.reduce((total, item) => {
        if (item.cwt) {
          const weight = item.weightPerFoot * (item.length / 12)
          const pricePerPound = item.cwt / 100
          const price = (pricePerPound * weight) * item.quantity
          return total + price
        } else {
          return total
        }
      }, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
