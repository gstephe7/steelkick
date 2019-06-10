<template>
  <span class="input-container">

    <label class="label"
           :class="{ move : targeted }"
           @click="initFocus">
      Length
    </label>

    <span class="length-span">
      <input class="length"
             type="number"
             ref="feet"
             placeholder="11"
             maxlength="2"
             v-model.number="feet"
             @input="input"
             @focus="focused = true"
             @blur="focused = false">'

      <input class="length"
             type="number"
             placeholder="9"
             maxlength="2"
             v-model.number="inches"
             @input="input"
             @focus="focused = true"
             @blur="focused = false">"

      <input class="length"
             type="number"
             maxlength="2"
             v-model.number="numerator"
             @input="input"
             @focus="focused = true"
             @blur="focused = false"> /

      <input class="length denominator"
             type="number"
             maxlength="2"
             v-model.number="denominator"
             @input="input"
             @focus="focused = true"
             @blur="focused = false">
    </span>

  </span>
</template>

<script>
import method from '@/global/methods'

export default {
  props: {
    edit: Object,
    required: Boolean
  },
  data () {
    return {
      value: null,
      feet: null,
      inches: null,
      numerator: null,
      denominator: null,
      focused: false
    }
  },
  computed: {
    targeted () {
      if (this.feet || this.inches || this.numerator || this.denominator || this.focused == true) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    input () {
      let feetToInches = (this.feet * 12) || 0
      let inches = this.inches || 0
      let fraction = (this.numerator / this.denominator) || 0

      this.value = feetToInches + inches + fraction
      
      this.$emit('input', this.value)
    },
    initFocus () {
      this.$refs.feet.focus()
    }
  },
  created () {
    if (this.edit) {
      this.feet = method.getFeet(this.edit.length)
      this.inches = method.getInches(this.edit.length)
      this.numerator = method.getNumerator(this.edit.length)
      this.denominator = method.getDenominator(this.edit.length)

      let feetToInches = (this.feet * 12) || 0
      let inches = this.inches || 0
      let fraction = (this.numerator / this.denominator) || 0

      this.value = feetToInches + inches + fraction
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    margin: 0 4px 16px;
    height: 56px;
    width: 140px;
    @include align;
  }

  .small {
    width: 120px;
  }

  .label {
    position: absolute;
    top: 4px;
    bottom: 4px;
    left: 16px;
    right: 4px;
    background-color: #fff;
    @include align;
    color: $theme;
    transition: 250ms all;
  }

  .label:focus {
    color: $secondary;
  }

  .move {
    background-color: #fff;
    font-size: 12px;
    top: -8px;
    left: 16px;
    right: auto;
    bottom: auto;
    display: inline;
    padding: 4px;
  }

  .length-span {
    @include between;
    @include align;
    height: 50px;
    padding: 0 16px;
    border: 1px solid $accent;
    border-radius: 4px;
    width: 100%;
    background-color: #fff;
  }

  .length {
    width: 20px;
    border: none;
    border-radius: 0;
    text-align: right;
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: $theme;
  }

  input.length::placeholder {
    color: $accent;
  }

  .denominator {
    text-align: left;
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
