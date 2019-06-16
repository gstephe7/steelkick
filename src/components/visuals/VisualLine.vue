<template>
  <span class="span">
    <span class="fill" :style="fillStyle"></span>
    <span class="content">
      <slot></slot>
    </span>
  </span>
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
        borderBottom: `2px solid rgba(${this.red},${this.green},0,.85)`,
        width: `${this.percentage * 100}%`
      }

      return style
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .span {
    position: relative;
  }

  .fill {
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
  }
</style>
