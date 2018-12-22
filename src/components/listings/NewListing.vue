<template>
  <div id="new-listing">

    <h2>Create New Listing</h2>

    <NewMaterial btnText="List New Material"></NewMaterial>

  </div>
</template>

<script>
import NewMaterial from '@/components/material/NewMaterial'

export default {
  components: {
    NewMaterial
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #new-listing {
    padding: 10px;
    max-width: 670px;
    margin: auto;
  }
</style>
