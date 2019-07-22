<template>
  <div>

    <List search @searching="searching" :searchString="search">

      <template #fab>
        <ButtonFab @click="showScreen = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="nests.length > 0">
          <div v-for="nest in searchedNests" :key="nest._id">
            <NestingItem :nest="nest"
                         @remove="removeNest(nest._id)">
            </NestingItem>
          </div>
        </div>

        <div v-else class="col">
          You haven't nested this job yet
        </div>

      </template>

    </List>

    <NestingScreen v-if="showScreen"
                   @close="showScreen = false"
                   @newNest="newNest">
    </NestingScreen>

  </div>
</template>

<script>
import NestingItem from './NestingItem'
import NestingScreen from './NestingScreen'

export default {
  props: {
    nests: Array
  },
  components: {
    NestingItem,
    NestingScreen
  },
  data () {
    return {
      showScreen: false,
      search: ''
    }
  },
  computed: {
    searchedNests () {
      if (this.search) {
        return this.nests.filter(item => {
          let searchString = this.search.replace(/ /g, '').trim()
          let itemMaterial = `${item.material.shape}${item.material.dimension}`
          let materialMatch = itemMaterial.match(new RegExp(searchString, 'i'))
          let minorMarkMatch = item.parts.some(value => {
            return value.part.minorMark.match(new RegExp(searchString, 'i'))
          })

          if (materialMatch || minorMarkMatch) {
            return true
          }
        })
      } else {
        return this.nests
      }
    }
  },
  methods: {
    newNest (payload) {
      this.nests.push(payload)
    },
    searching (payload) {
      this.search = payload
    },
    removeNest (id) {
      let nestIndex = this.nests.findIndex(value => {
        return value._id == id
      })
      this.nests.splice(nestIndex, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
