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
        <div>
          <div v-for="part in parts">
            {{ part.minorMark }} @ {{ partLength(part) }}
          </div>
        </div>
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
    parts () {
      return this.nest.parts
    },
    materialLength () {
      return method.getLength(this.nest.material.length)
    },
    dropLength () {
      return method.getLength(this.nest.drop)
    },
    confirmed () {
      return this.nest.confirmed
    }
  },
  methods: {
    partLength (part) {
      return method.getLength(part.length)
    }
  }
}
</script>

<style lang="scss" scoped>
  .confirmed {
    background-color: #eeff00;
  }
</style>
