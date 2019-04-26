<template>
  <div main>

    <Back route="Settings">Back to settings</Back>

    <h1>Configure Workflow</h1>

    <hr>

    <div class="mobile">

    </div>

    <div>
      <div row>

        <div grow class="workflow">
          <div col>
            <h2>
              Company Workflow
              <ToolTip>
                Workflow determines each stage of the process at which a part will be checked off. This helps you keep track of the progress of each part and the overall progress of the job.
              </ToolTip>
            </h2>
          </div>
          <br>
          <div col>
            <b class="green">&darr; START &darr;</b>
          </div>
          <div class="drag">
            <div class="drag"
                 ondragover="return false"
                 @dragover="dragOver(0, workflow, true, $event)"
                 @dragleave="dragLeave(0, workflow, true, $event)"
                 @drop="drop(0, workflow, true, $event)">
              <hr>
            </div>
            <div v-for="(action, index) in workflow"
                 :key="index"
                 draggable="true"
                 @dragstart="startDrag(index, workflow)"
                 @dragend="endDrag(index, workflow)"
                 ondragover="return false"
                 @dragover="dragOver(index, workflow)"
                 @dragleave="dragLeave(index, workflow)"
                 @drop="drop(index, workflow)"
                 :class="{ hover: action.hover }">
             <Action :action="action" :workflow="true">
             </Action>
             <hr>
            </div>
          </div>
          <div col>
            <b class="red">&#11203; END &#11203;</b>
          </div>
        </div>

        <div class="aside">
          <h3 col>Available Actions</h3>
          <br>
          <div class="drag">
            <div class="drag"
                 ondragover="return false"
                 @dragover="dragOver(0, actions, true, $event)"
                 @dragleave="dragLeave(0, actions, true, $event)"
                 @drop="drop(0, actions, true, $event)">
              <hr>
            </div>
            <div v-for="(action, index) in actions"
                 :key="index"
                 draggable="true"
                 @dragstart="startDrag(index, actions)"
                 @dragend="endDrag(index, actions)"
                 ondragover="return false"
                 @dragover="dragOver(index, actions)"
                 @dragleave="dragLeave(index, actions)"
                 @drop="drop(index, actions)"
                 :class="{ hover: action.hover }">
              <Action :action="action">
              </Action>
              <hr>
            </div>
          </div>
        </div>

      </div>
    </div>

    <br>
    <br>

    <div center wrap>
      <button @click="$router.push({name: 'Settings'})">
        Cancel
      </button>
      <button green @click="submit">Save</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import weld from '@/assets/img/weld.png'
import drill from '@/assets/img/drill.png'
import order from '@/assets/img/order.png'
import scan from '@/assets/img/scan.png'
import saw from '@/assets/img/saw.png'
import sheet from '@/assets/img/sheet.png'
import hammer from '@/assets/img/hammer.png'
import measure from '@/assets/img/measure.png'
import inspect from '@/assets/img/inspect.png'
import grind from '@/assets/img/grind.png'
import paint from '@/assets/img/paint.png'
import ship from '@/assets/img/ship.png'
import delivery from '@/assets/img/delivery.png'
import erect from '@/assets/img/erect.png'
import Action from '@/components/app/settings/workflow/Action'
import ToolTip from '@/components/app/popups/ToolTip'

export default {
  components: {
    Action,
    ToolTip
  },
  data () {
    return {
      workflow: [],
      actions: [
        { action: 'Ordering', description: 'Ordered', image: order },
        { action: 'Receiving', description: 'Received', image: scan },
        { action: 'Cutting', description: 'Cut', image: saw },
        { action: 'Punching', description: 'Punched', image: drill },
        { action: 'Forming', description: 'Formed', image: sheet },
        { action: 'Fitting', description: 'Fitted', image: hammer },
        { action: 'Checking', description: 'Checked', image: measure },
        { action: 'Welding', description: 'Welded', image: weld },
        { action: 'Grinding', description: 'Grinded', image: grind },
        { action: 'Inspecting', description: 'Inspected', image: inspect },
        { action: 'Painting', description: 'Painted', image: paint },
        { action: 'Shipping', description: 'Shipped', image: ship },
        { action: 'Delivery', description: 'Delivered', image: delivery },
        { action: 'Erecting', description: 'Erected', image: erect }
      ],
      dragging: {},
      dropZone: false
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/users/workflow`, {
      params: {
        id: this.$store.getters.companyId
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
    startDrag (index, array) {
      this.dragging = array[index]
      array.splice(index, 1)
    },
    endDrag (index, array) {
      if (!this.dropZone) {
        array.splice(index, 0, this.dragging)
      }
    },
    dragOver (index, array, first, event) {
      this.dropZone = true
      if (first) {
        event.target.classList.add('hover')
      } else {
        this.$set(array[index], 'hover', true)
      }
    },
    dragLeave (index, array, first, event) {
      this.dropZone = false
      if (first) {
        event.target.classList.remove('hover')
      } else {
        this.$set(array[index], 'hover', false)
      }
    },
    drop (index, array, first, event) {
      if (this.dropZone) {
        if (first) {
          event.target.classList.remove('hover')
          array.splice(index, 0, this.dragging)
        } else {
          this.$set(array[index], 'hover', false)
          array.splice(index + 1, 0, this.dragging)
        }
      }
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
        this.$router.push({ name: 'WorkflowConfirmation' })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/style.scss';

  .workflow {
    max-width: 400px;
    padding-right: 10px;
    margin: 0 auto;
  }

  .aside {
    max-width: 200px;
    padding-left: 10px;
    border-left: 1px solid $accent;
  }

  b {
    font-size: 24px;
  }

  .drag {
    padding-top: 5px;
    padding-bottom: 5px;
    hr {
      opacity: 0;
      margin: 0;
      font-size: 0;
      height: 0;
      transition: 250ms all;
    }
  }

  .hover {
    hr {
      opacity: 1;
      font-size: 50px;
      font-weight: bold;
    }
  }
</style>
