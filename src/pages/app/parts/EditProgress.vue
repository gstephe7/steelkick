<template>
  <div align center backdrop>
    <div basis card class="modal-box">

      <div between align>
        <h2>Part Progress</h2>
        <icon click small icon="times" @click="$emit('close')">
        </icon>
      </div>

      <hr>

      <div>
        <div around v-for="(action, index) in newProgress" :key="action.action">
          <PartProgress :action="action" :details="true" :edit="true">
          </PartProgress>
          <div around align>
            <button tiny @click="decreaseProgress(action, index)">
              -
            </button>
            <span>
              <input tiny v-model="action.completed">/
              {{ action.total }}
            </span>
            <button tiny @click="increaseProgress(action, index)">
              +
            </button>
          </div>
        </div>
      </div>

      <br>

      <div around>
        <button small @click="$emit('close')">
          Cancel
        </button>
        <button small green @click="submit">
          Save
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import PartProgress from './PartProgress'

export default {
  components: { PartProgress },
  props: ['progress', 'part'],
  data () {
    return {
      newProgress: [],
      newActions: []
    }
  },
  methods: {
    increaseProgress (action) {
      if (action.completed < action.total) {
        action.completed += 1
      }
    },
    decreaseProgress (action) {
      if (action.completed > 0) {
        action.completed -= 1
      }
    },
    checkNewActions () {
      this.progress.forEach(oldItem => {
        this.newProgress.forEach(newItem => {
          if (oldItem.action == newItem.action) {
            if (oldItem.completed != newItem.completed) {
              let quantity = newItem.completed - oldItem.completed
              this.newActions.push({
                description: newItem.description,
                quantity: quantity
              })
            }
          }
        })
      })
    },
    submit () {
      this.checkNewActions()
      this.newActions.forEach(item => {
        this.$store.dispatch('action', {
          job: this.part.job._id,
          sequence: this.part.sequence._id,
          part: this.part._id,
          action: 'marked',
          description: item.description,
          quantity: item.quantity
        })
      })
      location.reload(true)
    }
  },
  created () {
    this.progress.forEach(item => {
      this.newProgress.push({
        action: item.action,
        description: item.description,
        image: item.image,
        order: item.order,
        completed: item.completed,
        total: item.total
      })
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .modal-box {
    max-width: 500px;
    max-height: 90%;
    background-color: white;
    margin: 5px;
    overflow-y: scroll;
    h2 {
      margin: 5px 0;
    }
    button[tiny] {
      border-radius: 10px;
    }
    input[tiny] {
      font-size: 16px;
      margin-left: 0;
      width: 25px;
      padding: 5px;
      text-align: center;
    }
  }
</style>
