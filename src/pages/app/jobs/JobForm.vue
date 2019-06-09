<template>
  <Form @submitForm="submit" ref="form">

    <template #content>
      <InputText v-model="name" big required>
        Job Name
      </InputText>
      <InputText v-model="number" big required>
        Job ID #
      </InputText>
      <InputText v-model="customer" big>
        Customer
      </InputText>
      <InputText v-model="sequences" big>
        # of Sequences
      </InputText>
    </template>

  </Form>
</template>

<script>
import api from '@/api/api'

export default {
  props: {
    edit: Object
  },
  data () {
    return {
      name: '',
      number: '',
      customer: '',
      sequences: null
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.submit()
    },
    checkForm () {
      if (!this.sequences) {
        this.sequences = 1
      }
    },
    submit () {
      this.checkForm()

      if (this.edit) {
        api.request({
          type: 'put',
          endpoint: '/jobs/edit-job',
          load: true,
          data: {
            jobId: this.edit._id,
            name: this.name,
            number: this.number,
            customer: this.customer,
            sequences: this.sequences
          },
          res: res => {
            this.$emit('close')
            this.$store.dispatch('snackbar', 'Successfully updated job!')
          },
          err: err => {
            this.$emit('close')
            this.$store.dispatch('snackbarFailed', 'Failed to update job.')
          }
        })
      }

      else {
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
  },
  created () {
    if (this.edit) {
      this.name = this.edit.name
      this.number = this.edit.number
      this.customer = this.edit.customer
      this.sequences = this.edit.sequences
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
