<template>
  <div id="checkout">

    <h2>Checkout</h2>

    <h3>Order from {{ $route.params.seller }}</h3>

    <div class="order">

      <div class="order-item" v-for="item in $route.params.order" :key="item.id">

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
          <p>${{ $route.params.materialPrice.toLocaleString() }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <p>Delivery: </p>
        </div>
        <div class="price">
          <p>${{ $route.params.deliveryPrice.toFixed(2) }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <h3>Total: </h3>
        </div>
        <div class="price">
          <h3>${{ $route.params.totalPrice.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <!-- Place Order Button -->
    <div class="place-order">
      <button class="place-order-btn" @click="placeOrder">Place Order</button>
    </div>

  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem'

export default {
  components: {
    CartItem
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

  .place-order {
    display: flex;
    justify-content: center;
  }

  .place-order-btn {
    background-color: $success;
  }

  h3 {
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  p {
    margin: 0;
  }
</style>
