<template>
  <div>

    <List search @searching="searching" :searchString="search">

      <template #fab>
        <ButtonFab @click="showScreen = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="newNests.length > 0">
          <div v-for="nest in searchedNests">
            <NestingItem :nest="nest"></NestingItem>
          </div>
        </div>

        <!-- <div v-if="nests.length > 0">

        </div> -->

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
      newNests: [],
      search: ''
    }
  },
  computed: {
    searchedNests () {
      if (this.search) {
        return this.newNests.filter(item => {
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
        return this.newNests
      }
    }
  },
  methods: {
    newNest (payload) {
      this.newNests.push(payload)
    },
    searching (payload) {
      this.search = payload
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
