<template>
  <Screen @close="$emit('close')">

    <template #title>
      {{ material.shape }} {{ material.dimension }}
    </template>

  </Screen>
</template>

<script>
export default {
  props: ['material']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
