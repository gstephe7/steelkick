<template>
  <div id="transaction-entry">

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
</style>
