<template>
  <span class="input-container" :class="classList">
    <span class="input-wrapper" :class="{ checked : selected }">

      <input type="checkbox"
             :id="id"
             class="input"
             :value="value"
             :checked="value"
             @change="toggleCheck"
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
  props: {
    value: Boolean,
    auto: Boolean,
    small: Boolean
  },
  data () {
    return {
      id: this.$slots.default[0].text
    }
  },
  computed: {
    selected () {
      return this.value
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
    width: 140px;
    @include align;
    margin: 0 4px 16px;
  }

  .input-wrapper {
    @include align;
    @include between;
    width: 100%;
    height: 50px;
    border: 1px solid $accent;
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
    display: none;
  }

  .label {
    @include align;
    cursor: pointer;
    color: $accent;
    padding: 0px 16px;
    height: 100%;
    width: 100%;
    transition: 250ms all;
  }

  .icon {
    color: $primary;
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
    background-color: $light;
    .label-text {
      padding-left: 8px;
      color: $primary;
    }
    .icon {
      width: auto;
      height: auto;
      visibility: visible;
      opacity: 1;
      transform: translateY(0);
    }
  }

  .small {
    width: 120px;
  }
</style>
