<template>
  <main>

    <header>
      <h3>Companies</h3>
    </header>

    <article v-if="loaded">
      <div v-for="company in companies">
        <h4>
          {{ company.name }}
        </h4>
        <menu>
          <router-link :to="{ name: 'Company', query: { id: company._id } }">
            View
          </router-link>
          <router-link :to="{ name: 'CompanyEdit', query: { id: company._id } }">
            Edit
          </router-link>
        </menu>
      </div>
    </article>

    <article v-else>
      <p>... loading</p>
    </article>

  </main>
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
  @import '@/assets/scss/structure.scss';

  h4 {
    margin: 0;
  }

  article {
    height: 200px;
    overflow-y: scroll;
  }

  div {
    box-shadow: $box-shadow;
    padding: 10px;
    margin: 5px 0;
  }
</style>
