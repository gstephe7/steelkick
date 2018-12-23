<template>
  <div id="checkout">

    <h3 class="page-title">Transaction Details</h3>

    <!-- Company Info -->
    <div class="company-info">
      <p>{{ order.company }}</p>
      <p>{{ order.street }}</p>
      <p>{{ order.city }}, {{ order.state }} {{ order.zipcode }}</p>
      <p>{{ order.contactName }}</p>
      <p>{{ order.phone }}</p>
      <p>{{ order.email }}</p>
      <br>
      <p>Confirmation Date: {{ order.date }}</p>
    </div>

    <div class="order">

      <div class="order-item" v-for="item in order.order" :key="item.id">

          <CartItem :item="item"></CartItem>

      </div>

    </div>

    <!-- Price Breakdown -->
    <div class="price-div">
      <div class="price-box">
        <div class="item">
          <p>Material: </p>
        </div>
        <div class="price">
          <p>${{ order.materialPrice.toLocaleString() }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <p>Delivery: </p>
        </div>
        <div class="price">
          <p>${{ order.deliveryCost.toFixed(2) }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <h3>Total: </h3>
        </div>
        <div class="price">
          <h3>${{ order.total.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem'

export default {
  components: {
    CartItem
  },
  data () {
    return {
      order: this.$route.query.order
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #checkout {
    max-width: 800px;
    margin: auto;
    padding: 10px;
  }

  .page-title {
    font-weight: 300;
    text-align: center;
  }

  .company-info {
    box-shadow: $box-shadow;
    padding: 10px;
  }

  .title {
    text-decoration: underline;
  }

  .order {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .order-item {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .price-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 50px 5px 0 0;
  }

  .price-box {
    display: flex;
    justify-content: space-between;
    width: 250px;
  }

  .item {
    width: 150px;
    text-align: right;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
  }

  .success {
    background-color: $success;
  }

  .alert {
    background-color: $alert;
  }

  h3 {
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  p {
    margin: 0;
  }
</style>
