<template>
  <div>

    <Screen @close="$emit('close')">

      <template #title>Part Nest</template>

      <template #content>

        <List>

          <template #content>
            <div v-if="nests.length > 0">
              <div v-for="nest in nests">
                <NestingItem :nest="nest"
                             @remove="removeNest(nest._id)">
                </NestingItem>
              </div>
            </div>
            <div v-else>
              This part hasn't been nested yet
            </div>
          </template>

        </List>

      </template>

    </Screen>

  </div>
</template>

<script>
import api from '@/api/api'
import NestingItem from '@/pages/app/nesting/NestingItem'

export default {
  components: {
    NestingItem
  },
  props: {
    part: Object
  },
  data () {
    return {
      nests: []
    }
  },
  methods: {
    removeNest (id) {
      let nestIndex = this.nests.findIndex(value => {
        return value._id == id
      })
      this.nests.splice(nestIndex, 1)
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/nest/part-nests',
      load: true,
      data: {
        partId: this.part._id
      },
      res: res => {
        this.nests = res.data.nests
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
