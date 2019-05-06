<template>
  <div col>

    <h3>Filter Parts</h3>

    <div wrap center>

      <div row>
        <select v-model="filter.shape" @change="$emit('autoScroll')">
          <option disabled selected :value="undefined">Shape</option>
          <option v-for="shape in shapes" :value="shape">{{ shape }}</option>
        </select>
        <select v-model="filter.dimension" @change="$emit('autoScroll')">
          <option disabled selected :value="undefined">Dimension</option>
          <option v-for="dimension in dimensions" :value="dimension">{{ dimension }}</option>
        </select>
      </div>

      <div row>
        <select v-model="filter.sequence" @change="$emit('autoScroll')">
          <option disabled selected :value="undefined">Sequence</option>
          <option v-for="sequence in sequences" :value="sequence">Sequence {{ sequence }}</option>
        </select>
        <select @change="$emit('autoScroll')">
          <option disabled selected :value="undefined">Completed?</option>
          <option :value="true">Complete</option>
          <option :value="false">Incomplete</option>
        </select>
      </div>

    </div>

    <div col>
      <button @click="reset">Reset Filter</button>
    </div>

  </div>
</template>

<script>
import method from '@/global/methods'
import material from '@/assets/data/material.js'
import api from '@/api/api'

export default {
  props: ['filter'],
  computed: {
    shapes () {
      let shapeList = []
      material.forEach(item => {
        shapeList.push(item.shape)
      })
      return shapeList
    },
    dimensions () {
      let dimensionList = []

      if (this.filter.shape) {
        let selectedShape = material.find(item => item.shape == this.filter.shape)

        selectedShape.dimensions.forEach(item => {
          dimensionList.push(item.dimension)
        })
      }

      return dimensionList
    },
    sequences () {
      return method.getSequences(this.$store.getters.currentJob.sequences)
    }
  },
  methods: {
    reset () {
      this.$emit('reset')
    }
  }
}
</script>

<style lang="scss" scoped>
  [card] {
    padding: 5px 0;
  }
</style>
