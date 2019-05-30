<template>
  <List>

    <!-- Main List -->

    <template #actions>
      <button class="green"
              @click="$router.push('/add-material')">
        + Add New Material
      </button>
    </template>

    <template #content>
      <hr>
      <div v-if="material.length > 0">
        <div v-for="material in filtered"
             :key="material._id">
          <MaterialItem :material="material">
          </MaterialItem>
          <hr>
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
</template>

<script>
import MaterialItem from './MaterialItem'
import MaterialFilter from './MaterialFilter'

export default {
  components: {
    MaterialItem,
    MaterialFilter
  },
  props: ['material'],
  data () {
    return {
      filter: {},
      showScreen: false
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
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
