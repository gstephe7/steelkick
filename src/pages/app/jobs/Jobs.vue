<template>
  <div class="main">

    <List>

      <template #fab>
        <ButtonFab @click="showJobCreate = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="jobs.length > 0">
          <div v-for="job in jobs"
               :key="job._id"
               @click="updateCurrentJob(job)">
            <Item clickable>
              <template #title>{{ job.name }}</template>
              <template #second>{{ job.number }}</template>
            </Item>
          </div>
        </div>

        <div v-else>
          <p>
            You currently don't have any jobs saved
          </p>
        </div>

      </template>

    </List>

    <JobCreateScreen v-if="showJobCreate"
                     @close="showJobCreate = false">
    </JobCreateScreen>

  </div>
</template>

<script>
import api from '@/api/api'
import JobCreateScreen from './JobCreateScreen'

export default {
  components: {
    JobCreateScreen
  },
  data () {
    return {
      jobs: [],
      showJobCreate: false
    }
  },
  methods: {
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
</style>
