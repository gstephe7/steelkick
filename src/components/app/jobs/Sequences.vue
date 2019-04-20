<template>
  <div main>

    <Back>Back to job</Back>

    <h1>{{ $route.query.job }}</h1>

    <hr>

    <div card click v-for="sequence in sequences" @click="viewSequence({ id: sequence._id, number: sequence.number })">

      <h2>Sequence {{ sequence.number }}</h2>

      <hr>

      <!-- Sequence Summary -->
      <div>

        <ProgressBar :numerator="sequence.weightComplete"
                     :denominator="sequence.weightTotal"
                     col>
        </ProgressBar>

        <br>

        <!-- Completed Weight -->
        <div>
          <span>
            Weight Completed:
          </span>
          <span v-if="sequence.weightTotal">
            {{ sequence.weightComplete.toFixed(2) }}lbs / {{ sequence.weightTotal.toFixed(2) }}lbs
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
          <span v-if="sequence.partsTotal">
            {{ sequence.partsComplete }} / {{ sequence.partsTotal }}
          </span>
          <span v-else>
            0 / 0
          </span>
        </div>

      </div>

      <br>

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
import ProgressBar from '@/components/app/outputs/ProgressBar'

export default {
  components: {
    ProgressBar
  },
  data () {
    return {
      sequences: []
    }
  },
  methods: {
    viewSequence ({ id, number }) {
      this.$router.push({
        name: 'SequenceDetails',
        query: {
          job: this.$route.query.id,
          jobName: this.$route.query.job,
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
      this.sequences = res.data.sequences
    })
  }
}
</script>

<style lang="scss" scoped>
  [card] {
    margin: 20px 0px;
  }
</style>
