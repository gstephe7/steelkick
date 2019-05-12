<template>
  <div col>

    <div col align>

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
        <LengthInput v-model="filter.length" @blur="$emit('autoScroll')">
        </LengthInput>
        <select v-model="filter.domestic" @change="$emit('autoScroll')">
          <option disabled selected :value="undefined">Steel Origin</option>
          <option :value="true">Domestic</option>
          <option :value="false">Foreign</option>
        </select>
      </div>

      <div row>
        <select v-model="filter.primed" @change="$emit('autoScroll')" class="autotab">
          <option :value="undefined">Primed?</option>
          <option :value="false">Not Primed</option>
          <option :value="true">Primed</option>
        </select>
        <select v-model="filter.galvanized" @change="$emit('autoScroll')" class="autotab">
          <option :value="undefined">Galvanized?</option>
          <option :value="false">Not Galvanized</option>
          <option :value="true">Galvanized</option>
        </select>
      </div>

    </div>

    <div col>
      <button @click="reset">Reset Filter</button>
    </div>

  </div>
</template>

<script>
import material from '@/assets/data/material.js'
import LengthInput from '@/components/app/inputs/LengthInput'

export default {
  components: {
    LengthInput
  },
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
