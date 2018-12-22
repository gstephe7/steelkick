<template>
  <div id="material-edit">

    <router-link :to="{ name: 'Inventory' }">< Back to Inventory</router-link>

    <h3>Edit Material</h3>

    <NewMaterial btnText="Update"
                 :edit="true"
                 :item="item">
    </NewMaterial>

  </div>
</template>

<script>
import NewMaterial from '@/components/material/NewMaterial'

export default {
  components: {
    NewMaterial
  },
  data () {
    return {
      item: this.$route.query.item
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #material-edit {
    max-width: 700px;
    margin: auto;
    padding: 10px;
  }

  h3 {
    text-align: center;
    margin-top: 50px;
  }
</style>
