<template>
  <Screen @close="$emit('close')">

    <template #title>
      Create New Job
    </template>

    <template #actions>
      <Button text @click="$refs.form.submitForm()">
        SAVE
      </Button>
    </template>

    <template #content>

      <JobForm @close="$emit('close')" ref="form">
      </JobForm>

    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'
import JobForm from './JobForm'

export default {
  components: {
    JobForm
  }
}
</script>

<style lang="scss" scoped>
</style>
