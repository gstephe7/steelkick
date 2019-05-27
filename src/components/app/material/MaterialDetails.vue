<template>
  <Details @close="$emit('close')">

    <template #title>
      {{ material.shape }} {{ material.dimension }}
    </template>

    <template #content>
      
    </template>

  </Details>
</template>

<script>
export default {
  props: ['material']
}
</script>

<style lang="scss" scoped>
</style>
