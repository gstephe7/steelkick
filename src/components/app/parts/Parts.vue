<template>
  <div main>

    <Back>Back to job</Back>

    <h1>{{ $route.query.jobName }}</h1>

    <hr>

    <h2>Parts</h2>

    <div col>
      <button green @click="createNewPart">+ Create New Part</button>
    </div>

    <PartPreview v-for="part in parts"
                 :key="part._id"
                 :part="part">
    </PartPreview>

  </div>
</template>

<script>
import api from '@/api/api'
import PartPreview from '@/components/app/parts/PartPreview'

export default {
  components: {
    PartPreview
  },
  data () {
    return {
      parts: []
    }
  },
  methods: {
    createNewPart () {
      this.$router.push({
        name: 'CreatePart',
        query: {
          job: this.$route.query.job,
          jobName: this.$route.query.jobName
        }
      })
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/parts`, {
      query: {
        job: this.$route.query.job
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.parts = res.data.parts
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
