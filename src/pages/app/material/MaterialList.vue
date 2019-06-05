<template>
  <div>
    <List>

      <!-- Main List -->
      <template #fab>
        <ButtonFab @click="showMaterialCreateScreen = true">
          +
        </ButtonFab>
      </template>

      <template #content>
        <div v-if="material.length > 0">
          <div v-for="material in filtered"
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
  </div>

</template>

<script>
import MaterialItem from './MaterialItem'
import MaterialFilter from './MaterialFilter'
import MaterialCreateScreen from './MaterialCreateScreen'

export default {
  components: {
    MaterialItem,
    MaterialFilter,
    MaterialCreateScreen
  },
  props: ['material'],
  data () {
    return {
      filter: {},
      showMaterialCreateScreen: false
    }
  },
  computed: {
    filtered () {
      return this.material.filter(this.filterItems)
    }
  },
  methods: {
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
