<template>
  <div col center modal>
    <div card class="modal-box">

      <div between align>
        <h2>Part Progress</h2>
        <icon click small icon="times" @click="$emit('close')">
        </icon>
      </div>

      <hr>

      <div>
        <div between v-for="(action, index) in newProgress" :key="action.action">
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

    </div>
  </div>
</template>

<script>
import PartProgress from './PartProgress'

export default {
  components: { PartProgress },
  props: ['progress', 'part'],
  data () {
    return {
      newProgress: []
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
    min-width: 290px;
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
