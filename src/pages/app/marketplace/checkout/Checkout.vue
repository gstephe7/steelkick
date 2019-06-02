<template>
  <div main v-if="loaded">

    <h1>Checkout</h1>

    <h2>Order from {{ order.seller.name }}</h2>

    <br>
    <br>

    <!-- Price Breakdown -->
    <dl col end fieldset>

      <div row>
        <dt>
          Shipping Method:
        </dt>
        <dd>
          <span v-if="order.delivery.selected">
            Delivery
          </span>
          <span v-else>
            Pickup
          </span>
        </dd>
      </div>

      <div row>
        <dt>
          Total Weight:
        </dt>
        <dd>
          {{ order.weight.toFixed(2) }} lbs
        </dd>
      </div>

      <div row>
        <dt>
          Material:
        </dt>
        <dd>
          {{ order.materialPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </dd>
      </div>

      <div row v-if="order.delivery.selected">
        <dt>
          Delivery:
        </dt>
        <dd>
          {{ order.delivery.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </dd>
      </div>

      <div row>
        <dt>
          <h2>Total: </h2>
        </dt>
        <dd>
          <h2>{{ order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h2>
        </dd>
      </div>

    </dl>


    <!-- Place Order Button -->
    <div col center>
      <button green @click="placeOrder">Place Order</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      order: {},
      loaded: false
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
      this.order = res.data.order
      this.loaded = true
      this.$store.dispatch('complete')
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    placeOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/new-order`, {
        order: this.order
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.$router.push({
          name: 'CheckoutConfirmation',
          params: this.order
        })
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  h2, h3 {
    font-weight: bold;
  }

  p {
    margin: 0;
  }
</style>
