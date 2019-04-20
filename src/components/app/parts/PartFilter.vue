<template>
  <div card col>

    <h3>Filter Parts</h3>

    <div wrap center>

      <div row>
        <select v-model="filter.shape">
          <option disabled selected :value="undefined">Shape</option>
          <option v-for="shape in shapes" :value="shape">{{ shape }}</option>
        </select>
        <select v-model="filter.dimension">
          <option disabled selected :value="undefined">Dimension</option>
          <option v-for="dimension in dimensions" :value="dimension">{{ dimension }}</option>
        </select>
      </div>

      <div row>
        <select v-model="filter.sequence">
          <option disabled selected :value="undefined">Sequence</option>
          <option v-for="sequence in sequences" :value="sequence._id">Sequence {{ sequence.number }}</option>
        </select>
        <select v-model="filter.complete">
          <option disabled selected :value="undefined">Completed?</option>
          <option :value="true">Complete</option>
          <option :value="false">Incomplete</option>
        </select>
      </div>

    </div>

    <div col>
      <button @click="submit">Filter</button>
    </div>

  </div>
</template>

<script>
import material from '@/assets/data/material.js'
import api from '@/api/api'

export default {
  data () {
    return {
      filter: {},
      sequences: []
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
    }
  },
  methods: {
    submit () {
      this.$router.push({
        query: {
          job: this.$route.query.job,
          jobName: this.$route.query.jobName,
          shape: this.filter.shape,
          dimension: this.filter.dimension,
          sequence: this.filter.sequence,
          complete: this.filter.complete,
          updated: true
        }
      })
      location.reload(true)
    }
  },
  beforeCreate () {
    api.axios.get(`${api.baseUrl}/jobs/sequences`, {
      params: {
        id: this.$route.query.job
      }
    })
    .then(res => {
      this.sequences = res.data.sequences
    })
  },
  created () {
    let _ = this.$route.query

    if (_.shape) {
      this.filter.shape = _.shape
    }

    if (_.dimension) {
      this.filter.dimension = _.dimension
    }

    if (_.sequence) {
      this.filter.sequence = _.sequence
    }

    if (_.complete) {
      this.filter.complete = _.complete
    }
  }
}
</script>

<style lang="scss" scoped>
  [card] {
    padding: 5px 0;
  }
</style>
