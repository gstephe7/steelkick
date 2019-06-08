<template>
  <Screen @close="$emit('close')">

    <template #title>
      Add New Material
    </template>

    <template #actions>
      <Button text @click="submit">SAVE</Button>
    </template>

    <template #content>
      <MaterialForm ref="materialForm"
                    @close="updateMaterial">
      </MaterialForm>
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
  data () {
    return {
      material: {}
    }
  },
  methods: {
    submit () {
      this.$refs.materialForm.submit()
    },
    updateMaterial (payload) {
      this.material = payload
      this.$emit('close', this.material)
    }
  },
  destroyed () {
    let fab = document.getElementById('fab')
    fab.focus()
  }
}
</script>

<style lang="scss" scoped>
</style>
