<template>
  <span class="input-container">

    <label class="label"
           :class="{ move : targeted }">
      Length
    </label>

    <span class="length-span" :class="{ error : highlight }">
      <input class="length autotab"
             type="number"
             placeholder="11"
             maxlength="2"
             v-model.number="feet"
             @input="input"
             @focus="focused = true"
             @blur="focused = false">'

      <input class="length autotab"
             type="number"
             placeholder="9"
             maxlength="2"
             v-model.number="inches"
             @input="input"
             @focus="focused = true"
             @blur="focused = false">"

      <input class="length autotab"
             type="number"
             maxlength="2"
             v-model.number="numerator"
             @input="input"
             @focus="focused = true"
             @blur="focused = false"> /

      <input class="length denominator autotab"
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
  props: ['edit', 'highlight'],
  data () {
    return {
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

      let length = feetToInches + inches + fraction

      this.$emit('input', length)
    }
  },
  created () {
    if (this.edit) {
      this.feet = method.getFeet(this.edit.length)
      this.inches = method.getInches(this.edit.length)
      this.numerator = method.getNumerator(this.edit.length)
      this.denominator = method.getDenominator(this.edit.length)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    margin: 0 5px 15px 5px;
    height: 58px;
    width: 140px;
    @include align;
  }

  .small {
    width: 120px;
  }

  .label {
    position: absolute;
    top: 5px;
    bottom: 5px;
    left: 15px;
    right: 2px;
    background-color: #fff;
    @include align;
    color: $grey;
    pointer-events: none;
    transition: 250ms all;
  }

  .label:focus {
    color: $secondary;
  }

  .move {
    background-color: #fff;
    font-size: 12px;
    top: -10px;
    left: 15px;
    right: auto;
    bottom: auto;
    display: inline;
    padding: 5px;
  }

  .length-span {
    @include between;
    @include align;
    padding: 10px 15px;
    border: 1px solid $input-border;
    border-radius: 5px;
    width: 100%;
    height: 30px;
  }

  .length {
    width: 20px;
    border: none;
    border-radius: 0;
    text-align: right;
    padding: 0;
    margin: 0;
    font-size: 16px;
    color: rgba(0,0,0,.87);
  }

  .denominator {
    text-align: left;
  }

  .error {
    outline: 1px solid $red;
  }
</style>
