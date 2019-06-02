<template>
  <div>

    <Item>

      <template #title>
        <span>
          {{ material.shape }} {{ material.dimension }}
        </span>
      </template>

      <template #second>
         <span>
           {{ feet }}'
           {{ inches }}"
           {{ fraction }}
         </span>
         <span>
           {{ material.quantity }} available
         </span>
      </template>

      <!-- expandable details -->
      <template #details>
        <div class="between">
          <span>
            <span v-if="material.domestic">Domestic</span>
            <span v-else>Foreign</span>
          </span>
          <span :style="`backgroundColor: ${condition.background}`">
            {{ condition.condition }}
          </span>
        </div>
        <div class="between">
          <span v-if="material.grade">
            {{ material.grade }}
          </span>
          <span v-if="material.heat">
            Heat #: {{ material.heat }}
          </span>
        </div>
        <div v-if="material.location" class="row">
          <div class="half">
            Location: {{ material.location }}
          </div>
        </div>
        <div v-if="material.remarks" class="row">
          <div class="half">
            Remarks: {{ material.remarks }}
          </div>
        </div>
      </template>

      <template #actions>
        <div class="col start">
          <button class="text" @click="showUseModal = true">
            USE MATERIAL
          </button>
          <button class="text" @click="showEditScreen = true">
            EDIT MATERIAL
          </button>
          <button class="text" @click="showHistoryScreen = true">
            MATERIAL HISTORY
          </button>
        </div>
      </template>

    </Item>

    <MaterialUseModal v-if="showUseModal"
                      @close="showUseModal = false"
                      :material="material">
    </MaterialUseModal>

    <MaterialEditScreen v-if="showEditScreen"
                        :material="material"
                        @close="showEditScreen = false">
    </MaterialEditScreen>

    <MaterialHistoryScreen v-if="showHistoryScreen"
                           :materialId="material._id"
                           @close="showHistoryScreen = false">
    </MaterialHistoryScreen>

  </div>
</template>

<script>
import api from '@/api/api'
import method from '@/global/methods.js'
import MaterialUseModal from './MaterialUseModal'
import MaterialEditScreen from './MaterialEditScreen'
import MaterialHistoryScreen from './MaterialHistoryScreen'

export default {
  components: {
    MaterialUseModal,
    MaterialEditScreen,
    MaterialHistoryScreen
  },
  props: ['material'],
  data () {
    return {
      showUseModal: false,
      showEditScreen: false,
      showHistoryScreen: false
    }
  },
  computed: {
    feet () {
      return method.getFeet(this.material.length)
    },
    inches () {
      return method.getInches(this.material.length)
    },
    fraction () {
      return method.getFraction(this.material.length)
    },
    condition () {
      if (this.material.galvanized) {
        return {
          condition: 'Galvanized',
          background: 'rgba(215, 219, 226, .3)'
        }
      } else if (this.material.primed) {
        return {
          condition: 'Primed',
          background: 'rgba(129, 129, 145, .3)'
        }
      } else if (this.material.condition == 'Excellent') {
        return {
          condition: 'Excellent',
          background: 'rgba(64, 191, 128, .2)'
        }
      } else if (this.material.condition == 'Good') {
        return {
          condition: 'Good',
          background: 'rgba(171, 191, 64, .25)'
        }
      } else if (this.material.condition == 'Fair') {
        return {
          condition: 'Fair',
          background: 'rgba(247, 183, 51, .25)'
        }
      } else if (this.material.condition == 'Poor') {
        return {
          condition: 'Poor',
          background: 'rgba(255, 82, 82, .25)'
        }
      } else {
        return {}
      }
    }
  },
  methods: {
    deleteMaterial () {
      api.delete('/material/delete-material', {
        materialId: this.material._id
      }, res => {
        this.showDelete = false
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.$store.dispatch('action', {
          material: this.material._id,
          materialDescription: `${this.material.shape} ${this.material.dimension} ${this.material.length}"`,
          action: 'deleted',
          description: 'from the inventory',
          quantity: this.material.quantity
        })
        this.$store.dispatch('snackbar', `Successfully deleted material!`)
        .then(() => {
          location.reload(true)
        })
      }, 'load')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>