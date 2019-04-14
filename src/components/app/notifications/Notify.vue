<template>
  <span id="notify" v-if="show">
    {{ show }}
  </span>
</template>

<script>
export default {
  computed: {
    show () {
      if (this.$store.getters.notifications.length > 0) {
        return this.$store.getters.notifications.length
      } else {
        return false
      }
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
