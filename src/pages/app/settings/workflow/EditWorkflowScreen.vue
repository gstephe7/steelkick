<template>
  <Screen @close="$emit('close')">

    <template #title>
      Configure Workflow
    </template>

    <template #actions>
      <Button text @click="submit">
        SAVE
      </Button>
    </template>

    <template #content>

      <!-- List -->
      <List>

        <template #fab>
          <ButtonFab extended @click="showModal = true">
            + ADD STEP
          </ButtonFab>
        </template>

        <template #content>

          <div v-if="workflow.length > 0">
            <Item v-for="(item, index) in workflow" :key="item.description">

              <template v-slot:thumbnail>
                <img :src="require(`@/assets/img/actions/${item.description}.png`)" :alt="item.action">
              </template>

              <template v-slot:title>
                <div>
                  <span>{{ item.action }}</span>
                </div>
                <div>
                  <icon class="small click blue" icon="arrow-up" @click="moveAction(index, -1, item)">
                  </icon>
                  <icon class="small click blue" icon="arrow-down" @click="moveAction(index, +1, item)">
                  </icon>
                  <icon class="small click red" icon="times" @click="removeItem(index)">
                  </icon>
                </div>
              </template>

              <template v-slot:metadata>
                {{ index + 1 }}
              </template>

            </Item>
          </div>

          <div v-else>
            <p col>Add a workflow step to begin tracking job and part progress</p>
          </div>

        </template>
      </List>

      <!-- Modal -->
      <Modal v-if="showModal" @close="showModal = false">
        <template v-slot:title>
          Select a New Action
        </template>
        <template v-slot:content>
          <div v-for="item in remainingActions" :key="item.description" @click="addAction(item)">
            <Item class="click">
              <template v-slot:thumbnail>
                <img :src="require(`@/assets/img/actions/${item.description}.png`)" :alt="item.action">
              </template>
              <template v-slot:title>
                {{ item.action }}
              </template>
            </Item>
          </div>
        </template>
      </Modal>

    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      workflow: [],
      actions: [
        { action: 'Ordering', description: 'Ordered' },
        { action: 'Receiving', description: 'Received' },
        { action: 'Cutting', description: 'Cut' },
        { action: 'Punching', description: 'Punched' },
        { action: 'Forming', description: 'Formed' },
        { action: 'Fitting', description: 'Fitted' },
        { action: 'Checking', description: 'Checked' },
        { action: 'Welding', description: 'Welded' },
        { action: 'Grinding', description: 'Grinded' },
        { action: 'Inspecting', description: 'Inspected' },
        { action: 'Painting', description: 'Painted' },
        { action: 'Shipping', description: 'Shipped' },
        { action: 'Delivery', description: 'Delivered' },
        { action: 'Erecting', description: 'Erected' }
      ],
      showModal: false,
    }
  },
  computed: {
    remainingActions () {
      let actions = []

      this.actions.forEach(item => {
        let used = false
        this.workflow.forEach(value => {
          if (item.description == value.description) {
            used = true
          }
        })
        if (used == false) {
          actions.push(item)
        }
      })

      return actions
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/users/workflow`, {
      params: {
        companyId: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      res.data.workflow.forEach(item => {
        this.workflow.push(item)
        this.actions.forEach((action, index) => {
          if (action.action == item.action) {
            this.actions.splice(index, 1)
          }
        })
      })
    })
  },
  methods: {
    addAction (action) {
      this.showModal = false
      this.workflow.push(action)
      this.actions.forEach((item, index) => {
        if (item.description == action.description) {
          this.actions.splice(index, 1)
        }
      })
    },
    moveAction (index, number, item) {
      let newIndex = index + number
      let array = this.workflow
      if (newIndex >= 0 && newIndex < this.workflow.length) {
        array.splice(index, 1)
        array.splice(newIndex, 0, item)
        this.workflow = array
      }
    },
    removeItem (index) {
      this.actions.push(this.workflow[index])
      this.workflow.splice(index, 1)
    },
    submit () {
      this.$store.dispatch('loading')
      this.workflow.forEach((item, index) => {
        item.order = index + 1
      })
      api.axios.post(`${api.baseUrl}/users/edit-workflow`, {
        companyId: this.$store.getters.companyId,
        workflow: this.workflow
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$emit('close')
        this.$router.push('/settings')
        this.$store.dispatch('snackbar', 'Successfully updated your workflow!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
