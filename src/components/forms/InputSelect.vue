<template>
  <span class="input-container"
        :style="style">

    <label class="label"
           :class="{ move : targeted }">
      <slot name="label"></slot>
    </label>

    <select class="input"
            :value="value"
            @input="$emit('input', $event.target.value)"
            @focus="targeted = true"
            @blur="targeted = value">
      <option :value="undefined" disabled selected></option>
      <slot name="options"></slot>
    </select>

  </span>
</template>

<script>
export default {
  props: ['value', 'size'],
  data () {
    return {
      targeted: this.value
    }
  },
  computed: {
    style () {
      let newStyle = {}

      if (this.size == 'big') {
        newStyle.width = '270px'
      } else if (this.size == 'small') {
        newStyle.width = '140px'
      } else {
        newStyle.width = '200px;'
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
    height: 58px;
    @include align;
    margin: 0 5px 15px 5px;
  }

  .label {
    position: absolute;
    top: 0;
    bottom: 0;
    @include align;
    padding: 15px;
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
    bottom: auto;
    display: inline;
    padding: 5px;
  }

  .input {
    margin: 0;
    padding: 10px 15px;
    transition: 250ms all;
    color: rgba(0,0,0,.87);
    height: 52px;
    width: 100%;
    font-size: 16px;
  }

  .input:focus {
    border: 2px solid $secondary;
    outline: none;
  }
</style>
