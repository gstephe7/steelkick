<template>
  <div id="transaction-entry">

    <div class="new" v-if="newTransaction">
      New
    </div>

    <div class="container">

      <div>
        <b v-if="purchase">
          Purchase
        </b>
        <b v-else>
          Sale
        </b>
      </div>

      <div>
        <b v-if="purchase">-{{ item.order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</b>
        <b v-else>{{ item.order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</b>
      </div>

    </div>

    <div class="container">

      <div>
        <p>{{ item.date }}</p>
      </div>

      <div>
        <p v-if="purchase">
          {{ item.order.seller.name }}
        </p>
        <p v-else>
          {{ item.order.buyer.name }}
        </p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    purchase () {
      if (this.item.order.buyer._id == this.$store.getters.companyId) {
        return true
      } else {
        return false
      }
    },
    newTransaction () {
      if (this.$store.getters.notifications.length > 0) {

        let isNew = false

        this.$store.getters.notifications.forEach(item => {
          if (item.subject == this.item._id) {
            isNew = true
          }
        })

        return isNew

      } else {
        return false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #transaction-entry {
    box-shadow: $box-shadow;
    padding: 10px;
    margin: 5px 0 5px 0;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0;
  }

  b {
    font-weight: bold;
  }

  .new {
    position: absolute;
    opacity: .2;
    font-size: 40px;
    width: 150px;
    text-align: center;
    margin-top: -3px;
    margin-right: auto;
    margin-left: auto;
    left: 0;
    right: 0;
    font-weight: bold;
    color: $success;
  }
</style>
