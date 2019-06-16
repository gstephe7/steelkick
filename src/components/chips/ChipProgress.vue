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
      colorMax: 255,
      ready: false
    }
  },
  computed: {
    percentage () {
      let completed = parseFloat(this.completed)
      let total = parseFloat(this.total)

      if (completed > total) {
        return 1
      } else {
        return completed / total
      }
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
        width: `${this.percentage * 100}%`
      }

      if (this.ready) {
        return style
      } else {
        return null
      }
    }
  },
  mounted () {
    setTimeout(() => {
      this.ready = true
    }, 100)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .chip {
    border: 1px solid $accent;
    position: relative;
    padding: 4px 0;
    font-size: 12px;
    color: $dark;
  }

  .fill {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 0%;
    transition: 500ms all ease-out;
  }

  .chip-content {
    @include col;
    overflow: hidden;
    white-space: nowrap;
  }
</style>
