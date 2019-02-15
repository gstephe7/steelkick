<template>
  <div id="order-page">

    <h3>Pending Orders</h3>

    <div class="pending-orders">

      <div class="order-div">

        <hgroup>
          <h4>Orders Received</h4>
        </hgroup>

        <div class="orders" v-if="received.length > 0">

          <div class="order" v-for="order in received" :key="order._id" @click="viewOrderDetails({ order: order, received: true })">

            <OrderPreview :order="order" :received="true"></OrderPreview>

          </div>

        </div>

        <div v-else class="empty">
          <p>None at this time</p>
        </div>

      </div>

      <div class="order-div">

        <hgroup>
          <h4>Orders Placed</h4>
        </hgroup>

        <div v-if="placed.length > 0" class="orders">

          <div class="order" v-for="order in placed" :key="order._id" @click="viewOrderDetails({ order: order, received: false })">

            <OrderPreview :order="order" :placed="true"></OrderPreview>

          </div>

        </div>

        <div v-else class="empty">
          <p>None at this time</p>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import OrderPreview from '@/components/orders/OrderPreview'

export default {
  components: {
    OrderPreview
  },
  data () {
    return {
      received: [],
      placed: []
    }
  },
  created () {
    // send request for orders received
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/orders/orders-received`, {
      params: {
        company: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.received = res.data.order.reverse()
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })

    // send request for orders placed
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/orders/orders-placed`, {
      params: {
        company: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      console.log(res)
      this.placed = res.data.order.reverse()
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    viewOrderDetails ({order, received}) {
      this.$router.push({
        path: 'order-details',
        query: {
          order: order._id,
          received: received
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #order-page {
    padding: 10px;
    max-width: 800px;
    margin: auto;
  }

  h3 {
    text-align: center;
  }

  .pending-orders {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .order-div {
    box-shadow: $box-shadow;
    margin: 15px;
    min-width: 300px;
    flex: 1;
  }

  .order {
    cursor: pointer;
  }

  hgroup {
    padding: 10px;
    h4 {
      font-weight: bold;
      margin: 0;
    }
    box-shadow: $box-shadow;
  }

  .empty {
    padding: 10px;
  }
</style>
