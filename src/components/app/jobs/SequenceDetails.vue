<template>
  <div main>

    <Back>Back to all sequences</Back>

    <h1>{{ $route.query.jobName }}</h1>

    <hr>

    <h2>Sequence {{ $route.query.sequenceNumber }}</h2>

    <div col>
      <button green @click="createNewPart">+ Add New Part</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import PartsPreview from '@/components/app/parts/PartsPreview'

export default {
  components: {
    PartsPreview
  },
  data () {
    return {
      sequence: {}
    }
  },
  methods: {
    createNewPart () {
      this.$router.push({
        name: 'CreatePart',
        query: {
          job: this.$route.query.job,
          jobName: this.$route.query.jobName,
          sequence: this.$route.query.sequence,
          sequenceNumber: this.$route.query.sequenceNumber
        }
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/sequence-details`, {
      params: {
        job: this.$route.query.job,
        sequence: this.$route.query.sequence
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.sequence = res.data.sequence
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
