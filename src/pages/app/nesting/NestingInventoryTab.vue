<template>
  <List>
    <template #content>
      <div v-for="nest in updatedSecondaryNest">
        <NestingItem :nest="nest"
                     inventory
                     secondary
                     @confirm="useNest">
        </NestingItem>
      </div>
      <div v-for="nest in updatedFinalNest">
        <NestingItem :nest="nest"
                     inventory>
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
  props: {
    parts: Array
  },
  data () {
    return {
      inventory: [],
      finalNest: [],
      secondaryNest: []
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
    },

    // updated nest with multiple quantities
    updatedFinalNest () {
      let newNest = this.combineNest(this.finalNest)

      return newNest
    },

    updatedSecondaryNest () {
      let newNest = this.combineNest(this.secondaryNest)

      return newNest
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
      } else if (item.shape == 'PIPE' || item.shape == 'PL' || item.shape == 'RB' || item.shape == 'SB') {
        return {
          dimension: item.dimension,
          size: item.dimension
        }
      } else if (item.shape == 'FB') {
        let x = item.dimension.indexOf('x')
        return {
          dimension: item.dimension.slice(x + 1),
          size: parseFloat(item.dimension.slice(0, x))
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

          let newNest = this.nestMaterial(material, matchingParts)

          this.finalNest.push(newNest)

          this.removeItems(material, newNest.parts)

        }

      })

      this.secondNest()

    },

    // if no exact matches are found for the first nest on each inventory item, then this will find parts close in size
    secondNest () {

      this.expandedInventory.forEach(material => {

        let materialDimension = this.dimension(material)

        let matchingParts = this.expandedParts.filter(part => {
          let partDimension = this.dimension(part)
          if (part.shape == material.shape && part.length < material.length && partDimension.dimension == materialDimension.dimension && partDimension.size <= materialDimension.size) {
            return true
          }
        })

        if (matchingParts.length > 0) {

          let newNest = this.nestMaterial(material, matchingParts)

          this.secondaryNest.push(newNest)

        }

      })

    },


    nestMaterial (material, parts) {

      let currentCombo = {
        material: material,
        parts: [],
        drop: material.length
      }

      parts.forEach((part, index) => {

        let newCombo = {
          quantity: 1,
          material: material,
          parts: [{
            quantity: 1,
            part: part
          }],
          drop: material.length - part.length
        }

        function addPart (start, array) {
          for (var i = start; i < array.length; i++) {
            if (i != index) {
              let newDrop = newCombo.drop - array[i].length
              if (newDrop >= 0) {
                newCombo.parts.push({
                  part: array[i],
                  quantity: 1
                })
                newCombo.drop = newDrop
                addPart(i + 1, array)
              } else {
                return
              }
            }
          }
        }

        addPart(0, parts)

        if (newCombo.drop < currentCombo.drop) {
          currentCombo = newCombo
        }

      })

      return currentCombo

    },


    removeItems (material, parts) {

      let materialIndex = this.inventory.findIndex(item => {
        return item._id == material._id
      })

      if (this.inventory[materialIndex].quantity > 1) {
        this.inventory[materialIndex].quantity -= 1
      } else {
        this.inventory.splice(materialIndex, 1)
      }

      parts.forEach(item => {
        let partIndex = this.parts.findIndex(value => {
          return item.part._id == value._id
        })
        if (partIndex != -1) {
          if (this.parts[partIndex].quantity > 1) {
            this.parts[partIndex].quantity -= 1
          } else {
            this.parts.splice(partIndex, 1)
          }
        }
      })

    },


    useNest (payload) {
      this.finalNest.unshift(payload)

      let secondaryIndex = this.secondaryNest.findIndex(item => {
        if (item.material._id == payload.material._id && item.drop == payload.drop) {
          return true
        }
      })

      this.secondaryNest.splice(secondaryIndex, 1)

      this.removeItems(payload.material, payload.parts)

      this.$store.dispatch('snackbar', 'New nest created!')
    },


    combineNest (nest) {

      let newNest = nest

      function multNests () {

        newNest.forEach((item, index) => {

          if (item.parts.length > 1) {

            function multParts () {
              for (var i = 1; i < item.parts.length; i++) {
                if (item.parts[i].part.minorMark == item.parts[i - 1].part.minorMark) {
                  item.parts[i - 1].quantity += 1
                  item.parts.splice(i, 1)
                  multParts()
                }
              }
            }

            multParts()

          }

          if (index > 0 && item.material._id == newNest[index - 1].material._id) {

            let match = true

            item.parts.forEach((part, x) => {
              if (part.part.minorMark != newNest[index - 1].parts[x].part.minorMark) {
                match = false
              }
            })

            if (match) {
              newNest[index - 1].quantity += 1
              newNest.splice(index, 1)
              multNests()
            }

          }

        })

      }

      multNests()

      return newNest

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
        this.nest()
        this.$emit('newNest', this.updatedFinalNest)
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
