<template>
  <div class="main">

    <h1>{{ job.name }}</h1>

    <hr>

    <!-- Basic Info -->
    <div>
      <div>Job ID: {{ job.number }}</div>
      <div>Customer: {{ job.customer }}</div>
    </div>

    <br>

    <!-- Progress -->
    <div>
      <h3>Job Progress</h3>

      <!-- Progress Bar -->
      <ProgressBar :numerator="job.weightComplete"
                   :denominator="job.weightTotal"
                   class="col">
      </ProgressBar>

      <br>

      <!-- Completed Weight -->
      <div>
        <span>
          Weight Completed:
        </span>
        <span v-if="progress.weightTotal">
          {{ progress.weightComplete.toLocaleString('en', { maximumFractionDigits: 0 }) }} lbs / {{ progress.weightTotal.toLocaleString('en', { maximumFractionDigits: 0 }) }} lbs
        </span>
        <span v-else>
          0lbs / 0lbs
        </span>
      </div>

      <!-- Completed Parts -->
      <div>
        <span>
          Parts Completed:
        </span>
        <span v-if="progress.partsTotal">
          {{ progress.partsComplete.toLocaleString() }} / {{ progress.partsTotal.toLocaleString() }}
        </span>
        <span v-else>
          0 / 0
        </span>
      </div>

    </div>

    <br>
    <hr>
    <br>

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
      <DashboardCard route="/purchasing">
        <template v-slot:thumbnail>
          <icon class="blue-green" icon="credit-card"></icon>
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
          <icon class="green" :icon="['far', 'calendar-alt']">
          </icon>
        </template>
        <template v-slot:title>
          Schedule
        </template>
        <template v-slot:content>
          Set the schedule for this job
        </template>
      </DashboardCard>

    </div>

    <br>
    <hr>
    <br>

    <!-- Job Activity -->
    <div card>
      <h2>Job Activity</h2>
      <hr>
      <div>
        <Action v-for="action in actions"
                :key="action._id"
                :action="action"
                :part="action.part">
        </Action>
      </div>
    </div>

    <br>
    <hr>
    <br>

    <!-- Edit and Delete -->
    <div class="center">
      <button class="small">
        Edit Job
      </button>
      <button class="small red" @click="showDelete = true">
        Delete Job
      </button>
    </div>

    <!-- Delete Modal -->
    <Modal v-if="showDelete" @close="showDelete = false">
      <template v-slot:title>
        Delete Job
      </template>
      <template v-slot:content>
        Are you sure you want to delete this job?
      </template>
      <template v-slot:actions>
        <button class="small" @click="showDelete = false">
          Cancel
        </button>
        <button class="red small" @click="deleteJob">
          Delete Job
        </button>
      </template>
    </Modal>

  </div>
</template>

<script>
import api from '@/api/api'
import ProgressBar from '@/components/app/outputs/ProgressBar'
import Action from '@/components/app/actions/Action'

export default {
  components: {
    ProgressBar,
    Action
  },
  data () {
    return {
      job: {},
      progress: {},
      actions: [],
      showDelete: false
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
