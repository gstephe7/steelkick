<template>
  <div>

    <Screen @close="$emit('close')">

      <template #title>Part Log</template>

      <template #actions>
        <Button text @click="$emit('close')">
          SAVE
        </Button>
      </template>

      <template #content>

        <List>

          <template #fab>
            <ButtonFab @click="showModal = true">
              +
            </ButtonFab>
          </template>

          <template #content>
            <div v-for="action in log">
              {{ action }}
            </div>
          </template>

        </List>

      </template>

    </Screen>

    <PartLogModal v-if="showModal"
                  :workflow="workflow"
                  :part="part"
                  @close="showModal = false">
    </PartLogModal>

  </div>
</template>

<script>
import api from '@/api/api'
import PartLogModal from './PartLogModal'

export default {
  props: {
    part: Object,
    workflow: Array
  },
  components: {
    PartLogModal
  },
  data () {
    return {
      log: [],
      showModal: false
    }
  },
  methods: {

  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/actions/part-actions',
      load: true,
      data: {
        partId: this.part._id
      },
      res: res => {
        console.log(res.data)
        this.log = res.data.actions
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
