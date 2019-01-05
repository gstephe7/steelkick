<template>
  <div>

    <MaterialListings :buying="true"
                      :listings="listings">
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
      perPage: 25,
      listings: []
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
        painted: query.painted,
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
      console.log(res)
      this.listings = res.data.material
    })
    .catch((err) => {
      this.$store.dispatch('complete')
      this.listings = []
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
