<template>
  <div class="main">

    <MaterialList :material="material"
                  v-if="loaded">
    </MaterialList>

  </div>
</template>

<script>
import api from '@/api/api'
import MaterialList from './MaterialList'

export default {
  components: {
    MaterialList
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
      this.material = res.data.material
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
