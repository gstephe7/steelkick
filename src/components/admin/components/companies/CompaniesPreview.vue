<template>
  <div card>

    <div>
      <h2>Companies</h2>
    </div>

    <hr>

    <div v-if="loaded">
      <div v-for="company in companies">
        <router-link :to="{ name: 'CompanyAdmin', query: { companyId: company._id } }">
          <h3>
            {{ company.name }}
          </h3>
        </router-link>
      </div>
    </div>

    <div v-else>
      <p>... loading</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      companies: [],
      loaded: false
    }
  },
  created () {
    api.axios
      .get(`${api.baseUrl}/admin/all-companies`)
      .then(res => {
        this.companies = res.data.companies.reverse()
        this.loaded = true
      })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
