<template>
  <span class="input-container"
        :style="style">

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
      @focus="targeted = true"
      @blur="targeted = value"
      :class="{ autotab : auto }"
    >

  </span>
</template>

<script>
export default {
  props: ['value', 'size', 'type', 'auto'],
  data () {
    return {
      targeted: this.value,
      hidePassword: false
    }
  },
  computed: {
    style () {
      let newStyle = {}

      if (this.size == 'big') {
        newStyle.width = '270px'
      } else if (this.size == 'small') {
        newStyle.width = '140px'
      } else if (this.size == 'tiny') {
        newStyle.width = '72px'
      } else {
        newStyle.width = '140px'
      }

      return newStyle
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
    @include align;
    margin: 0 4px 16px 4px;
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
    font-size: 16px;
    border-radius: 4px;
    border: 1px solid #d8d8d8;
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
    color: $grey;
    cursor: pointer;
  }
</style>
