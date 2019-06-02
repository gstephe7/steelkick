<template>
  <Screen @close="$emit('close')">

    <template #title>
      Edit Material
    </template>

    <template #actions>
      <button class="text" @click="submit">SAVE</button>
    </template>

    <template #content>
      <MaterialForm :edit="material"
                    ref="materialForm"
                    @close="$emit('close')">
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
  props: ['material'],
  data () {
    return {
      save: false
    }
  },
  methods: {
    submit () {
      this.$refs.materialForm.submit()
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
