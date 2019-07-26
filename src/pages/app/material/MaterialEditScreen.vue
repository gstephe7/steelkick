<template>
  <Screen @close="$emit('close')">

    <template #title>
      Edit Material
    </template>

    <template #actions>
      <Button text @click="submit">SAVE</Button>
    </template>

    <template #content>
      <MaterialForm :edit="edit"
                    ref="materialForm"
                    @close="$emit('close')">
      </MaterialForm>

      <hr>

      <div class="div center">
        <Button outline delete @click="showDelete = true">
          DELETE
        </Button>
      </div>

      <Modal v-if="showDelete" @close="showDelete = false">
        <template #title>
          Delete Material Entry
        </template>
        <template #content>
          Are you sure you want to delete this item from the inventory?
        </template>
        <template #actions>
          <Button text @click="showDelete = false">
            CANCEL
          </Button>
          <Button text delete @click="deleteMaterial">
            DELETE
          </Button>
        </template>
      </Modal>
    </template>

  </Screen>
</template>

<script>
import MaterialForm from './MaterialForm'
import api from '@/api/api'

export default {
  components: {
    MaterialForm
  },
  props: ['edit'],
  data () {
    return {
      showDelete: false
    }
  },
  methods: {
    submit () {
      this.$refs.materialForm.submit()
    },
    deleteMaterial () {
      api.delete(`/material/${this.edit._id}`, res => {
        this.$store.dispatch('action', {
          materialDescription: `${this.edit.shape}${this.edit.dimension} ${this.edit.length.toFixed(2)}"`,
          action: 'deleted',
          description: 'from the inventory',
          quantity: this.edit.quantity
        })
        this.$store.dispatch('snackbar', 'Deleted item from the inventory')
        this.$router.push('dashboard')
        setTimeout(() => {
          this.$router.push('inventory')
        }, 10)
      }, 'load')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
