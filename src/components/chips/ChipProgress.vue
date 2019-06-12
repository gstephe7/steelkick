<template>
  <div class="chip">
    <div class="fill" :style="fillStyle">
    </div>
    <div class="chip-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    completed: [String, Number],
    total: [String, Number]
  },
  data () {
    return {
      colorMin: 0,
      colorMax: 255
    }
  },
  computed: {
    percentage () {
      let completed = parseFloat(this.completed)
      let total = parseFloat(this.total)

      return completed / total
    },
    red () {
      let range = this.colorMax - this.colorMin
      let newPercentage = 1 - this.percentage
      let change = (range * newPercentage) * 2

      if (this.percentage > 0.5) {
        return this.colorMin + change
      } else {
        return this.colorMax
      }
    },
    green () {
      let range = this.colorMax - this.colorMin
      let change = (range * this.percentage) * 2

      if (this.percentage > 0.5) {
        return this.colorMax
      } else {
        return this.colorMin + change
      }
    },
    fillStyle () {
      let style = {
        backgroundColor: `rgba(${this.red},${this.green},0,.2)`,
        height: `${this.percentage * 100}%`
      }

      return style
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .chip {
    @include col;
    @include center;
    height: 30px;
    margin-top: 4px;
    position: relative;
    font-size: 12px;
    border: 1px solid $accent;
  }

  .fill {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

  .chip-content {
    @include col;
    @include center;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
