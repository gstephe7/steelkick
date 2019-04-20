<template>
  <div main>

    <Back>Back to all jobs</Back>

    <h1>{{ job.name }}</h1>

    <hr>

    <!-- Basic Info -->
    <div col start>
      <span>Job ID: {{ job.number }}</span>
      <span>Customer: {{ job.customer }}</span>
    </div>

    <br>

    <!-- Progress -->
    <div>
      <h3>Job Progress</h3>

      <!-- Progress Bar -->
      <ProgressBar :numerator="job.weightComplete"
                   :denominator="job.weightTotal"
                   col>
      </ProgressBar>

      <br>

      <!-- Completed Weight -->
      <div>
        <span>
          Weight Completed:
        </span>
        <span v-if="progress.weightTotal">
          {{ progress.weightComplete.toFixed(2) }}lbs / {{ progress.weightTotal.toFixed(2) }}lbs
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
          {{ progress.partsComplete }} / {{ progress.partsTotal }}
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
    <div around wrap>

      <!-- Parts -->
      <section col center card click @click="$router.push({name: 'Parts', query: {job: job._id, jobName: job.name}})">
        <icon big class="red" icon="th"></icon>
        <h2>Parts</h2>
      </section>

      <!-- Sequences -->
      <section col center card click @click="$router.push({name: 'Sequences', query: {id: job._id, job: job.name}})">
        <icon big class="orange" icon="sitemap"></icon>
        <h2>Sequences</h2>
      </section>

      <!-- Nesting/Purchasing -->
      <section col center card click @click="$router.push({name: 'Purchasing', query: {id: job._id}})">
        <icon big class="blue-green" icon="credit-card"></icon>
        <h2>Nesting/Purchasing</h2>
      </section>

      <!-- Scheduling -->
      <section col center card click @click="$router.push({name: 'Schedule', query: {id: job._id}})">
        <icon big class="green" :icon="['far', 'calendar-alt']"></icon>
        <h2>Schedule</h2>
      </section>

    </div>

    <br>
    <hr>
    <br>

    <!-- Job Activity -->
    <div card>
      <h2>Job Activity</h2>
      <hr>
    </div>

    <br>
    <hr>
    <br>

    <!-- Edit and Delete -->
    <div center>
      <button small>Edit Job</button>
      <button small red>Delete Job</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import ProgressBar from '@/components/app/outputs/ProgressBar'

export default {
  components: {
    ProgressBar
  },
  data () {
    return {
      job: {},
      progress: {}
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/job-details`, {
      params: {
        id: this.$route.query.id
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.job = res.data.job
      this.progress = res.data.progress
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  section {
    width: 230px;
    height: 230px;
  }
</style>
