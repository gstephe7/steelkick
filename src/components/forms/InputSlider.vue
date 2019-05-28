<template>
  <div class="input-container">

    <button class="micro grey" @click="updateValue(-1)">
      -
    </button>

    <input type="range"
           min="1"
           :max="max"
           v-model="newValue"
           class="slider"
           @input="$emit('input', newValue)">

    <button class="micro grey" @click="updateValue(+1)">
      +
    </button>

  </div>
</template>

<script>
export default {
  props: ['value', 'max'],
  data () {
    return {
      newValue: this.value
    }
  },
  methods: {
    updateValue (num) {
      this.newValue += num
      if (this.newValue == 0) {
        this.newValue = 1
      }
      if (this.newValue > this.max) {
        this.newValue = this.max
      }
      this.$emit('input', this.newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    @include align;
    margin: 10px 0 10px 0;
  }

  .slider {
    -webkit-appearance: none;
    appearance: none;
    background-color: $accent;
    height: 1px;
    width: 150px;
    outline: none;
    padding: 0;
  }

  .slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    cursor: pointer;
    height: 25px;
    width: 5px;
    background-color: $blue;
  }

  .slider::-moz-range-thumb {
    cursor: pointer;
    height: 25px;
    width: 5px;
    background-color: $blue;
  }
</style>
