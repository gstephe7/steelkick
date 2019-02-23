<template>
  <span id="new" v-if="notifications > 0">
    New
  </span>
</template>

<script>
export default {
  data () {
    return {
      notifications: this.$store.getters.notifications.length
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #new {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 50px;
    height: 25px;
    border-radius: 50%;
    font-size: 14px;
    background-color: $success;
    color: white;
    font-weight: bold;
  }
</style>
