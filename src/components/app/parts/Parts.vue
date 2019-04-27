<template>
  <div main>

    <Back route="JobDetails">Back to job</Back>

    <h1>
      {{ $route.query.jobName }} <br>
      Parts
    </h1>

    <hr>

    <br>

    <div row>

      <aside card class="desktop">
        <PartFilter :filter="filter"
                    v-on:reset="resetFilter">
        </PartFilter>
        <br>
        <div row align class="search-bar">
          <icon icon="search"></icon>
          <input grow id="search-input" v-model="search" placeholder="Search for parts" autocomplete="off">
        </div>
      </aside>

      <div grow id="part-div" v-if="loaded">
        <div col>
          <button green @click="createNewPart">
            + Create New Part
          </button>
        </div>

        <br>

        <div class="mobile">
          <PartFilter card
                      v-show="showFilter"
                      :filter="filter"
                      v-on:reset="resetFilter">
          </PartFilter>
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
            <input grow id="search-input" v-model="search" placeholder="Search for parts" autocomplete="off">
          </div>
          <br>
        </div>

        <div v-if="searchedParts.length > 0">
          <div v-for="part in searchedParts" @click="viewPart(part._id)">
            <PartPreview :key="part._id"
                         :part="part"
                         :workflow="workflow">
            </PartPreview>
          </div>
        </div>

        <div col v-else>
          <p>No parts found</p>
        </div>
      </div>

    </div>

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
      filter: {},
      workflow: [],
      loaded: false,
      search: '',
      showFilter: this.$route.query.updated || false
    }
  },
  computed: {
    filteredParts () {
      return this.parts.filter(this.filterParts)
    },
    searchedParts () {
      if (this.search) {
        return this.filteredParts.filter(this.searchParts)
      } else {
        return this.filteredParts
      }
    }
  },
  methods: {
    searchParts (part) {
      if (part.pieceMark && part.minorMark) {
        let pieceMarkMatch = part.pieceMark.match(new RegExp(this.search, 'i'))
        let minorMarkMatch = part.minorMark.match(new RegExp(this.search, 'i'))

        if (pieceMarkMatch && minorMarkMatch) {
          return true
        } else {
          return false
        }
      }

      else if (!part.minorMark) {
        return part.pieceMark.match(new RegExp(this.search, 'i'))
      }

      else {
        return part.minorMark.match(new RegExp(this.search, 'i'))
      }
    },
    filterParts (part) {
      let _ = this.filter
      if (_.shape && _.shape != part.shape) {
        return false
      }
      if (_.dimension && _.dimension != part.dimension) {
        return false
      }
      if (_.sequence && _.sequence != part.sequence._id) {
        return false
      }
      return true
    },
    resetFilter () {
      this.filter = {}
    },
    createNewPart () {
      this.$router.push({
        name: 'CreatePart',
        query: {
          job: this.$route.query.job,
          jobName: this.$route.query.jobName
        }
      })
    },
    viewPart (id) {
      this.$router.push({
        name: 'PartDetails',
        query: {
          job: this.$route.query.job,
          jobName: this.$route.query.jobName,
          part: id
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
      this.loaded = true
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  },
  created () {
    api.axios.get(`${api.baseUrl}/users/workflow`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.workflow = res.data.workflow
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
    max-width: 1200px;
  }

  .desktop {
    @media screen and (min-width: 1000px) {
      display: block;
    }
    @media screen and (max-width: 999px) {
      display: none;
    }
  }

  .mobile {
    @media screen and (min-width: 1000px) {
      display: none;
    }
    @media screen and (max-width: 999px) {
      display: block;
    }
  }

  aside {
    width: 300px;
    margin-right: 10px;
  }

  #part-div {
    max-width: 600px;
    margin: 0 auto;
  }

  button[green] {
    margin: 0;
  }

  .search-bar {
    max-width: 260px;
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
