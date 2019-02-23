<template>
  <span id="notify" v-if="number > 0">
    {{ number }}
  </span>
</template>

<script>
export default {
  data () {
    return {
      number: this.$store.getters.notifications.length
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #notify {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 17px;
    height: 17px;
    border-radius: 50%;
    font-size: 10px;
    background-color: $alert;
    color: white;
  }
</style>
