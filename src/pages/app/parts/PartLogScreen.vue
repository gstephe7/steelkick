<template>
  <div>

    <Screen @close="$emit('close')">

      <template #title>Part Log</template>

      <template #content>

        <List>

          <template #fab>
            <ButtonFab @click="showModal = true">
              +
            </ButtonFab>
          </template>

          <template #content>
            <div v-for="action in log">
              <Item>
                <template #title>
                  {{ action.description }}
                </template>
                <template #second>
                  <span>
                    Quantity: {{ action.quantity }}
                  </span>
                  <span>
                    {{ action.user.firstName }} {{ action.user.lastName }}
                  </span>
                </template>
                <template #third>
                  <span>{{ action.time }}</span>
                  <span>{{ action.date }}</span>
                </template>
              </Item>
            </div>
          </template>

        </List>

      </template>

    </Screen>

    <PartLogModal v-if="showModal"
                  :workflow="workflow"
                  :part="part"
                  @close="updateLog">
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
    updateLog (payload) {
      if (payload) {
        this.log.unshift(payload)

        let actionIndex = null

        this.part.progress.forEach((item, index) => {
          if (item.description == payload.description) {
            actionIndex = index
          }
        })

        if (actionIndex == null) {
          this.part.progress.push({
            description: payload.description,
            quantity: parseFloat(payload.quantity)
          })
        } else {
          this.part.progress[actionIndex].quantity += parseFloat(payload.quantity)
        }

      }

      this.showModal = false
    }
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
        this.log = res.data.actions.reverse()
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
