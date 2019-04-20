<template>
  <div main>

    <h1>Create a New Job</h1>

    <hr>

    <form col @submit.prevent="submit">

      <input big v-model="name" placeholder="Job Name" :highlight="errors.name">
      <input big v-model="number" placeholder="Job ID #">
      <input big v-model="customer" placeholder="Customer">
      <input big v-model="sequences" placeholder="# of Sequences">

      <button green type="submit">Create Job</button>

      <div errors>
        <p v-if="errors.name">Please enter a job name</p>
      </div>

    </form>

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
          this.$router.push({
            name: 'JobDetails',
            query: {
              id: res.data.job
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  input[big] {
    width: 250px;
  }
</style>
