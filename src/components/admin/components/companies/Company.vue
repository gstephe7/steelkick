<template>
  <div main>

    <h1>{{ company.name }}</h1>

    <hr>

    <div card v-if="companyLoaded">
      <EditCompany v-if="editing"
                   :company="company"
                   @close="editing = false">
      </EditCompany>


      <ViewCompany v-else
                   :company="company"
                   @editing="editing = true">
      </ViewCompany>
    </div>

    <div card>
      <div>
        <h2>Material</h2>
        <hr>
      </div>
      <div v-if="material.length > 0">
        <MaterialPreview v-for="item in material"
                         :key="item._id"
                         :item="item">
        </MaterialPreview>
      </div>

      <div v-else>
        <p>No material for this company</p>
      </div>
    </div>

    <div col>
      <button red @click="showDelete = !showDelete">Delete Company</button>
    </div>

    <div v-if="showDelete">
      <p>
        Are you sure you want to delete this company?
      </p>
      <div around>
        <button @click="showDelete = false">Cancel</button>
        <button red @click="deleteCompany">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import ViewCompany from '@/components/app/marketplace/editProfile/ViewCompany'
import EditCompany from '@/components/app/marketplace/editProfile/EditCompany'
import MaterialPreview from '@/components/app/material/MaterialPreview'

export default {
  components: {
    ViewCompany,
    EditCompany,
    MaterialPreview
  },
  data () {
    return {
      company: {},
      material: [],
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
          companyId: this.$route.query.companyId
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

    api.axios
      .get(`${api.baseUrl}/admin/company-material`, {
        params: {
          companyId: this.$route.query.companyId
        }
      })
      .then(res => {
        this.material = res.data.material
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
</style>
