<template>
  <div class="input-container">

    <button class="micro grey" @click="updateValue(-1)">
      -
    </button>

    <input type="number"
           min="1"
           :max="max"
           v-model="newValue"
           class="input"
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
  }

  .input {
    width: 48px;
    height: 48px;
    padding: 0;
    font-size: 16px;
    text-align: center;
    border: 1px solid $accent;
    border-radius: 4px;
    color: $theme;
    margin: 0 4px;
  }

  button.micro {
    margin: 0;
    width: 48px;
    height: 48px;
    box-shadow: none;
    border: none;
    border-radius: 4px;
    background-color: $accent;
    color: $theme;
    font-size: 16px;
    cursor: pointer;
    transition: 250ms all;
  }

  button.micro:hover {
    filter: brightness(1.05);
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }
</style>
