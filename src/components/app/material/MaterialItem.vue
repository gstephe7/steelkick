<template>
  <Item :click="true">

    <template #title>
      <span>
        {{ material.shape }} {{ material.dimension }}
      </span>
    </template>

    <template #second>
       <span>
         {{ feet }}'
         {{ inches }}"
         {{ fraction }}
       </span>
       <span>
         {{ material.quantity }} available
       </span>
    </template>

    <template #third>
      <span>
        <span v-if="material.domestic">Domestic</span>
        <span v-else>Foreign</span>
      </span>
      <span :style="`backgroundColor: ${condition.background}`">
        {{ condition.condition }}
      </span>
    </template>

    <!-- Expanding Details -->
    <template #detailsTitle>
      {{ material.shape }} {{ material.dimension }}
    </template>

    <template #detailsContent>
      <MaterialDetails :material="material"></MaterialDetails>
    </template>

  </Item>
</template>

<script>
import method from '@/global/methods.js'
import MaterialDetails from './MaterialDetails'

export default {
  components: {
    MaterialDetails
  },
  props: ['material'],
  computed: {
    feet () {
      return method.getFeet(this.material.length)
    },
    inches () {
      return method.getInches(this.material.length)
    },
    fraction () {
      return method.getFraction(this.material.length)
    },
    condition () {
      if (this.material.galvanized) {
        return {
          condition: 'Galvanized',
          background: 'rgba(215, 219, 226, .3)'
        }
      } else if (this.material.primed) {
        return {
          condition: 'Primed',
          background: 'rgba(129, 129, 145, .3)'
        }
      } else if (this.material.condition == 'Excellent') {
        return {
          condition: 'Excellent',
          background: 'rgba(64, 191, 128, .2)'
        }
      } else if (this.material.condition == 'Good') {
        return {
          condition: 'Good',
          background: 'rgba(171, 191, 64, .25)'
        }
      } else if (this.material.condition == 'Fair') {
        return {
          condition: 'Fair',
          background: 'rgba(247, 183, 51, .25)'
        }
      } else if (this.material.condition == 'Poor') {
        return {
          condition: 'Poor',
          background: 'rgba(255, 82, 82, .25)'
        }
      } else {
        return {}
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
