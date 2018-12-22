<template>
  <div id="checkout">

    <h3 class="page-title">Pending Order</h3>

    <!-- Buyer Info -->
    <div class="company-info">
      <p class="title">Buyer</p>
      <p>{{ order.buyer.company }}</p>
      <p>{{ order.buyer.street }}</p>
      <p>{{ order.buyer.city }}, {{ order.buyer.state }} {{ order.buyer.zipcode }}</p>
      <p>{{ order.buyer.contactName }}</p>
      <p>{{ order.buyer.phone }}</p>
      <p>{{ order.buyer.email }}</p>
    </div>

    <!-- Seller Info -->
    <div class="company-info">
      <p class="title">Seller</p>
      <p>{{ order.seller.company }}</p>
      <p>{{ order.seller.street }}</p>
      <p>{{ order.seller.city }}, {{ order.seller.state }} {{ order.seller.zipcode }}</p>
      <p>{{ order.seller.contactName }}</p>
      <p>{{ order.seller.phone }}</p>
      <p>{{ order.seller.email }}</p>
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
          <p>${{ order.materialPrice }}</p>
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

    <!-- Confirm/Deny order for received order -->
    <div v-if="received" class="buttons">
      <button class="alert">Deny</button>
      <button class="success">Confirm</button>
    </div>

    <!-- Cancel placed order -->
    <div v-else class="buttons">
      <button class="alert">Cancel Order</button>
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
      order: this.$route.query.order,
      received: this.$route.query.received
    }
  },
  methods: {
    placeOrder () {
      this.$router.push({
        name: 'CheckoutConfirmation',
        params: {
          seller: this.$route.params.seller,
          order: this.$route.params.order,
          materialPrice: this.$route.params.materialPrice,
          deliveryPrice: this.$route.params.deliveryPrice,
          totalPrice: this.$route.params.totalPrice
        }
      })
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
