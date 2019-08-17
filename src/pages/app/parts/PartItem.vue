<template>
  <div>

    <Item :id="part._id">

      <template #title>
        <span :class="{ highlight : complete }">
          {{ part.minorMark }}
        </span>
      </template>

      <template #menu>
        <div v-if="$route.name != 'Working'">
          <Menu horizontal>
            <MenuItem @click="showPartLog = true">
              Part Log
            </MenuItem>
            <MenuItem @click="showPartNest = true">
              View Nest
            </MenuItem>
            <MenuItem @click="showMembers = true">
              View Members
            </MenuItem>
            <MenuItem @click="showPartEdit = true">
              Edit Part
            </MenuItem>
          </Menu>
        </div>
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
        <VisualLine :completed="quantityComplete"
                    :total="part.quantity">
          {{ quantityComplete }}/{{ part.quantity }}
          {{ targetAction }}
        </VisualLine>
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
          <span v-if="part.remarks">{{ part.remarks }}</span>
        </div>
        <div>
          <div class="space row grow">
            <span v-for="action in partProgress" class="grow">
              <ChipProgress :completed="action.quantity"
                            :total="part.quantity">
                  <span>
                    {{ action.quantity }}/{{ part.quantity }}
                  </span>
                  <span>
                    {{ action.description.substring(0, 3) }}
                  </span>
              </ChipProgress>
            </span>
          </div>
        </div>
      </template>

      <template #actions>
        <div v-if="$route.name == 'Working'" class="col">
          <Button text @click="showWorkLog = true">
            MARK {{ $store.getters.currentRole.description }}
          </Button>
        </div>
      </template>

    </Item>

    <PartLogScreen v-if="showPartLog"
                   :part="part"
                   :workflow="workflow"
                   @close="showPartLog = false">
    </PartLogScreen>

    <PartEditScreen v-if="showPartEdit"
                    :part="part"
                    @close="showPartEdit = false"
                    @delete="deletePart">
    </PartEditScreen>

    <PartLogModal v-if="showWorkLog"
                  :part="part"
                  :workflow="workflow"
                  working
                  @close="updatePart">
    </PartLogModal>

    <PartNestScreen v-if="showPartNest"
                    :part="part"
                    @close="showPartNest = false">
    </PartNestScreen>

    <PartMembersScreen v-if="showMembers"
                      :part="part"
                      @close="showMembers = false">
    </PartMembersScreen>

  </div>
</template>

<script>
import method from '@/global/methods.js'
import PartLogScreen from './PartLogScreen'
import PartEditScreen from './PartEditScreen'
import PartLogModal from './PartLogModal'
import PartNestScreen from './PartNestScreen'
import PartMembersScreen from './PartMembersScreen'

export default {
  props: {
    part: Object,
    workflow: Array,
    working: Boolean
  },
  components: {
    PartLogScreen,
    PartEditScreen,
    PartLogModal,
    PartNestScreen,
    PartMembersScreen
  },
  data () {
    return {
      showPartLog: false,
      showPartEdit: false,
      showWorkLog: false,
      showPartNest: false,
      showMembers: false
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
      if (this.$route.name == 'Working') {
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
          quantity = item.quantity
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
            value.quantity += item.quantity
          }
        })
      })

      return progress
    }
  },
  methods: {
    deletePart (payload) {
      this.$emit('delete', payload)
    },
    updatePart (payload) {
      if (payload) {
        let progressIndex = this.part.progress.findIndex(value => {
          return value.description == payload.description
        })

        if (progressIndex >= 0) {
          this.part.progress[progressIndex].quantity += payload.quantity
        } else {
          this.part.progress.push(payload)
        }
      }

      this.showWorkLog = false
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
