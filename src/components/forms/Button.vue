<template>
  <button @click="$emit('click')" :class="classList" :type="type">
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    create: Boolean,
    delete: Boolean,
    text: Boolean,
    outline: Boolean,
    type: {
      type: String,
      default: 'button'
    }
  },
  computed: {
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

  button {
    height: 40px;
    padding: 0 16px;
    margin: 0 8px 16px;
    font-size: 16px;
    background-color: $primary;
    border: none;
    border-radius: 4px;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,.5);
    cursor: pointer;
    transition: 250ms all;
    font-family: 'Roboto', sans-serif;
    @include align;
    @include center;
  }

  button:hover {
    filter: brightness(1.1);
    cursor: pointer;
  }

  .create {
    background-color: $success;
  }

  .delete {
    background-color: $alert;
  }

  .text {
    background-color: rgba(0,0,0,0);
    color: $primary;
    box-shadow: none;
    padding: 0 8px;
    margin: 0 8px;
    text-transform: uppercase;
  }

  button.outline {
    background-color: rgba(0,0,0,0);
    color: $primary;
    border: 1px solid $primary;
    text-transform: uppercase;
    box-shadow: none;
  }

  button.text.create {
    background-color: rgba(0,0,0,0);
    color: $success;
  }

  button.text.delete {
    background-color: rgba(0,0,0,0);
    color: $alert;
  }

  button.outline.create {
    background-color: rgba(0,0,0,0);
    color: $success;
    border: 1px solid $success;
  }

  button.outline.delete {
    background-color: rgba(0,0,0,0);
    color: $alert;
    border: 1px solid $alert;
  }

  button.outline:hover, button.text:hover {
    background-color: $light;
    filter: none;
  }
</style>
