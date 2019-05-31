<template>
  <Screen @close="$emit('close')">

    <template #title>
      Edit Material
    </template>

    <template #actions>
      <button class="text" @click="submit">SAVE</button>
    </template>

    <template #content>
      <MaterialForm :edit="material"></MaterialForm>
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
      console.log(this)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
