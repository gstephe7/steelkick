<template>
  <span class="input-container" :style="style">
    <span class="input-wrapper" :class="{ checked : selected }">

      <input type="checkbox"
             :id="id"
             class="input"
             :value="value"
             :checked="value"
             @input="toggleCheck"
             :class="{ autotab : auto }">

      <label :for="id" class="label">
        <span class="icon">
          <icon icon="check"></icon>
        </span>
        <span class="label-text">
          <slot></slot>
        </span>
      </label>

    </span>
  </span>
</template>

<script>
export default {
  props: ['value', 'auto', 'size'],
  data () {
    return {
      id: this.$slots.default[0].text
    }
  },
  computed: {
    selected () {
      return this.value
    },
    style () {
      let newStyle = {}

      if (this.size == 'small') {
        newStyle.width = '120px'
      } else {
        newStyle.width = '140px'
      }

      return newStyle
    }
  },
  methods: {
    toggleCheck () {
      if (this.selected) {
        this.$emit('input', false)
      } else {
        this.$emit('input', true)
      }
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

  .input-wrapper {
    @include align;
    @include between;
    width: 100%;
    height: 50px;
    border: 1px solid $input-border;
    border-radius: 4px;
    cursor: pointer;
    position: relative;
  }

  .input {
    margin: 0;
    cursor: pointer;
    position: absolute;
    padding: 0;
    height: 0;
    width: 0;
  }

  .label {
    @include align;
    cursor: pointer;
    color: rgba(0,0,0,.4);
    padding: 0px 16px;
    height: 100%;
    width: 100%;
    transition: 250ms all;
  }

  .icon {
    color: $neon-blue;
    visibility: hidden;
    width: 0;
    height: 0;
    opacity: 0;
    transform: translateY(16px);
    transition: 250ms all;
  }

  .label-text {
    padding-left: 0;
    transition: 250ms all;
  }

  .input:checked + label {
    background-color: $light-blue;
    .label-text {
      padding-left: 8px;
      color: $neon-blue;
    }
    .icon {
      width: auto;
      height: auto;
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
