<template>
  <div main v-if="loaded">

    <span back @click="$router.back()">
      &lt; Back to transactions
    </span>

    <h1>Transaction Details</h1>

    <!-- Company Info -->
    <div>
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
      <p>Date: {{ order.date }}</p>
    </div>

    <br>

    <div>

    </div>

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
    api.axios.get(`${api.baseUrl}/orders/order`, {
      params: {
        id: this.$route.query.order
      }
    })
    .then(res => {
      this.order = res.data.order
      this.loaded = true
      this.$store.dispatch('complete')

      this.$store.getters.notifications.forEach(item => {
        if (item.subject == this.order._id) {
          this.$store.dispatch('notificationViewed', this.order._id)
        }
      })
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  },
  computed: {
    company () {
      if (this.order.buyer._id == this.$store.getters.companyId) {
        return this.order.seller
      } else {
        return this.order.buyer
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  h2 {
    font-weight: bold;
  }

  p {
    margin: 0;
  }
</style>
