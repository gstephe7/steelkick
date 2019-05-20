<template>
  <List>

    <template v-slot:title>
      {{ $store.getters.currentJob.name }} Parts
    </template>

    <template v-slot:actions>
      <button v-if="!working"
              class="green"
              @click="createNewPart">
        + Create New Part
      </button>
      <InputSearch v-model="search"
                   id="part-div"
                   @input="autoScroll">
      </InputSearch>
    </template>

    <template v-slot:content>
      <div v-if="searchedParts.length > 0">
        <div v-for="part in searchedParts" :key="part._id" @click="viewPart(part)">
          <PartItem :part="part"></PartItem>
        </div>
      </div>

      <div v-else class="col">
        <h3>No parts found</h3>
      </div>
    </template>

  </List>
</template>

<script>
import api from '@/api/api'
import PartItem from './PartItem'

export default {
  props: ['job', 'working'],
  components: {
    PartItem
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

        if (pieceMarkMatch || minorMarkMatch) {
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
      this.$router.push('/create-part')
    },
    viewPart (part) {
      if (this.working) {
        this.$emit('updatePart', part)
      } else {
        this.$router.push({
          path: '/part-details',
          query: {
            partId: part._id
          }
        })
      }
    },
    autoScroll () {
      document.getElementById('part-div').scrollIntoView()
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/parts`, {
      params: {
        jobId: this.$store.getters.currentJob._id
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

    api.axios.get(`${api.baseUrl}/users/workflow`, {
      params: {
        companyId: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.workflow = res.data.workflow
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
