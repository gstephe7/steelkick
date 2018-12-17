<template>
  <div id="add-material">

    <h3>Add New Material</h3>

    <NewMaterial btnText="Add Material"></NewMaterial>

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

  #add-material {
    padding: 10px;
    max-width: 800px;
    margin: auto;
  }

  h3 {
    text-align: center;
  }
</style>
