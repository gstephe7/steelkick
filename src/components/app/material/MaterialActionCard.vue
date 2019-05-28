<template>
  <Card>

    <template #title>
      Actions
    </template>

    <template #content>
      <div v-for="action in actions" :key="action._id">
        <MaterialActionItem :action="action"></MaterialActionItem>
      </div>
    </template>

    <template #actions>
      <div v-if="actions.length > 2">
        <button class="text small">View More</button>
      </div>
    </template>

  </Card>
</template>

<script>
import api from '@/api/api'
import MaterialActionItem from './MaterialActionItem'

export default {
  components: {
    MaterialActionItem
  },
  props: ['materialId'],
  data () {
    return {
      actions: []
    }
  },
  created () {
    api.get('/actions/material-actions', {
      materialId: this.materialId
    }, res => {
      this.actions = res.data.actions
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
