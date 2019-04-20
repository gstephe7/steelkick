<template>
  <div main>

    <Back route="JobDetails">Back to job</Back>

    <h1>{{ $route.query.jobName }}</h1>

    <hr>

    <div between align>
      <h2>Parts</h2>

      <div>
        <button green @click="createNewPart">+ Create New Part</button>
      </div>
    </div>

    <br>

    <!-- Search and Filter -->
    <div>

      <PartFilter v-show="showFilter"></PartFilter>

      <br>

      <div col end>
        <span class="royal" click @click="showFilter = !showFilter">
          <icon v-if="showFilter" icon="angle-up"></icon>
          <icon v-else icon="angle-down"></icon>
          Filter Parts
        </span>
      </div>

      <br>

      <div row align class="search-bar">
        <icon icon="search"></icon>
        <input grow id="search-input" v-model="search" placeholder="Search for parts">
      </div>

    </div>

    <br>

    <PartPreview v-for="part in filteredParts"
                 :key="part._id"
                 :part="part">
    </PartPreview>

  </div>
</template>

<script>
import material from '@/assets/data/material.js'
import api from '@/api/api'
import PartFilter from '@/components/app/parts/PartFilter'
import PartPreview from '@/components/app/parts/PartPreview'

export default {
  components: {
    PartFilter,
    PartPreview
  },
  data () {
    return {
      parts: [],
      search: '',
      showFilter: this.$route.query.updated || false
    }
  },
  computed: {
    filteredParts () {
      if (this.search) {
        return this.parts.filter(part => part.pieceMark.match(new RegExp(this.search, 'i')))
      } else {
        return this.parts
      }
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
      params: {
        job: this.$route.query.job,
        shape: this.$route.query.shape,
        dimension: this.$route.query.dimension,
        sequence: this.$route.query.sequence,
        complete: this.$route.query.complete
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.parts = res.data.parts
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  },
  mounted () {
    document.getElementById('search-input').focus()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  [main] {
    max-width: 700px;
  }

  button[green] {
    margin: 0;
  }

  .search-bar {
    max-width: 500px;
    border: 1px solid $accent;
    border-radius: 20px;
    padding: 0px 10px;
    margin: auto;
  }

  #search-input {
    border: none;
    outline: none;
    margin: 0;
  }
</style>
