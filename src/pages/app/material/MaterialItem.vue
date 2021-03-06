<template>
  <div>

    <Item>

      <template #title>
        <span>
          {{ material.shape }} {{ material.dimension }}
        </span>
      </template>

      <template #menu>
        <Menu horizontal>
          <MenuItem @click="showUseModal = true">
            Use Material
          </MenuItem>
          <MenuItem @click="showHistoryScreen = true">
            Material Log
          </MenuItem>
          <MenuItem @click="showEditScreen = true">
            Edit Material
          </MenuItem>
        </Menu>
      </template>

      <template #second>
         <span>
           {{ feet }}'
           {{ inches }}"
           {{ fraction }}
         </span>
         <span>
           {{ material.quantity }}
           <span v-if="material.galvanized">
             galvanized
           </span>
           <span v-else-if="material.primed">
             primed
           </span>
           <span v-else>
             available
           </span>
         </span>
      </template>

      <!-- expandable details -->
      <template #details>
        <div class="between">
          <span>
            <span v-if="material.domestic">Domestic</span>
            <span v-else>Foreign/Unknown</span>
          </span>
          <span :style="`backgroundColor: ${condition.background}`">
            {{ condition.condition }}
          </span>
        </div>
        <div class="between">
          <span v-if="material.grade">
            {{ material.grade }}
          </span>
          <span>
            {{ Math.ceil(material.weight) }} lbs
          </span>
        </div>
        <div class="between">
          <div v-if="material.location">
            <div class="half">
              Location: {{ material.location }}
            </div>
          </div>
          <span v-if="material.heat">
            Heat #: {{ material.heat }}
          </span>
        </div>
        <div v-if="material.remarks" class="row">
          <div class="half">
            Remarks: {{ material.remarks }}
          </div>
        </div>
      </template>

    </Item>

    <MaterialUseModal v-if="showUseModal"
                      @close="showUseModal = false"
                      :material="material">
    </MaterialUseModal>

    <MaterialEditScreen v-if="showEditScreen"
                        :edit="material"
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
      switch (this.material.condition) {
        case 'Excellent':
          return {
            condition: 'Excellent',
            background: 'rgba(64, 191, 128, .2)'
          }
        case 'Good':
          return {
            condition: 'Good',
            background: 'rgba(171, 191, 64, .25)'
          }
        case 'Poor':
          return {
            condition: 'Poor',
            background: 'rgba(255, 82, 82, .25)'
          }
        default:
          return {
            condition: 'Fair',
            background: 'rgba(247, 183, 51, .25)'
          }
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
