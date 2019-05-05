<template>
  <div main>

    <h1>All Jobs</h1>

    <hr>

    <div col>

      <button green @click="createJob">+ Create New Job</button>

      <br>

      <div v-if="jobs.length > 0">
        <h2 click v-for="job in jobs" :key="job._id" @click="updateCurrentJob(job)">
          <router-link :to="{ name: 'JobDetails' }">
            {{ job.name }}
          </router-link>
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
      this.$router.push({
        name: 'CreateJob'
      })
    },
    updateCurrentJob (job) {
      this.$store.dispatch('updateCurrentJob', job)
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
  a {
    color: #0000ee;
  }
</style>
