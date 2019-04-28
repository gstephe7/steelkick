<template>
  <div card click>

    <!-- Part Information -->
    <div>
      <div between>
        <div row>
          <h3>
            <span v-if="part.minorMark">
              {{ part.minorMark }}
            </span>
            <span v-else>
              {{ part.pieceMark }}
            </span>
          </h3>
          <sup v-if="part.pieceMark">
            {{ part.pieceMark }}
          </sup>
        </div>

        <span>
          Seq {{ part.sequence.number }}
        </span>
      </div>

      <div between>
        <span>
          {{ part.shape }} {{ part.dimension }}
        </span>

        <div>
          <span>
            {{ feet }}'
          </span>
          <span>
            {{ inches }}"
          </span>
          <span v-if="fraction">
            {{ fraction }}
          </span>
        </div>
      </div>
    </div>

    <hr>

    <!-- Part Progress -->
    <div wrap>
      <PartProgress v-for="action in progress"
                    :key="action.action"
                    :action="action">
      </PartProgress>
    </div>

  </div>
</template>

<script>
import method from '@/global/methods'
import PartProgress from './PartProgress'

export default {
  props: ['part', 'workflow'],
  components: { PartProgress },
  computed: {
    feet () {
      return method.getFeet(this.part.length)
    },
    inches () {
      return method.getInches(this.part.length)
    },
    fraction () {
      return method.getFraction(this.part.length)
    },
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
  h3 {
    font-weight: bold;
    font-size: 24px;
    margin: 0;
  }

  [card] {
    margin: 10px auto;
  }

  sup {
    margin: 2px 5px;
  }
</style>
