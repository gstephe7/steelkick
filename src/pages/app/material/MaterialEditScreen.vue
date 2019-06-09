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
