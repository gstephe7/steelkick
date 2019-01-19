<template>
  <div id="checkout">

    <h2>Checkout</h2>

    <h3>Order from {{ seller.name }}</h3>

    <div class="order">

      <div class="order-item" v-for="item in order" :key="item._id">

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
          <p>{{ materialPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <p>Delivery: </p>
        </div>
        <div class="price">
          <p>{{ delivery.price.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <h3>Total: </h3>
        </div>
        <div class="price">
          <h3>{{ totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h3>
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
import api from '@/api/api'
import CartItem from '@/components/cart/CartItem'

export default {
  components: {
    CartItem
  },
  data () {
    return {
      seller: {
        name: ''
      },
      order: [],
      delivery: {
        selected: null,
        distance: null,
        price: parseFloat(this.$route.query.delivery)
      },
      materialPrice: parseFloat(this.$route.query.material),
      totalPrice: parseFloat(this.$route.query.total),
      _id: null
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/cart/checkout`, {
      params: {
        id: this.$route.query.id
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this._id = res.data.order._id
      this.order = res.data.order.order
      this.seller = res.data.order.seller
      this.delivery.selected = res.data.order.delivery.selected
      this.delivery.distance = res.data.order.delivery.distance
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    placeOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/new-order`, {
        buyer: this.$store.getters.companyId,
        seller: this.seller._id,
        order: this.order,
        delivery: {
          selected: this.delivery.selected,
          distance: this.delivery.distance,
          totalPrice: this.delivery.price
        },
        totalPrice: this.totalPrice,
        id: this._id
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.$router.push({
          name: 'CheckoutConfirmation',
          params: {
            seller: this.seller,
            order: this.order,
            delivery: this.delivery,
            totalPrice: this.totalPrice,
            materialPrice: this.materialPrice
          }
        })
      })
      .catch(err => {
        this.$store.dispatch('complete')
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
