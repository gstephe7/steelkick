<template>
  <div>

    <Item>

      <template #title>
        <div :class="{ secondary : secondary }">
          {{ nest.quantity }} {{ nest.material.shape }} {{ nest.material.dimension }}
        </div>
        <div>
          {{ materialLength }}
        </div>
      </template>

      <template #second>
        <div>
          <div v-for="part in parts">
            ({{ part.quantity }}) {{ part.part.minorMark }} @ {{ partLength(part.part) }} <span v-if="secondary" class="secondary">({{ part.part.shape }} {{ part.part.dimension }})</span>
          </div>
        </div>
      </template>

      <template #third>
        <div>
          <div v-if="secondary">
            Requires Confirmation!
          </div>
        </div>
        <div>
          Drop: {{ dropLength }}
        </div>
      </template>

      <template #details>
        <div class="between">
          <div>
            <span v-if="inventory">
              In Stock
            </span>
          </div>
          <div>
            Heat:
            <span v-if="nest.material.heat">
              {{ nest.material.heat }}
            </span>
            <span v-else>
              N/A
            </span>
          </div>
        </div>
        <div class="between">
          <div>
            <span v-if="nest.material.location">
              Location: {{ nest.material.location }}
            </span>
          </div>
          <div>
            {{ weight }} lbs
          </div>
        </div>
      </template>

      <template #actions>
        <div v-if="secondary">
          <Button text @click="$emit('confirm', nest)">
            CONFIRM NEST
          </Button>
        </div>
        <div>
          <Button text delete>
            DELETE NEST
          </Button>
        </div>
      </template>

    </Item>

  </div>
</template>

<script>
import method from '@/global/methods.js'

export default {
  props: {
    nest: Object,
    secondary: Boolean,
    inventory: Boolean
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
    },
    weight () {
      let newWeight = parseFloat(this.nest.material.weightPerFoot) * parseFloat(this.nest.material.length / 12) * parseFloat(this.nest.quantity)
      return Math.ceil(newWeight)
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
  .secondary {
    background-color: #ffdd00;
  }
</style>
