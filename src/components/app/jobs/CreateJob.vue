<template>
  <div class="main">

    <Form @submit="submit">

      <template v-slot:title>
        Create a New Job
      </template>

      <template v-slot:content>
        <InputText v-model="name" size="big">
          Job Name
        </InputText>
        <InputText v-model="number" size="big">
          Job ID #
        </InputText>
        <InputText v-model="customer" size="big">
          Customer
        </InputText>
        <InputText v-model="sequences" size="big">
          # of Sequences
        </InputText>
      </template>

      <template v-slot:action>
        Create Job
      </template>

    </Form>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      name: '',
      number: '',
      customer: '',
      sequences: null,
      errors: {
        name: false
      }
    }
  },
  methods: {
    checkForm () {
      if (!this.sequences) {
        this.sequences = 1
      }

      if (!this.name) {
        this.errors.name = true
      } else {
        this.errors.name = false
      }
    },
    submit () {
      this.checkForm()
      if (this.errors.name == false) {
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/jobs/create-job`, {
          company: this.$store.getters.companyId,
          name: this.name,
          number: this.number,
          customer: this.customer,
          sequences: this.sequences
        })
        .then(res => {
          this.$store.dispatch('complete')
          this.$store.dispatch('updateCurrentJob', res.data.job)
          this.$store.dispatch('snackbar', 'Successfully created a new job!')
          this.$router.push('job-details')
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
