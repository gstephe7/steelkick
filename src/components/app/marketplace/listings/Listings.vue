<template>
  <div>

    <MaterialListings :buying="true"
                      :listings="listings"
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
      perPage: 25,
      listings: [],
      loaded: false
    }
  },
  created () {
    const query = this.$route.query
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/material/search-material`, {
      params: {
        forSale: query.forSale,
        shape: query.shape,
        dimension: query.dimension,
        feet: query.feet,
        inches: query.inches,
        numerator: query.numerator,
        denominator: query.denominator,
        domestic: query.domestic,
        primed: query.primed,
        galvanized: query.galvanized,
        radius: query.radius,
        zipcode: query.zipcode,
        cut: query.cut,
        delivery: query.delivery,
        state: query.state,
        company: query.company
      }
    })
    .then((res) => {
      this.$store.dispatch('complete')
      this.listings = res.data.material
      this.loaded = true
    })
    .catch((err) => {
      this.$store.dispatch('complete')
      this.listings = []
      this.loaded = true
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
