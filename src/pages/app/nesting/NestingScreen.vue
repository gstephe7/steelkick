<template>
  <Screen @close="$emit('close')">

    <template #title>
      Nest Job
    </template>

    <template #tabs>
      <Tabs :tabs="tabs" @newTab="changeTab">
      </Tabs>
    </template>

    <template #content>

      <div v-if="currentTab == 0">

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

      </div>

      <div v-else>



      </div>

    </template>

  </Screen>
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
      inventoryNest: [],
      tabs: ['Inventory', 'Purchase'],
      currentTab: 0
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
    changeTab (payload) {
      this.currentTab == payload
    },
    useNest (payload) {
      let inventoryIndex = this.inventory.findIndex(item => {
        return item._id == payload.material._id
      })

      let partIndex = this.parts.findIndex(item => {
        return item._id == payload.part._id
      })

      let newNest = payload
      newNest.confirmed = true

      this.inventoryNest.push(newNest)
      this.inventory.splice(inventoryIndex, 1)
      this.parts.splice(partIndex, 1)
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/material/search-material',
      load: true,
      data: {
        company: this.$store.getters.companyId
      },
      res: res => {
        this.inventory = res.data.material
      }
    })

    api.request({
      type: 'get',
      endpoint: '/jobs/parts',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id
      },
      res: res => {
        this.parts = res.data.parts
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
