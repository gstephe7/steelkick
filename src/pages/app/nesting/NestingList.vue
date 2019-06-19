<template>
  <div>

    <List>

      <template #fab>
        <ButtonFab @click="showScreen = true">
          +
        </ButtonFab>
      </template>

      <template #content>

        <div v-if="nests.length > 0">

        </div>

        <div v-else class="col">
          You haven't nested this job yet
        </div>

      </template>

    </List>

    <NestingScreen v-if="showScreen"
                   @close="showScreen = false">
    </NestingScreen>

  </div>
</template>

<script>
import NestingScreen from './NestingScreen'

export default {
  props: {
    nests: Array
  },
  components: {
    NestingScreen
  },
  data () {
    return {
      showScreen: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
