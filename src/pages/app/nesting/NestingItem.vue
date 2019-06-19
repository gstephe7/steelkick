<template>
  <div>

    <Item>

      <template #title>
        <div :class="{ confirmed : confirmed }">
          {{ nest.material.shape }} {{ nest.material.dimension }}
        </div>
        <div>
          {{ materialLength }}
        </div>
      </template>

      <template #second>
        <span>{{ nest.part.minorMark }} @ {{ partLength }}</span>
      </template>

      <template #third>
        <span></span>
        <span>Drop: {{ dropLength }}</span>
      </template>

      <template #actions>
        <Button text @click="$emit('confirm', nest)">
          USE NEST
        </Button>
      </template>

    </Item>

  </div>
</template>

<script>
import method from '@/global/methods.js'

export default {
  props: {
    nest: Object
  },
  computed: {
    materialLength () {
      return method.getLength(this.nest.material.length)
    },
    partLength () {
      return method.getLength(this.nest.part.length)
    },
    dropLength () {
      return method.getLength(this.nest.drop)
    },
    confirmed () {
      return this.nest.confirmed
    }
  }
}
</script>

<style lang="scss" scoped>
  .confirmed {
    background-color: #eeff00;
  }
</style>
