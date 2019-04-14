<template>
  <div>

    <MaterialListings :inventory="true"
                      :listings="material"
                      v-if="loaded">
    </MaterialListings>

  </div>
</template>

<script>
import api from '@/api/api'
import MaterialListings from '@/components/app/material/MaterialListings'

export default {
  components: {
    MaterialListings
  },
  data () {
    return {
      material: [],
      loaded: false
    }
  },
  created () {
    const query = this.$route.query
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/material/search-material`, {
      params: {
        company: this.$store.getters.companyId,
        shape: query.shape,
        dimension: query.dimension,
        feet: query.feet,
        domestic: query.domestic,
        primed: query.primed,
        galvanized: query.galvanized
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      res.data.material.forEach(item => {
        this.material.push(item)
      })
      this.loaded = true
    })
    .catch(err => {
      this.$store.dispatch('complete')
      this.material = []
      this.loaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
