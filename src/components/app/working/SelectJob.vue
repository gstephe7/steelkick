<template>
  <div align center modal>
    <div basis card class="modal-box">

      <div between align>
        <Back route="Dashboard">Back</Back>
        <icon small click icon="times" @click="$emit('close')"></icon>
      </div>

      <div col>
        <h2>What job are you working on?</h2>
      </div>

      <div col>
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

  .modal-box {
    max-width: 500px;
    max-height: 90%;
    background-color: white;
    margin: 5px;
    overflow-y: scroll;
    h2 {
      font-weight: bold;
    }
    h3 {
      text-decoration: underline;
      color: royalblue;
      margin: 10px 0;
    }
  }
</style>
