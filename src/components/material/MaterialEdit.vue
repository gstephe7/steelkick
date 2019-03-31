<template>
  <div main>

    <router-link back :to="{ name: 'Inventory' }">< Back to Inventory</router-link>

    <h1>Edit Material</h1>

    <NewMaterial btnText="Update"
                 :edit="true"
                 :item="item">
    </NewMaterial>

  </div>
</template>

<script>
import api from '@/api/api'
import NewMaterial from '@/components/material/NewMaterial'

export default {
  components: {
    NewMaterial
  },
  data () {
    return {
      item: ''
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
