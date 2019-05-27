<template>
  <span class="input-container">

    <label class="label"
           :class="{ move : targeted }">
      <slot></slot>
    </label>

    <textarea
      class="input"
      :class="{ autotab : auto }"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="targeted = true"
      @blur="targeted = value">
    </textarea>

  </span>
</template>

<script>
export default {
  props: ['value', 'auto'],
  data () {
    return {
      targeted: this.value
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    height: 80px;
    width: 290px;
    @include align;
    margin: 0 5px 15px 5px;
  }

  .label {
    position: absolute;
    top: 0;
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
