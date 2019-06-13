<template>
  <Screen @close="$emit('close')">

    <template #title>Edit Part</template>

    <template #actions>
      <Button text @click="$refs.form.submitForm()">
        SAVE
      </Button>
    </template>

    <template #content>
      <PartForm :edit="part" ref="form" @close="$emit('close')">
      </PartForm>
    </template>

  </Screen>
</template>

<script>
import PartForm from './PartForm'

export default {
  props: {
    part: Object
  },
  components: {
    PartForm
  }
}
</script>

<style lang="css" scoped>
</style>
