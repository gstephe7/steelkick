<template>
  <Screen @close="$emit('close')">

    <template #title>
      User Log - {{ user.firstName }} {{ user.lastName }}
    </template>

    <template #content>
      <List>

        <template #content>

          <div v-for="item in updatedActions">
            <Item>
              <template #title>
                {{ item.task }}
              </template>
              <template #second>
                <div>
                  {{ item.target }}
                </div>
                <div>
                  Quantity: {{ item.quantity }}
                </div>
              </template>
              <template #third>
                <div>
                  {{ item.time }}
                </div>
                <div>
                  {{ item.date }}
                </div>
              </template>
            </Item>
          </div>

        </template>

      </List>
    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'

export default {
  props: {
    user: Object
  },
  data () {
    return {
      actions: []
    }
  },
  computed: {
    updatedActions () {
      let newActions = this.actions.map(item => {
        if (item.description.includes('inventory')) {
          const inventory = item.action.charAt(0).toUpperCase() + item.action.slice(1)
          item.task = `${inventory} Inventory`
          item.target = item.materialDescription
        } else {
          item.task = item.description
          item.target = item.part.minorMark
        }
        return item
      })
      return newActions
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: `/actions/user/${this.user._id}`,
      load: true,
      res: res => {
        this.actions = res.data.actions
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
