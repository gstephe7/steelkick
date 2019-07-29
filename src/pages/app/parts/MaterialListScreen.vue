<template>
  <Screen @close="$emit('close')">

    <template #title>
      Material List {{ $store.getters.currentJob.number }}
    </template>

    <template #content>

      <List onScreen>

        <template #content>

          <div v-for="item in materialList">
            <Item small>
              <template #title>
                <div>
                  ({{ item.quantity }}) {{ item.shape }} {{ item.dimension }}
                </div>
                <div>
                  {{ item.lengthInFeet }}
                </div>
              </template>
            </Item>
          </div>

        </template>

        <!-- Side Sheet Filter -->
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

  </Screen>
</template>

<script>
import api from '@/api/api'
import lengthMixin from '@/mixins/lengthMixin'
import MaterialFilter from '@/pages/app/material/MaterialFilter'

export default {
  mixins: [lengthMixin],
  components: {
    MaterialFilter
  },
  props: {
    parts: Array
  },
  data () {
    return {
      filter: {}
    }
  },
  computed: {
    filteredParts () {
      return this.parts.filter(this.filterItems)
    },
    materialList () {
      const material = this.filteredParts.reduce((newArray, part) => {
        const lengthInFeet = this.getLength(part.length)

        const exists = newArray.findIndex(value => {
          if (value.shape === part.shape && value.dimension === part.dimension && value.lengthInFeet === lengthInFeet) {
            return true
          } else {
            return false
          }
        })

        if (exists != -1) {
          newArray[exists].quantity += part.quantity
        } else {
          newArray.push({
            shape: part.shape,
            dimension: part.dimension,
            lengthInFeet: lengthInFeet,
            quantity: part.quantity
          })
        }

        return newArray
      }, [])

      const sortedMaterial = material.sort((a, b) => {
        if (b.shape < a.shape) {
          return -1
        } else {
          return 1
        }
      })

      return sortedMaterial
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
