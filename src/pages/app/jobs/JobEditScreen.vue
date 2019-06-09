<template>
  <Screen @close="$emit('close')">

    <template #title>Edit Job</template>

    <template #actions>
      <Button text @click="$refs.form.submitForm()">
        SAVE
      </Button>
    </template>

    <template #content>

      <JobForm @close="$emit('close')"
               :edit="job"
               ref="form">
      </JobForm>

    </template>

  </Screen>
</template>

<script>
import JobForm from './JobForm'

export default {
  components: {
    JobForm
  },
  props: {
    job: Object
  }
}
</script>

<style lang="css" scoped>
</style>
