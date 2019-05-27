<template>
  <div>

    <div class="center wrap">

      <InputSelect v-model="filter.shape" @input="updateFilter" size="small">
        <template #label>Shape</template>
        <template #options>
          <option v-for="shape in shapes"
                  :value="shape"
                  :key="shape">
            {{ shape }}
          </option>
        </template>
      </InputSelect>

      <InputSelect v-model="filter.dimension" @input="updateFilter" size="small">
        <template #label>Dimension</template>
        <template #options>
          <option v-for="dimension in dimensions"
                  :value="dimension"
                  :key="dimension">
            {{ dimension }}
          </option>
        </template>
      </InputSelect>

      <InputSelect v-model="filter.primed" @input="updateFilter" size="small">
        <template #label>Primed?</template>
        <template #options>
          <option :value="true">
            Primed
          </option>
          <option :value="false">
            Not Primed
          </option>
        </template>
      </InputSelect>

      <InputSelect v-model="filter.galvanized" @input="updateFilter" size="small">
        <template #label>Galvanized?</template>
        <template #options>
          <option :value="true">
            Galvanized
          </option>
          <option :value="false">
            Not Galvanized
          </option>
        </template>
      </InputSelect>

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
  methods: {
    updateFilter () {
      this.$emit('input', this.filter)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
