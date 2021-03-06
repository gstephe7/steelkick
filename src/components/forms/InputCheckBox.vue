<template>
  <span class="input-container" :class="classList">
    <span class="input-wrapper" :class="{ checked : selected, target : target }">

      <input type="checkbox"
             :id="id"
             class="input"
             :checked="checked"
             @focus="target = true"
             @blur="target = false"
             @change="toggleCheck($event)"
             @keyup.right="toggleCheck($event)"
             @keyup.left="toggleCheck($event)">

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
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean,
    chip: Boolean,
    tiny: Boolean,
    small: Boolean,
    big: Boolean
  },
  data () {
    return {
      id: this._uid,
      target: false
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
    toggleCheck (event) {
      this.$emit('change', event.target.checked)
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
    opacity: 0;
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
    .label {
      @include center;
      padding: 0;
    }
  }

  .big {
    width: 264px;
  }

  .target {
    border: 2px solid $secondary;
  }

  .tiny {
    width: 88px;
    label.label {
      justify-content: center;
      text-align: center;
      padding: 0 8px;
    }
  }

  .chip {
    width: 104px;
    font-size: 14px;
    height: 32px;
    margin-bottom: 8px;
    .input-wrapper {
      height: 32px;
    }
    label.label {
      justify-content: center;
      text-align: center;
    }
  }
</style>
