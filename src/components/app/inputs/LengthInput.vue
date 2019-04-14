<template>
  <span length>
    <legend>
      <input length class="autotab" type="number" placeholder="11" maxlength="2" v-model.number="feet" @input="input">'
    </legend>
    <legend>
      <input length class="autotab" type="number" placeholder="9" maxlength="2" v-model.number="inches" @input="input">"
    </legend>
    <legend>
      <input length class="autotab" type="number" maxlength="2" v-model.number="numerator" @input="input"> /
      <input length denominator class="autotab" type="number" maxlength="2" v-model.number="denominator" @input="input">
    </legend>
  </span>
</template>

<script>
export default {
  data () {
    return {
      feet: null,
      inches: null,
      numerator: null,
      denominator: null
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
  }
}
</script>

<style lang="scss" scoped>
</style>
