<template>
  <div id="checkout-confirmation">

    <h2>Order Placed!</h2>

    <p>An email has been sent to you with details for this order.</p>

    <h3>Order Confirmation</h3>

    <div class="order">

      <!-- Seller Info -->
      <div class="seller-div">

        <div class="seller-container">
          <div class="seller-key">
            <p>Seller:</p>
          </div>
          <div class="seller-value">
            <p>{{ item.seller.name }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Address:</p>
          </div>
          <div class="seller-value">
            <p>{{ item.seller.street }} {{ item.seller.city }}, {{ item.seller.state }} {{ item.seller.zipcode }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Contact:</p>
          </div>
          <div class="seller-value">
            <p>{{ item.seller.contactName }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Phone:</p>
          </div>
          <div class="seller-value">
            <p>{{ item.seller.phone }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Email:</p>
          </div>
          <div class="seller-value">
            <p>{{ item.seller.email }}</p>
          </div>
        </div>

        <div class="seller-container">
          <div class="seller-key">
            <p>Remarks:</p>
          </div>
          <div class="seller-value">
            <p>{{ item.seller.remarks }}</p>
          </div>
        </div>

      </div>

      <!-- Items Ordered -->
      <h3>Order Details</h3>

      <div class="items-ordered">

        <div v-for="order in item.order" :key="item._id" class="item">

          <CartItem :item="order"></CartItem>

        </div>

      </div>

      <!-- Price Breakdown -->
      <div class="price-div">

        <div class="price-container">
          <div class="price-key">
            <p>Material:</p>
          </div>
          <div class="price-value">
            <p>{{ item.materialPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
          </div>
        </div>

        <div class="price-container">
          <div class="price-key">
            <p>Delivery:</p>
          </div>
          <div class="price-value">
            <p>{{ item.delivery.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
          </div>
        </div>

        <div class="price-container">
          <div class="price-key">
            <h3>Total:</h3>
          </div>
          <div class="price-value">
            <h3>{{ item.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h3>
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
      item: this.$route.params
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
