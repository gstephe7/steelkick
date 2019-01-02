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
    api.axios.get(`${api.baseUrl}/material/inventory`, {
      params: {
        company: this.$store.getters.companyId
      }
    })
    .then(res => {
      res.data.material.forEach(item => {
        this.material.push(item)
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
