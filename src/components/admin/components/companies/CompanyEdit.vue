<template>
  <main>

    <h3>Edit Company - {{ company.name }}</h3>

    <hr>

    <div v-if="companyLoaded">
      <EditCompany v-if="editing"
                   :company="company"
                   @close="editing = false">
      </EditCompany>


      <ViewCompany v-else
                   :company="company"
                   @editing="editing = true">
      </ViewCompany>
    </div>

    <menu>
      <button red @click="showDelete = !showDelete">Delete Company</button>
    </menu>

    <article v-if="showDelete">
      <header>
        Are you sure you want to delete this company?
      </header>
      <menu>
        <button @click="showDelete = false">Cancel</button>
        <button red @click="deleteCompany">Delete</button>
      </menu>
    </article>

  </main>
</template>

<script>
import api from '@/api/api'
import ViewCompany from '@/components/dashboard/editProfile/ViewCompany'
import EditCompany from '@/components/dashboard/editProfile/EditCompany'

export default {
  components: {
    ViewCompany,
    EditCompany
  },
  data () {
    return {
      company: {},
      companyLoaded: false,
      editing: false,
      showDelete: false
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios
      .get(`${api.baseUrl}/users/company`, {
        params: {
          id: this.$route.query.id
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.company = res.data.company
        this.companyLoaded = true
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
  },
  methods: {
    deleteCompany () {
      this.$store.dispatch('loading')
      api.axios
        .delete(`${api.baseUrl}/admin/delete-company`, {
          params: {
            id: this.company._id
          }
        })
        .then(() => {
          this.$store.dispatch('complete')
          this.$router.push({ name: 'AdminHome' })
        })
        .catch(() => {
          this.$store.dispatch('complete')
        })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';
</style>
