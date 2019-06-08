<template>
  <span class="input-container"
        :class="classList">

    <label class="label"
           :class="{ move : targeted }">
      <slot></slot>
    </label>

    <span v-if="type == 'password'" class="password" @click="hidePassword = !hidePassword">
      <icon v-if="hidePassword" icon="eye-slash"></icon>
      <icon v-else icon="eye"></icon>
    </span>

    <input
      class="input"
      :type="getType"
      :value="value"
      @input="$emit('input', $event.target.value)"
      @focus="target = true"
      @blur="target = false"
    >

  </span>
</template>

<script>
export default {
  props: {
    value: [String, Number],
    big: Boolean,
    small: Boolean,
    type: String
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
    classList () {
      let classes = []

      for (const key in this.$props) {
        if (this.$props[key] == true) {
          classes.push(key)
        }
      }

      return classes
    },
    getType () {
      if (this.type == 'password' && this.hidePassword == true) {
        return 'password'
      } else if (this.type == 'number') {
        return 'number'
      } else {
        return 'text'
      }
    }
  },
  mounted () {
    if (this.type == 'password') {
      this.hidePassword = true
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
    margin: 0 4px 16px 4px;
  }

  .label {
    position: absolute;
    top: 0;
    bottom: 0;
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
    width: 100%;
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid $accent;
  }

  .input:focus {
    border: 2px solid $secondary;
    outline: none;
  }

  .password {
    position: absolute;
    right: 16px;
    top: 0;
    bottom: 0;
    @include align;
    color: $dark;
    cursor: pointer;
  }

  input[type=number]::-webkit-inner-spin-button,
  input[type=number]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance:textfield;
  }

  .big {
    width: 264px;
  }

  .small {
    width: 120px;
  }
</style>
