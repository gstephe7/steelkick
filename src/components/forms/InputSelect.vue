<template>
  <span class="input-container"
        :style="style">

    <label class="label"
           :class="{ move : valueSelected }">
      <slot name="label"></slot>
    </label>

    <select class="input"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="targeted = true"
            @blur="targeted = value"
            :class="{ autotab : auto, error : highlight }">
      <option :value="undefined" disabled selected></option>
      <slot name="options"></slot>
    </select>

  </span>
</template>

<script>
export default {
  props: ['value', 'size', 'auto', 'highlight'],
  data () {
    return {
      targeted: this.value
    }
  },
  computed: {
    valueSelected () {
      return this.value
    },
    style () {
      let newStyle = {}

      if (this.size == 'big') {
        newStyle.width = '270px'
      } else if (this.size == 'small') {
        newStyle.width = '120px'
      } else {
        newStyle.width = '140px'
      }

      return newStyle
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    height: 56px;
    @include align;
    margin: 0 4px 16px;
  }

  .label {
    position: absolute;
    top: 0;
    bottom: 0;
    @include align;
    padding: 16px;
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
    top: -8px;
    left: 16px;
    bottom: auto;
    display: inline;
    padding: 4px;
  }

  .input {
    margin: 0;
    padding: 16px;
    transition: 250ms all;
    color: rgba(0,0,0,.87);
    width: 100%;
    height: 52px;
    font-size: 16px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #d8d8d8;
  }

  .input:focus {
    border: 2px solid $secondary;
    outline: none;
  }

  .error {
    outline: 1px solid $red;
  }
</style>
