<template>
  <Screen @close="$emit('close')">

    <template #title>
      Material History
    </template>

    <template #content>

      <List>

        <template #content>
          <div v-for="action in actions" :key="action._id">
            <ActionItem :action="action"></ActionItem>
          </div>
        </template>

      </List>

    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'
import ActionItem from '@/components/app/actions/ActionItem'

export default {
  components: {
    ActionItem
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
    }, 'load')
  }
}
</script>

<style lang="scss" scoped>
</style>
