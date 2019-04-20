<template>
  <div>

    <div>
      {{ percent }}% Complete
    </div>

    <div class="progress-container">
      <div class="progress" :style="{ width: percent + '%' }">
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['numerator', 'denominator'],
  computed: {
    percent () {
      if (this.weightComplete && this.weightTotal) {
        return (parseFloat(this.numerator) / parseFloat(this.denominator)) * 100
      } else {
        return 0
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .progress-container {
    width: 280px;
    height: 20px;
    border-radius: 5px;
    border: 1px solid $accent;
  }

  .progress {
    background-color: $success;
    height: inherit;
    border-radius: 5px;
  }
</style>
