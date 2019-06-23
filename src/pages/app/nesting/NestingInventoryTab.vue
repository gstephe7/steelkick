<template>
  <List>
    <template #content>
      <div v-for="nest in finalNest">
        <NestingItem :nest="nest">
        </NestingItem>
      </div>
      <!-- <div v-for="match in inventoryUse">
        <NestingItem :nest="match"
                     @confirm="useNest">
        </NestingItem>
      </div> -->
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

    // all items with multiple quantities are expanded
    expandedInventory () {
      let multInventory = []

      this.inventory.forEach(item => {
        if (item.quantity > 1) {
          for (var i = 0; i < item.quantity; i++) {
            multInventory.push(item)
          }
        } else {
          multInventory.push(item)
        }
      })

      return multInventory.sort((a, b) => {
        return a.length - b.length
      })
    },

    // all parts with multiple quantities are expanded
    expandedParts () {
      let multParts = []

      this.parts.forEach(part => {
        if (part.quantity > 1) {
          for (var i = 0; i < part.quantity; i++) {
            multParts.push(part)
          }
        } else {
          multParts.push(part)
        }
      })

      return multParts.sort((a, b) => {
        return b.length - a.length
      })
    }
  },
  methods: {

    // modify dimension for matching
    dimension (item) {
      if (item.shape == 'HSS' || item.shape == 'L') {
        let x = item.dimension.lastIndexOf('x')
        return {
          dimension: item.dimension.slice(0, x),
          size: parseFloat(item.dimension.slice(x + 1))
        }
      } else if (item.shape == 'PIPE' || item.shape == 'PL') {
        return {
          dimension: item.dimension,
          size: item.dimension
        }
      } else {
        let x = item.dimension.indexOf('x')
        return {
          dimension: item.dimension.slice(0, x),
          size: parseFloat(item.dimension.slice(x + 1))
        }
      }
    },

    // nest part within available inventory
    nest () {

      this.expandedInventory.forEach(material => {

        let matchingParts = this.expandedParts.filter(item => {
          if (item.shape == material.shape && item.dimension == material.dimension && item.length <= material.length) {
            return true
          }
        })

        if (matchingParts.length > 0) {

          let currentCombo = {
            material: material,
            parts: [],
            drop: material.length
          }

          matchingParts.forEach((part, index) => {

            let newCombo = {
              material: material,
              parts: [],
              drop: material.length
            }

            function addPart (start, array) {
              for (var i = start; i < array.length; i++) {
                let newDrop = newCombo.drop - array[i].length
                if (newDrop >= 0) {
                  newCombo.parts.push(array[i])
                  newCombo.drop = newDrop
                  addPart(i + 1, array)
                } else {
                  return
                }
              }
            }

            addPart(index, matchingParts)

            if (newCombo.drop < currentCombo.drop) {
              currentCombo = newCombo
            }

          })

          this.finalNest.push(currentCombo)

          let materialIndex = this.inventory.findIndex(item => {
            return item._id == currentCombo.material._id
          })

          if (this.inventory[materialIndex].quantity > 1) {
            this.inventory[materialIndex].quantity -= 1
          } else {
            this.inventory.splice(materialIndex, 1)
          }

          currentCombo.parts.forEach(part => {
            let partIndex = this.parts.findIndex(item => {
              return item._id == part._id
            })
            if (this.parts[partIndex].quantity > 1) {
              this.parts[partIndex].quantity -= 1
            } else {
              this.parts.splice(partIndex, 1)
            }
          })

        }

      })

    },


    useNest (payload) {
      let inventoryIndex = this.inventory.findIndex(item => {
        return item._id == payload.material._id
      })

      let newNest = payload
      newNest.confirmed = true

      this.finalNest.push(newNest)
      this.inventory.splice(inventoryIndex, 1)

      payload.parts.forEach(part => {
        let partIndex = this.parts.findIndex(item => {
          return item._id == part._id
        })
        this.parts.splice(partIndex, 1)
      })
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

        api.request({
          type: 'get',
          endpoint: '/material/search-material',
          load: true,
          data: {
            company: this.$store.getters.companyId
          },
          res: res => {
            this.inventory = res.data.material

            this.nest()
          },
          err: err => {
            console.log(err)
          }
        })

      },
      err: err => {
        console.log(err)
      }
    })

  }
}
</script>

<style lang="scss" scoped>
</style>
