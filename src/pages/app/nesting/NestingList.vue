<template>
  <div>

    <List>

      <template #fab>
        <ButtonFab @click="showScreen = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="newNests.length > 0">
          <div v-for="nest in newNests">
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
      newNests: []
    }
  },
  methods: {
    newNest (payload) {
      this.newNests.push(payload)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
