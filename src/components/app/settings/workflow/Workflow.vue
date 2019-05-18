<template>
  <div main>



    <!-- Title -->
    <div class="title">
      <h1>
        Company Workflow
      </h1>
      <p>
        Your company's workflow determines each step in the steel fabrication process. SteelKick allows you to customize your company's workflow and decide when parts will be "checked off" in the app - this allows you to keep track of the progress of each part and the overall progress of each job.
      </p>
    </div>



    <!-- List -->
    <List>

      <template v-slot:header>
        Company Workflow
      </template>

      <template v-slot:actions>
        <button class="blue" @click="showModal = true">
          + Add a Step
        </button>
      </template>

      <template v-slot:content>

        <div v-if="workflow.length > 0">
          <Item v-for="(item, index) in workflow" :key="item.description">

            <template v-slot:img>
              <img :src="require(`@/assets/img/actions/${item.description}.png`)" :alt="item.action">
            </template>

            <template v-slot:first>
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

            <template v-slot:index>
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
      <template v-slot:header>
        <h4>Select a New Action</h4>
      </template>
      <template v-slot:content>
        <div v-for="item in remainingActions" :key="item.description" @click="addAction(item)">
          <Item class="click">
            <template v-slot:img>
              <img :src="require(`@/assets/img/actions/${item.description}.png`)" :alt="item.action">
            </template>
            <template v-slot:first>
              {{ item.action }}
            </template>
          </Item>
        </div>
      </template>
    </Modal>



    <!-- Save Changes -->
    <Banner v-if="changed" @save="submit"></Banner>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      original: [],
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
    changed () {
      let changes = false

      if (this.workflow.length != this.original.length) {
        changes = true
      } else {
        this.workflow.forEach((item, index) => {
          if (item.description != this.original[index].description) {
            changes = true
          }
        })
      }

      return changes
    },
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
  beforeCreate () {
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
        this.original.push(item)
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
        id: this.$store.getters.companyId,
        workflow: this.workflow
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('/workflow-confirmation')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
