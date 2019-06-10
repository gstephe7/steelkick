<template>
  <Item>

    <template #title>
      {{ part.minorMark }}
      <small>Seq {{ part.sequence }}</small>
    </template>

    <template #second>
       <span>
         {{ part.shape }} {{ part.dimension }}
       </span>
       <span>
         {{ feet }}'
         {{ inches }}"
         {{ fraction }}
       </span>
    </template>

    <template #third>
      <div class="wrap">
        <div v-for="action in partProgress">
          <ChipProgress :completed="1"
                        :total="action.total">
            <span>
              {{ action.completed }}/{{ action.total }}
            </span>
            <span>
              {{ action.action }}
            </span>
          </ChipProgress>
        </div>
      </div>
    </template>

    <template #actions>
      <Button text>
        EDIT PART
      </Button>
      <Button text>
        PART LOG
      </Button>
    </template>

  </Item>
</template>

<script>
import method from '@/global/methods.js'

export default {
  props: ['part', 'workflow'],
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
    partProgress () {
      let progress = []

      this.workflow.forEach(item => {
        progress.push({
          action: item.description,
          completed: 0,
          total: this.part.quantity
        })
      })

      this.part.progress.forEach(item => {
        progress.forEach(value => {
          if (item.description == value.action) {
            value.quantity = item.quantity
          }
        })
      })

      return progress
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
