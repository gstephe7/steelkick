<template>
  <div class="main">

    <div class="col">

      <Button create @click="createJob">
        + Create New Job
      </Button>

      <br>

      <div v-if="jobs.length > 0">
        <h2 class="click" v-for="job in jobs" :key="job._id" @click="updateCurrentJob(job)">
          {{ job.name }}
        </h2>
      </div>

      <div v-else>
        <p>
          You currently don't have any jobs saved
        </p>
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
    createJob () {
      this.$router.push('/create-job')
    },
    updateCurrentJob (job) {
      this.$store.dispatch('updateCurrentJob', job)
      .then(() => {
        this.$router.push('job-details')
      })
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
  h2 {
    color: #0000ee;
    text-decoration: underline;
  }
</style>
