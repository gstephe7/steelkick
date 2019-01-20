<template>
  <div id="checkout">

    <h3 class="page-title">Pending Order</h3>

    <!-- Buyer Info -->
    <div class="company-info">
      <p class="title">Buyer</p>
      <p>{{ buyer.name }}</p>
      <p>{{ buyer.street }}</p>
      <p>{{ buyer.city }}, {{ buyer.state }} {{ buyer.zipcode }}</p>
      <p>{{ buyer.contactName }}</p>
      <p>{{ buyer.phone }}</p>
      <p>{{ buyer.email }}</p>
    </div>

    <!-- Seller Info -->
    <div class="company-info">
      <p class="title">Seller</p>
      <p>{{ seller.name }}</p>
      <p>{{ seller.street }}</p>
      <p>{{ seller.city }}, {{ seller.state }} {{ seller.zipcode }}</p>
      <p>{{ seller.contactName }}</p>
      <p>{{ seller.phone }}</p>
      <p>{{ seller.email }}</p>
    </div>

    <!-- Date and Time order placed -->
    <div class="company-info">
      <p class="title">Order Date/Time</p>
      <p>{{ date }}</p>
      <p>{{ time }}</p>
    </div>

    <div class="order">

      <div class="order-item" v-for="item in order" :key="item._id">

          <CartItem :item="item"></CartItem>

      </div>

    </div>

    <!-- Price Breakdown -->
    <div class="price-div" v-if="totalPrice">
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
          <p>{{ delivery.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
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

    <!-- Confirm/Deny order for received order -->
    <div v-if="$route.query.received" class="buttons">
      <button class="alert" @click="toggleCancel">Decline</button>
      <button class="success" @click="toggleConfirm">Confirm</button>
    </div>

    <!-- Cancel placed order -->
    <div v-else class="cancel">
      <p>This order has been placed. Please wait to hear back from the seller for confirmation.</p>
      <button class="alert" @click="toggleCancel">Cancel Order</button>
    </div>

    <!-- Cancel/Decline Confirmation -->
    <div class="confirmation" v-if="showCancel">
      <p v-if="$route.query.received">
        Are you sure you want to decline this order request?
      </p>
      <p v-else>
        Are you sure you want to cancel this order?
      </p>
      <div class="buttons">
        <button @click="toggleCancel">No</button>
        <button @click="cancelOrder">Yes</button>
      </div>
    </div>

    <!-- Confirm Order -->
    <div class="confirmation" v-if="showConfirm">
      <p>
        Send a message with your confirmation
      </p>
      <textarea v-model="confirmationMessage"></textarea>
      <div class="buttons">
        <button @click="toggleConfirm">Cancel</button>
        <button @click="confirmOrder" class="success">Confirm Order</button>
      </div>
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
      buyer: {},
      seller: {},
      order: [],
      delivery: {},
      totalPrice: null,
      date: null,
      time: null,
      _id: null,
      confirmationMessage: '',
      showCancel: false,
      showConfirm: false,
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/orders/order`, {
      params: {
        id: this.$route.query.order
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.buyer = res.data.order.order.buyer
      this.seller = res.data.order.order.seller
      this.order = res.data.order.order.order
      this.delivery = res.data.order.order.delivery
      this.totalPrice = res.data.order.order.totalPrice
      this.date = res.data.order.date
      this.time = res.data.order.time
      this._id = res.data.order._id
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  },
  computed: {
    materialPrice () {
      let price = 0
      this.order.forEach(item => {
        price += parseFloat(item.subtotalPrice)
      })
      return price
    }
  },
  methods: {
    toggleCancel () {
      this.showCancel = !this.showCancel
    },
    toggleConfirm () {
      this.showConfirm = !this.showConfirm
    },
    cancelOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/cancel-order`, {
        id: this._id
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.$router.push({ name: 'OrderPage' })
      })
      .catch(err => {
        this.$store.dispatch('complete')
      })
    },
    confirmOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/confirm-order`, {
        id: this._id
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.$router.push({ name: 'OrderPage' })
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

  .cancel {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .success {
    background-color: $success;
  }

  .alert {
    background-color: $alert;
  }

  .confirmation {
    text-align: center;
  }

  h3 {
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  p {
    margin: 0;
  }

  textarea {
    height: 125px;
  }
</style>
