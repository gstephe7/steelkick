<template>
  <span id="new" v-if="show">
    {{ number }} New
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
    },
    number () {
      if (this.$store.getters.notifications.length > 0) {

        let orders = 0
        let transactions = 0

        this.$store.getters.notifications.forEach(item => {
          if (item.action == 'order') {
            orders += 1
          }
          if (item.action == 'transaction') {
            transactions += 1
          }
        })

        if (this.orders) {
          return orders
        }

        else if (this.transactions) {
          return transactions
        }

        else {
          return 0
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
    width: 55px;
    height: 25px;
    border-radius: 50%;
    font-size: 14px;
    background-color: $success;
    color: white;
    font-weight: bold;
  }
</style>
