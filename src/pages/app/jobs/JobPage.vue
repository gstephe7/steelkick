<template>
  <div class="main">

    <div class="col">
      {{ job.name }} Dashboard
    </div>

    <hr>

    <!-- Menu -->
    <div class="center wrap">

      <!-- Parts -->
      <DashboardCard route="/parts">
        <template v-slot:thumbnail>
          <icon class="red" icon="cubes"></icon>
        </template>
        <template v-slot:title>
          Parts
        </template>
        <template v-slot:content>
          View/Manage parts for this job
        </template>
      </DashboardCard>

      <!-- Nesting/Purchasing -->
      <DashboardCard route="/nesting">
        <template v-slot:thumbnail>
          <icon class="blue-green" icon="sitemap"></icon>
        </template>
        <template v-slot:title>
          Nesting
        </template>
        <template v-slot:content>
          Nest parts/create part lists and POs
        </template>
      </DashboardCard>

      <!-- Scheduling -->
      <DashboardCard route="/schedule">
        <template v-slot:thumbnail>
          <icon class="orange" :icon="['far', 'calendar-alt']">
          </icon>
        </template>
        <template v-slot:title>
          Schedule
        </template>
        <template v-slot:content>
          Set the schedule for this job
        </template>
      </DashboardCard>

      <!-- Edit -->
      <DashboardCard @click="showEdit = true">
        <template v-slot:thumbnail>
          <icon class="blue" icon="edit">
          </icon>
        </template>
        <template v-slot:title>
          Edit Job
        </template>
        <template v-slot:content>
          Edit info or delete this job
        </template>
      </DashboardCard>

    </div>

    <JobEditScreen v-if="showEdit"
                   @close="showEdit = false"
                   :job="job">
    </JobEditScreen>

  </div>
</template>

<script>
import api from '@/api/api'
import JobEditScreen from './JobEditScreen'

export default {
  components: {
    JobEditScreen
  },
  data () {
    return {
      job: {},
      progress: {},
      actions: [],
      showEdit: false
    }
  },
  methods: {
    deleteJob () {
      api.delete('/jobs/delete-job', {
        jobId: this.job._id
      }, (res) => {
        this.$router.push('/jobs')
        this.$store.dispatch('snackbar', 'Job successfully deleted')
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/job-details`, {
      params: {
        jobId: this.$store.getters.currentJob._id
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.job = res.data.job
      this.progress = res.data.progress
    })
  },
  created () {
    api.axios.get(`${api.baseUrl}/actions/job-actions`, {
      params: {
        jobId: this.$store.getters.currentJob._id,
        limit: 10
      }
    })
    .then(res => {
      this.actions = res.data.actions
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
