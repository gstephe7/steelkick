<template>
  <List>
    <template #content>
      <div v-for="nest in inventoryNest">
        <NestingItem :nest="nest">
        </NestingItem>
      </div>
      <div v-for="match in inventoryUse">
        <NestingItem :nest="match"
                     @confirm="useNest">
        </NestingItem>
      </div>
    </template>
  </List>
</template>

<script>
import api from '@/api/api'
import NestingItem from './NestingItem'

export default {
  components: {
    NestingItem
  },
  data () {
    return {
      inventory: [],
      parts: [],
      finalNest: []
    }
  },
  computed: {
    inventoryUse () {
      let inventoryMatch = []

      this.parts.forEach(part => {
        this.inventory.forEach(item => {
          if (part.shape == item.shape && part.dimension == item.dimension && part.length < item.length) {
            let drop = item.length - part.length
            let nest = {
              material: item,
              part: part,
              drop: drop,
              confirmed: false
            }
            inventoryMatch.push(nest)
          }
        })
      })

      return inventoryMatch
    }
  },
  methods: {
    useNest (payload) {
      let inventoryIndex = this.inventory.findIndex(item => {
        return item._id == payload.material._id
      })

      let partIndex = this.parts.findIndex(item => {
        return item._id == payload.part._id
      })

      let newNest = payload
      newNest.confirmed = true

      this.finalNest.push(newNest)
      this.inventory.splice(inventoryIndex, 1)
      this.parts.splice(partIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
