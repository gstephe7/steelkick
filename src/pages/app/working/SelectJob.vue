<template>
  <div align center backdrop>
    <div modal>

      <div header between align>
        <h4>What job are you working on?</h4>
        <icon small click icon="times" @click="$emit('close')"></icon>
      </div>

      <div content col>
        <br>
        <h3 click v-for="job in jobs" :key="job._id" @click="selectJob(job)">
          {{ job.name }}
        </h3>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      jobs: []
    }
  },
  methods: {
    selectJob (job) {
      this.$store.dispatch('updateCurrentJob', job)
      this.$emit('close')
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/jobs`, {
      params: {
        companyId: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.jobs = res.data.jobs
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  h3 {
    color: $blue;
    text-decoration: underline;
  }
</style>
