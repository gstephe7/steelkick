<template>
  <div>
    <List search @searching="searching" :searchString="search">

      <!-- Main List -->
      <template #fab>
        <ButtonFab @click="showMaterialCreateScreen = true">
          +
        </ButtonFab>
      </template>

      <template #menu>
        <Menu>
          <MenuItem @click="showInventoryReport = true">
            Summary
          </MenuItem>
        </Menu>
      </template>

      <template #content>
        <div v-if="searched.length > 0">
          <div v-for="material in searched"
               :key="material._id">
            <MaterialItem :material="material">
            </MaterialItem>
          </div>
        </div>
        <div v-else class="col">
          <br>
          <h3>No material found</h3>
        </div>
      </template>

      <!-- Aside Sheet Filter -->
      <template #asideTitle>
        Filter
      </template>

      <template #asideContent>
        <MaterialFilter v-model="filter"></MaterialFilter>
      </template>

      <template #asideAction>
        Filter
      </template>

    </List>

    <div v-if="showMaterialCreateScreen">
      <MaterialCreateScreen @close="updateMaterial">
      </MaterialCreateScreen>
    </div>

    <div v-if="showInventoryReport">
      <InventoryReportScreen @close="showInventoryReport = false"
                             :inventory="material">
      </InventoryReportScreen>
    </div>

  </div>

</template>

<script>
import MaterialItem from './MaterialItem'
import MaterialFilter from './MaterialFilter'
import MaterialCreateScreen from './MaterialCreateScreen'
import InventoryReportScreen from './InventoryReportScreen'

export default {
  components: {
    MaterialItem,
    MaterialFilter,
    MaterialCreateScreen,
    InventoryReportScreen
  },
  props: ['material'],
  data () {
    return {
      filter: {},
      search: '',
      showMaterialCreateScreen: false,
      showInventoryReport: false
    }
  },
  computed: {
    filtered () {
      return this.material.filter(this.filterItems)
    },
    searched () {
      if (this.search) {
        return this.filtered.filter(this.searchItems)
      } else {
        return this.filtered
      }
    }
  },
  methods: {
    searching (payload) {
      this.search = payload
    },
    searchItems (item) {
      let itemMaterial = `${item.shape}${item.dimension}`
      let searchString = this.search.replace(/ /g, '').trim()
      let itemMatch = itemMaterial.match(new RegExp(searchString, 'i'))

      if (itemMatch) {
        return true
      } else {
        return false
      }
    },
    filterItems (item) {
      let _ = this.filter
      if (_.shape && _.shape != item.shape) {
        return false
      }
      if (_.dimension && _.dimension != item.dimension) {
        return false
      }
      if (_.primed && _.primed != item.primed) {
        return false
      }
      if (_.galvanized && _.galvanized != item.galvanized) {
        return false
      }
      return true
    },
    updateMaterial (payload) {
      if (payload) {
        this.material.push(payload)
      }
      this.showMaterialCreateScreen = false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
