<template>
  <Screen @close="$emit('close')">

    <template #title>Create New Part</template>

    <template #actions>
      <Button text @click="$refs.form.submitForm()">
        SAVE
      </Button>
    </template>

    <template #content>
      <PartForm ref="form" @close="updateParts">
      </PartForm>
    </template>

  </Screen>
</template>

<script>
import PartForm from './PartForm'

export default {
  components: {
    PartForm
  },
  methods: {
    updateParts (payload) {
      this.$emit('close', payload)
    }
  }
}
</script>

<style lang="css" scoped>
</style>
