<template>
  <div align card click>

    <b>
      <span v-if="part.minorMark">
        {{ part.minorMark }}
      </span>
      <span v-else>
        {{ part.pieceMark }}
      </span>
    </b>

    <div wrap>
      <PartProgress v-for="action in progress"
                    :key="action.action"
                    :action="action"
                    :list="true"
                    grow>
      </PartProgress>
    </div>

  </div>
</template>

<script>
import PartProgress from './PartProgress'

export default {
  props: ['part', 'workflow'],
  components: { PartProgress },
  computed: {
    progress () {
      let progress = this.workflow
      progress.forEach(item => {
        item.total = this.part.quantity
        item.completed = 0
      })
      if (this.part.progress) {
        this.part.progress.forEach(item => {
          progress.forEach(value => {
            if (item.description == value.description) {
              value.completed += item.quantity
            }
          })
        })
      }
      return progress
    }
  }
}
</script>

<style lang="scss" scoped>
  b {
    min-width: 65px;
  }

  [card] {
    margin: 0 auto;
    padding: 5px;
  }
</style>
