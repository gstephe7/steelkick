<template>
  <div>

    <List search @searching="searching" :searchString="search">

      <template #fab>
        <ButtonFab v-if="!working"
                   @click="showPartCreate = true">
          +
        </ButtonFab>
      </template>

      <template #menu>
        <Menu>
          <MenuItem @click="showMaterialList = true">
            Material List
          </MenuItem>
        </Menu>
      </template>

      <template #content>
        <div v-if="loaded">
          <div v-if="searchedParts.length > 0">
            <div v-for="part in searchedParts" :key="part._id">
              <PartItem :part="part"
                        :workflow="workflow"
                        @delete="deletePart">
              </PartItem>
            </div>
          </div>

          <div v-else class="col">
            <br>
            <h3>No parts found</h3>
          </div>
        </div>
      </template>

      <!-- Side Sheet Filter -->
      <template #asideTitle>
        Filter
      </template>

      <template #asideContent>
        <PartFilter v-model="filter"></PartFilter>
      </template>

      <template #asideAction>
        Filter
      </template>

    </List>

    <PartCreateScreen v-if="showPartCreate"
                      @close="updateParts">
    </PartCreateScreen>

    <MaterialListScreen v-if="showMaterialList"
                        :parts="parts"
                        @close="showMaterialList = false">
    </MaterialListScreen>

  </div>
</template>

<script>
import api from '@/api/api'
import PartItem from './PartItem'
import PartFilter from './PartFilter'
import PartCreateScreen from './PartCreateScreen'
import MaterialListScreen from './MaterialListScreen'

export default {
  props: {
    working: Boolean
  },
  components: {
    PartItem,
    PartFilter,
    PartCreateScreen,
    MaterialListScreen
  },
  data () {
    return {
      parts: [],
      filter: {},
      workflow: [],
      loaded: false,
      search: '',
      showPartCreate: false,
      showMaterialList: false
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
    searching (payload) {
      this.search = payload
    },
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
      if (_.sequence && _.sequence != part.sequence) {
        return false
      }
      return true
    },
    updateParts (payload) {
      if (payload) {
        payload.forEach(item => {
          this.parts.push(item)
        })
      }
      this.showPartCreate = false
    },
    deletePart (payload) {
      let partIndex = this.parts.findIndex(value => {
        return value._id == payload
      })

      this.parts.splice(partIndex, 1)
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/jobs/parts',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id
      },
      res: res => {
        this.parts = res.data.parts
        this.loaded = true
      }
    })

    api.request({
      type: 'get',
      endpoint: '/users/workflow',
      data: {
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.workflow = res.data.workflow
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
