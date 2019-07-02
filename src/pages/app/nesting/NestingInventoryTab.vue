<template>
  <List>
    <template #content>
      <div v-for="nest in secondaryNest">
        <NestingItem :nest="nest"
                     inventory
                     secondary
                     @confirm="useNest">
        </NestingItem>
      </div>
      <div v-for="nest in finalNest">
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
      finalNest: [],
      secondaryNest: []
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

    // if no exact matches are found for the first nest on each inventory item, then this will find parts close in size
    secondNest () {

      this.expandedInventory.forEach(material => {

        let materialDimension = this.dimension(material)

        let matchingParts = this.parts.filter(part => {
          let partDimension = this.dimension(part)
          if (part.shape == material.shape && part.length < material.length && partDimension.dimension == materialDimension.dimension && partDimension.size <= materialDimension.size) {
            return true
          }
        })

        if (matchingParts.length > 0) {

          let expandedParts = []

          matchingParts.forEach(part => {
            if (part.quantity > 0) {
              for (let i = 0; i < part.quantity; i++) {
                expandedParts.push(part)
              }
            } else {
              expandedParts.push(part)
            }
          })

          let newNest = this.nestMaterial(material, expandedParts)

          let combinedNest = this.combineNest(newNest)

          this.addSecondaryNest(combinedNest)

        }

      })

    }


  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/jobs/create-nest-inventory',
      load: true,
      data: {
        jobId: this.$store.getters.currentJob._id,
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.finalNest = res.data.nest
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
