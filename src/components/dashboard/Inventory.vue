<template>
  <div id="inventory">

    <MaterialListings inventory="true"
                      :listings="material">
    </MaterialListings>

  </div>
</template>

<script>
import api from '@/api/api'
import MaterialListings from '@/components/material/MaterialListings'

export default {
  components: {
    MaterialListings
  },
  data () {
    return {
      material: []
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
    })
    .catch(err => {
      this.$store.dispatch('complete')
      this.material = []
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
