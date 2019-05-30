<template>
  <div>

    <div @click="showScreen = true">
      <Item class="click">

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

        <template #third>
          <span>
            <span v-if="material.domestic">Domestic</span>
            <span v-else>Foreign</span>
          </span>
          <span :style="`backgroundColor: ${condition.background}`">
            {{ condition.condition }}
          </span>
        </template>

      </Item>
    </div>

    <MaterialScreen v-if="showScreen" :material="material" @close="showScreen = false"></MaterialScreen>

  </div>
</template>

<script>
import api from '@/api/api'
import method from '@/global/methods.js'
import MaterialScreen from './MaterialScreen'

export default {
  components: {
    MaterialScreen
  },
  props: ['material'],
  data () {
    return {
      showScreen: false
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
    useMaterial () {
      api.post('/material/use-material', {
        materialId: this.material._id,
        quantityUsed: this.materialUsed
      }, (res) => {
        document.body.scrollTop = 0
        document.documentElement.scrollTop = 0
        this.$store.dispatch('action', {
          material: this.material._id,
          materialDescription: `${this.material.shape} ${this.material.dimension} ${this.material.length}"`,
          action: 'picked',
          description: 'from the inventory',
          quantity: this.materialUsed
        })
        let pieces = ''
        if (this.materialUsed > 1) {
          pieces = 'pieces'
        } else {
          pieces = 'piece'
        }
        this.$store.dispatch('snackbar', `Successfully removed ${this.materialUsed} ${pieces}!`)
        this.material.quantity = this.material.quantity - this.materialUsed
      })
    },
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
  @import '@/assets/scss/variables.scss';
</style>
