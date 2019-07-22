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
            ({{ part.quantity }}) {{ part.part.minorMark }} @ {{ partLength(part.part) }}
          </div>
        </div>
      </template>

      <template #third>
        <div>
          <span v-if="inventory">
            In Stock
          </span>
        </div>
        <div>
          Drop: {{ dropLength }}
        </div>
      </template>

      <template #details>
        <div class="between">
          <div>
            <span v-if="nest.material.inventory">
              <span v-if="nest.material.domestic">
                Domestic
              </span>
              <span v-else>
                Unknown/Foreign
              </span>
            </span>
          </div>
          <div>
            Heat: {{ nest.material.heat || 'N/A' }}
          </div>
        </div>
        <div class="between">
          <div>
            <span v-if="nest.material.inventory">
              Location: {{ nest.material.location || 'N/A' }}
            </span>
          </div>
          <div>
            {{ weight }} lbs
          </div>
        </div>
        <div class="between">
          <div v-if="nest.material.inventory">
            Remarks:
            <span v-if="nest.material.galvanized">
              Galv.
            </span>
            <span v-else-if="nest.material.primed">
              Primed
            </span>
            <span v-else-if="nest.material.condition">
              {{ nest.material.condition }} condition
            </span>
            <span v-if="nest.material.remarks">
              {{ nest.material.remarks }}
            </span>
          </div>
        </div>
      </template>

      <template #actions>
        <div v-if="inventory">
          <Button text @click="$emit('confirm')">
            CONFIRM NEST
          </Button>
        </div>
        <div>
          <Button text delete @click="removeNest">
            DELETE NEST
          </Button>
        </div>
      </template>

    </Item>

  </div>
</template>

<script>
import api from '@/api/api'
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
    },
    removeNest () {
      api.request({
        type: 'delete',
        endpoint: `/nest/${this.nest._id}`,
        res: res => {}
      })
      this.$emit('remove')
      this.$store.dispatch('snackbar', 'Nest successfully removed!')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
