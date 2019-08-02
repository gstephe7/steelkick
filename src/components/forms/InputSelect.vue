<template>
  <span class="input-container"
        :class="classList">

    <label class="label"
           :class="{ move : targeted }">
      <slot name="label"></slot>
    </label>

    <select class="select"
            :value="value"
            @change="$emit('input', $event.target.value)"
            @focus="target = true"
            @blur="target = false">
      <option :value="undefined" selected></option>
      <slot name="options"></slot>
    </select>

  </span>
</template>

<script>
export default {
  props: {
    value: [String, Number, Object],
    big: Boolean,
    small: Boolean,
    required: Boolean
  },
  data () {
    return {
      target: false,
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
    classList () {
      let classes = []

      for (const key in this.$props) {
        if (this.$props[key] == true) {
          classes.push(key)
        }
      }

      return classes
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    position: relative;
    height: 56px;
    width: 140px;
    @include align;
    margin: 0 4px 16px;
  }

  .label {
    position: absolute;
    top: 0;
    bottom: 0;
    @include align;
    padding: 16px;
    color: $theme;
    font-size: 16px;
    font-weight: normal;
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

  .select {
    margin: 0;
    padding: 16px;
    transition: 250ms all;
    color: $theme;
    width: 100%;
    height: 52px;
    font-size: 16px;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid $accent;
  }

  .select:focus {
    border: 2px solid $secondary;
    outline: none;
  }

  .big {
    width: 264px;
  }

  .small {
    width: 120px;
  }
</style>
