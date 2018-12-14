<template>
  <div id="checkout-confirmation">

    <h2>Order Placed!</h2>

    <p>An email has been sent to you with details for this order. Print this page or the email for use as a receipt.</p>

    <h3>Order Confirmation</h3>

    <div class="order">

      <!-- Seller Info -->
      <div class="seller-div">

        <div class="seller-container">
          <div class="seller-key">
            <p>Seller:</p>
          </div>
          <div class="seller-value">
            <p>{{ company }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Address:</p>
          </div>
          <div class="seller-value">
            <p>{{ street }} {{ city }}, {{ state }} {{ zipcode }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Contact:</p>
          </div>
          <div class="seller-value">
            <p>{{ contactName }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Phone:</p>
          </div>
          <div class="seller-value">
            <p>{{ phone }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Email:</p>
          </div>
          <div class="seller-value">
            <p>{{ email }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Remarks:</p>
          </div>
          <div class="seller-value">
            <p>{{ remarks }}</p>
          </div>
        </div>

      </div>

      <!-- Items Ordered -->
      <h3>Order Details</h3>

      <div class="items-ordered">

        <div v-for="item in $route.params.order" :key="item.id" class="item">

          <CartItem :item="item"></CartItem>

        </div>

      </div>

      <!-- Price Breakdown -->
      <div class="price-div">

        <div class="price-container">
          <div class="price-key">
            <p>Material:</p>
          </div>
          <div class="price-value">
            <p>${{ $route.params.materialPrice.toLocaleString() }}</p>
          </div>
        </div>

        <div class="price-container">
          <div class="price-key">
            <p>Delivery:</p>
          </div>
          <div class="price-value">
            <p>${{ $route.params.deliveryPrice.toFixed(2) }}</p>
          </div>
        </div>

        <div class="price-container">
          <div class="price-key">
            <h3>Total:</h3>
          </div>
          <div class="price-value">
            <h3>${{ $route.params.totalPrice.toLocaleString() }}</h3>
          </div>
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
      company: 'Benco Welding Inc.',
      phone: '678-233-7110',
      contactName: 'Butch Davis',
      email: 'butchdavis@bencowelding.com',
      street: '1162 Winder Industrial Pkwy',
      city: 'Winder',
      state: 'GA',
      zipcode: '30656',
      remarks: 'Pickup from 7am to 3pm Monday-Thursday. Delivery can be arranged from 7am to 2pm Monday-Thursday.'
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #checkout-confirmation {
    padding: 10px;
    max-width: 800px;
    margin: auto;
  }

  .order {
    margin-top: 10px;
  }

  .seller-div {
    display: flex;
    flex-direction: column;
  }

  .seller-container {
    display: flex;
    justify-content: space-between;
    width: 300px;
  }

  .seller-key {
    width: 75px;
  }

  .seller-value {
    width: 225px;
    word-wrap: break-word;
  }

  .items-ordered {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    display: flex;
    justify-content: center;
    width: 100%;
  }

  .price-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 50px 5px 0 0;
  }

  .price-container {
    display: flex;
    justify-content: space-between;
    width: 250px;
  }

  .price-key {
    width: 150px;
    text-align: right;
  }

  h3 {
    font-weight: bold;
    margin: 20px 0 0 0;
  }

  p, em {
    margin: 0;
  }
</style>
