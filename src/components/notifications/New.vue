<template>
  <span id="new" v-if="show">
    New
  </span>
</template>

<script>
export default {
  props: ['orders', 'transactions'],
  computed: {
    show () {
      if (this.$store.getters.notifications.length > 0) {
        if (this.orders) {
          let isOrder = false
          this.$store.getters.notifications.forEach(item => {
            if (item.action == 'order') {
              isOrder = true
            }
          })
          return isOrder
        } else if (this.transactions) {
          let isTransaction = false
          this.$store.getters.notifications.forEach(item => {
            if (item.action == 'transaction') {
              isTransaction = true
            }
          })
          return isTransaction
        }
      } else {
        return false
      }
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
