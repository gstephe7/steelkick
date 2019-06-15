<template>
  <div>

    <Item>

      <template #title>
        <span :class="{ highlight : complete }">
          {{ part.minorMark }}
        </span>
      </template>

      <template #second>
         <span>
           {{ part.shape }} {{ part.dimension }}
         </span>
         <span>
           {{ feet }}'
           {{ inches }}"
           {{ fraction }}
         </span>
      </template>

      <template #third>
        <span>
          Sequence {{ part.sequence }}
        </span>
        <span>
          {{ quantityComplete }}/{{ part.quantity }} {{ targetAction }}
        </span>
      </template>

      <template #details>
        <div class="between">
          <span v-if="part.grade">{{ part.grade }}</span>
          <span>{{ Math.ceil(part.weight) }} lbs</span>
        </div>
        <div>
          Remarks:
          <span v-if="part.galvanized">Galvanized </span>
          <span v-if="part.primed">Primed </span>
        </div>
        <div>
          Progress: 
          <div class="wrap">
            <span v-for="action in partProgress">
              <ChipProgress :completed="action.quantity"
                            :total="part.quantity">
                {{ action.quantity }}/{{ part.quantity }} {{ action.description.substring(0, 3) }}
              </ChipProgress>
            </span>
          </div>
        </div>
      </template>

      <template #actions>
        <Button text @click="showPartLog = true">
          PART LOG
        </Button>
        <Button text @click="showPartEdit = true">
          EDIT PART
        </Button>
      </template>

    </Item>

    <PartLogScreen v-if="showPartLog"
                   :part="part"
                   :workflow="workflow"
                   @close="showPartLog = false">
    </PartLogScreen>

    <PartEditScreen v-if="showPartEdit"
                    :part="part"
                    @close="showPartEdit = false">
    </PartEditScreen>

  </div>
</template>

<script>
import method from '@/global/methods.js'
import PartLogScreen from './PartLogScreen'
import PartEditScreen from './PartEditScreen'

export default {
  props: {
    part: Object,
    workflow: Array,
    working: Boolean
  },
  components: {
    PartLogScreen,
    PartEditScreen
  },
  data () {
    return {
      showPartLog: false,
      showPartEdit: false
    }
  },
  computed: {
    feet () {
      return method.getFeet(this.part.length)
    },
    inches () {
      return method.getInches(this.part.length)
    },
    fraction () {
      return method.getFraction(this.part.length)
    },
    targetAction () {
      if (this.working) {
        return this.$store.getters.currentRole.description
      } else if (this.workflow.length > 0) {
        return this.workflow[this.workflow.length - 1].description
      } else {
        return 'N/A'
      }
    },
    complete () {
      if (this.quantityComplete >= this.part.quantity) {
        return true
      } else {
        return false
      }
    },
    quantityComplete () {
      let quantity = 0

      this.part.progress.forEach(item => {
        if (item.description == this.targetAction) {
          quantity += item.quantity
        }
      })

      return quantity
    },
    partProgress () {
      let progress = []

      this.workflow.forEach(item => {
        progress.push({
          description: item.description,
          quantity: 0,
          total: this.part.quantity
        })
      })

      this.part.progress.forEach(item => {
        progress.forEach(value => {
          if (item.description == value.description) {
            value.quantity = item.quantity
          }
        })
      })

      return progress
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .highlight {
    background-color: #eeff00;
  }
</style>
