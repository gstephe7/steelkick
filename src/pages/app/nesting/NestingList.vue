<template>
  <div>

    <List search @searching="searching" :searchString="search">

      <template #fab>
        <ButtonFab @click="showScreen = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="nests.length > 0">
          <div v-for="nest in searchedNests" :key="nest._id">
            <NestingItem :nest="nest"
                         @remove="removeNest(nest._id)">
            </NestingItem>
          </div>
        </div>

        <div v-else class="col">
          You haven't nested this job yet
        </div>

      </template>

      <template #asideTitle>
        Filter
      </template>

      <template #asideContent>
        <PartFilter v-model="filter">
        </PartFilter>
      </template>

      <template #asideAction>
        Filter
      </template>

    </List>

    <NestingScreen v-if="showScreen"
                   @close="showScreen = false"
                   @newNest="newNest">
    </NestingScreen>

  </div>
</template>

<script>
import NestingItem from './NestingItem'
import NestingScreen from './NestingScreen'
import PartFilter from '@/pages/app/parts/PartFilter'

export default {
  props: {
    nests: Array
  },
  components: {
    NestingItem,
    NestingScreen,
    PartFilter
  },
  data () {
    return {
      showScreen: false,
      search: '',
      filter: {}
    }
  },
  computed: {
    filteredNests () {
      return this.nests.filter(this.filterNests)
    },
    searchedNests () {
      if (this.search) {
        return this.filteredNests.filter(item => {
          let searchString = this.search.replace(/ /g, '').trim()
          let itemMaterial = `${item.material.shape}${item.material.dimension}`
          let materialMatch = itemMaterial.match(new RegExp(searchString, 'i'))
          let minorMarkMatch = item.parts.some(value => {
            return value.part.minorMark.match(new RegExp(searchString, 'i'))
          })

          if (materialMatch || minorMarkMatch) {
            return true
          }
        })
      } else {
        return this.filteredNests
      }
    }
  },
  methods: {
    newNest (payload) {
      this.nests.push(payload)
    },
    searching (payload) {
      this.search = payload
    },
    filterNests (nest) {
      let _ = this.filter
      if (_.shape && _.shape != nest.material.shape) {
        return false
      }
      if (_.dimension && _.dimension != nest.material.dimension) {
        return false
      }
      if (_.sequence) {
        const match = nest.parts.find(item => {
          return item.part.sequence === _.sequence
        })
        return match
      }
      if (_.galvanized && nest.material.galvanized === false) {
        return false
      }
      return true
    },
    removeNest (id) {
      let nestIndex = this.nests.findIndex(value => {
        return value._id == id
      })
      this.nests.splice(nestIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
