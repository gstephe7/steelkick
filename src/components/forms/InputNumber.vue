<template>
  <div class="input-container">

    <button class="micro grey" @click="updateValue(-1)">
      -
    </button>

    <input type="number"
           min="1"
           :max="max"
           v-model="newValue"
           class="input"
           @input="$emit('input', newValue)">

    <button class="micro grey" @click="updateValue(+1)">
      +
    </button>

  </div>
</template>

<script>
export default {
  props: ['value', 'max'],
  data () {
    return {
      newValue: this.value
    }
  },
  methods: {
    updateValue (num) {
      this.newValue += num
      if (this.newValue == 0) {
        this.newValue = 1
      }
      if (this.newValue > this.max) {
        this.newValue = this.max
      }
      this.$emit('input', this.newValue)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .input-container {
    @include align;
  }

  .input {
    width: 48px;
    height: 48px;
    padding: 0;
    font-size: 16px;
    text-align: center;
  }

  button.micro {
    margin: 0;
    width: 48px;
    height: 48px;
    box-shadow: none;
  }
</style>
