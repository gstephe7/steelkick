<template>
  <div id="checkout">

    <span class="back" @click="$router.back()">
      &lt; Back to transactions
    </span>

    <h3 class="page-title">Transaction Details</h3>

    <!-- Company Info -->
    <div class="company-info" v-if="order.length > 0">
      <p>
        <router-link :to="{ name: 'Company', query: { id: company._id } }">
          {{ company.name }}
        </router-link>
      </p>
      <p>{{ company.street }}</p>
      <p>{{ company.city }}, {{ company.state }} {{ company.zipcode }}</p>
      <p>{{ company.contactName }}</p>
      <p>{{ company.phone }}</p>
      <p>{{ company.email }}</p>
      <br>
      <p>Date: {{ date }}</p>
    </div>

    <div class="order">

      <div class="order-item" v-for="item in order" :key="item._id">

          <CartItem :item="item"></CartItem>

      </div>

    </div>

    <!-- Price Breakdown -->
    <div class="price-div" v-if="order.length > 0">
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
      _id: null
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

      this.$store.getters.notifications.forEach(item => {
        if (item.subject == this._id) {
          this.$store.dispatch('notificationViewed', this._id)
        }
      })
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  },
  computed: {
    company () {
      if (this.buyer._id == this.$store.getters.companyId) {
        return this.seller
      } else {
        return this.buyer
      }
    },
    materialPrice () {
      let price = 0
      this.order.forEach(item => {
        price += parseFloat(item.subtotalPrice)
      })
      return price
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

  a {
    color: royalblue;
    text-decoration: none;
  }

  .back {
    color: royalblue;
    cursor: pointer;
  }
</style>
