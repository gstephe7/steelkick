<template>
  <div>

    <div class="center wrap">

      <InputSelect v-model="filter.shape" small>
        <template #label>Shape</template>
        <template #options>
          <option v-for="shape in shapes"
                  :value="shape"
                  :key="shape">
            {{ shape }}
          </option>
        </template>
      </InputSelect>

      <InputSelect v-model="filter.dimension" small>
        <template #label>Dimension</template>
        <template #options>
          <option v-for="dimension in dimensions"
                  :value="dimension"
                  :key="dimension">
            {{ dimension }}
          </option>
        </template>
      </InputSelect>

      <InputCheckBox v-model="filter.primed" small>
        Primed
      </InputCheckBox>

      <InputCheckBox v-model="filter.galvanized" small>
        Galv
      </InputCheckBox>

    </div>

  </div>
</template>

<script>
import method from '@/global/methods'
import material from '@/assets/data/material.js'
import api from '@/api/api'

export default {
  data () {
    return {
      filter: {}
    }
  },
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
  watch: {
    filter () {
      this.$emit('input', this.filter)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
