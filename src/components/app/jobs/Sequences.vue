<template>
  <div main>

    <Back>Back to job</Back>

    <h1>{{ job.name }}</h1>

    <hr>

    <div card click v-for="sequence in job.sequences" @click="viewSequence({ id: sequence._id, number: sequence.number })">

      <h2>Sequence {{ sequence.number }}</h2>

      <hr>

      <!-- Parts -->
      <div>
        <div v-if="sequence.parts.length > 0">

        </div>
        <div v-else>
          <p>
            No parts for this sequence yet
          </p>
        </div>
      </div>

      <div col>
        <em>
          Click to view/edit sequence and parts
        </em>
      </div>

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
      job: {}
    }
  },
  methods: {
    viewSequence ({ id, number }) {
      this.$router.push({
        name: 'SequenceDetails',
        query: {
          job: this.job._id,
          jobName: this.job.name,
          sequence: id,
          sequenceNumber: number
        }
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/sequences`, {
      params: {
        id: this.$route.query.id
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.job = res.data.job
    })
  }
}
</script>

<style lang="scss" scoped>
  [card] {
    margin: 10px 0px;
  }
</style>
