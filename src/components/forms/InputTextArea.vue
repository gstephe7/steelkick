<template>
  <span class="input-container">

    <label class="label"
           :class="{ move : targeted }">
      <slot></slot>
    </label>

    <textarea
      class="input"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="target = true"
      @blur="target = false">
    </textarea>

  </span>
</template>

<script>
export default {
  props: {
    value: String,
    required: Boolean
  },
  data () {
    return {
      target: false
    }
  },
  computed: {
    targeted () {
      if (this.value || this.target) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    height: 96px;
    width: 288px;
    @include align;
    margin: 0 4px 16px;
  }

  .label {
    position: absolute;
    top: 0;
    @include align;
    padding: 16px;
    color: $theme;
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
    color: $theme;
    height: 56px;
    width: 100%;
    font-size: 16px;
    border: 1px solid $accent;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
  }

  .input:focus {
    border: 2px solid $secondary;
    outline: none;
  }
</style>
