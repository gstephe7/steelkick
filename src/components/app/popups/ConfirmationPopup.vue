<template>
  <div col>
    <p>{{ msg }}</p>
    <div around>
      <button small @click="cancel" type="button">Cancel</button>
      <button small @click="confirm" type="button">{{ btnText }}</button>
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
</style>
