<template>
  <div main>

    <h1>Pending Orders</h1>

    <div wrap>

      <section grow box card>

        <div>
          <h4>Orders Received</h4>
        </div>

        <hr>

        <div v-if="received.length > 0">

          <OrderPreview v-for="order in received"
                        :key="order._id"
                        :order="order"
                        :received="true">
          </OrderPreview>

        </div>

        <div v-else>
          <p>None at this time</p>
        </div>

      </section>

      <section grow box card>

        <div>
          <h4>Orders Placed</h4>
        </div>

        <hr>

        <div v-if="placed.length > 0">

          <OrderPreview v-for="order in placed"
                        :key="order._id"
                        :order="order"
                        :placed="true">
          </OrderPreview>

        </div>

        <div v-else>
          <p>None at this time</p>
        </div>

      </section>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import OrderPreview from '@/components/app/marketplace/orders/OrderPreview'

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
      this.received = res.data.order.reverse()
      this.$store.dispatch('complete')
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
      this.placed = res.data.order.reverse()
      this.$store.dispatch('complete')
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  }
}
</script>

<style lang="scss" scoped>

  section {
    min-height: 200px;
  }
</style>
