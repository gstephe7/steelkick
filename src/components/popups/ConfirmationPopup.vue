<template>
  <div id="popup">
    <p>{{ msg }}</p>
    <div class="buttons">
      <button @click="cancel">Cancel</button>
      <button @click="confirm">{{ btnText }}</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['msg', 'btnText'],
  methods: {
    confirm () {
      this.$emit('confirm')
    },
    cancel () {
      this.$emit('cancel')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #background {
    position: fixed;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  p {
    text-align: center;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }

  button {
    width: 125px;
  }
</style>
