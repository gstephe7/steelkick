<template>
  <span class="input-container">

    <label class="label">
      <slot></slot>
    </label>

    <span class="symbol">
      $
    </span>

    <input
      class="input"
      type="number"
      :value="value"
      @input="$emit('input', $event.target.value)"
    >

  </span>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    big: Boolean,
    small: Boolean,
    tiny: Boolean,
    type: String,
    required: Boolean
  },
  data () {
    return {
      target: false,
      hidePassword: false
    }
  },
  computed: {
    targeted () {
      if (this.value || this.target) {
        return true
      } else {
        return false
      }
    },
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    height: 56px;
    width: 88px;
    @include align;
    margin: 0 4px 16px 4px;
  }

  .label {
    position: absolute;
    @include align;
    color: $theme;
    font-weight: normal;
    pointer-events: none;
    background-color: #fff;
    font-size: 12px;
    top: -8px;
    left: 16px;
    bottom: auto;
    display: inline;
    padding: 4px;
    transition: 250ms all;
  }

  .label:focus {
    color: $secondary;
  }

  .input {
    margin: 0;
    padding: 16px 8px 16px 20px;
    transition: 250ms all;
    color: $theme;
    width: 100%;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid $accent;
  }

  .input:focus {
    border: 2px solid $secondary;
    outline: none;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }

  .symbol {
    position: absolute;
    left: 8px;
    top: 50%;
    margin-top: -10px;
    color: $dark;
  }
</style>
