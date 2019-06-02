<template>
  <div main>

    <div v-if="$store.getters.isAdmin">

      <h3>Edit Company</h3>

      <hr>

      <div v-if="loaded.company">
        <EditCompany v-if="editing.company"
                     :company="company"
                     :addressInvalid="addressInvalid"
                     :newAccount="newAccount"
                     @close="completeEditing">
        </EditCompany>

        <ViewCompany v-else
                     :company="company"
                     @editing="editing.company = true">
        </ViewCompany>
      </div>

    </div>

  </div>
</template>

<script>
import ViewCompany from './ViewCompany'
import EditCompany from './EditCompany'

import api from '@/api/api'

export default {
  components: {
    ViewCompany,
    EditCompany
  },
  data () {
    return {
      company: {},
      editing: {
        company: false
      },
      loaded: {
        company: false
      },
      addressInvalid: false,
      newAccount: false
    }
  },
  created () {

    this.$store.dispatch('loading')

    // retrieve company profile
    api.axios.get(`${api.baseUrl}/users/company`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.company = res.data.company
      this.loaded.company = true
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })

    if (this.$route.query.addressInvalid) {
      this.addressInvalid = true
      this.editing.company = true
    }

    if (this.$route.query.newAccount) {
      this.editing.company = true
      this.newAccount = true
    }

  },
  mounted () {
    setTimeout(() => {
      if (this.addressInvalid) {
        document.getElementById('edit-company').scrollIntoView()
      }

      if (this.newAccount) {
        document.getElementById('edit-company').scrollIntoView()
      }
    }, 750)
  },
  methods: {
    completeEditing () {
      this.editing.company = false
      this.addressInvalid = false
      this.newAccount = false
    }
  }
}
</script>

<style lang="scss" scoped>

  [main] {
    max-width: 600px;
  }
</style>
