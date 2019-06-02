<template>
  <Modal @close="$emit('close')">

    <template #title>
      Use Material
    </template>

    <template #content>
      <div class="col">
        <InputNumber v-model="materialUsed" :max="material.quantity">
        </InputNumber>
      </div>
    </template>

    <template #actions>
      <Button text @click="$emit('close')">
        CANCEL
      </Button>
      <Button text @click="useMaterial">
        USE {{ materialUsed }}
      </Button>
    </template>

  </Modal>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['material'],
  data () {
    return {
      materialUsed: 1
    }
  },
  methods: {
    useMaterial () {
      api.post('/material/use-material', {
        materialId: this.material._id,
        quantityUsed: this.materialUsed
      }, (res) => {
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
        this.$emit('close')
        setTimeout(() => {
          location.reload(true)
        }, 3000)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
