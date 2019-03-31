<template>
  <div card click @click="viewOrderDetails()">

    <div v-if="newOrder" class="new">
      New
    </div>

    <div between>

      <!-- Buyer Info -->
      <div col start>
        <strong>Buyer</strong>
        <p>{{ order.buyer.name }}</p>
        <p>{{ order.buyer.city }}, {{ order.buyer.state }}</p>
        <p>{{ order.buyer.contactName }}</p>
        <p>{{ order.buyer.phone }}</p>
      </div>

      <!-- Seller Info -->
      <div col end>
        <strong>Seller</strong>
        <p>{{ order.seller.name }}</p>
        <p>{{ order.seller.city }}, {{ order.seller.state }}</p>
        <p>{{ order.seller.contactName }}</p>
        <p>{{ order.seller.phone }}</p>
      </div>

    </div>

    <br>

    <!-- Info on order transaction -->
    <div>
      <strong>Order</strong>
      <p>Date Placed: {{ order.date }}</p>
      <p>Time Placed: {{ order.time }}</p>
      <p v-if="order.delivery.selected">Delivery</p>
      <p v-else>Pickup</p>
      <p>Total: {{ order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
    </div>

    <br>

    <!-- Info on material ordered -->
    <div>
      <strong>Material Ordered</strong>
      <div v-for="item in order.order" :key="item._id">
        <p>
          <span>
            ({{ item.quantity }})
          </span>
          <span>
            {{ item.material.shape.toUpperCase() }}
          </span>
          <span>
            {{ item.material.dimension }}
          </span>
          x
          <span>
            <span v-if="item.material.feet">
              {{ item.material.feet }}'
            </span>
            <span v-if="item.material.inches">
              {{ item.material.inches }}"
            </span>
            <span v-if="item.material.numerator">
              {{ item.material.numerator }}/{{ item.material.denominator }}
            </span>
          </span>
          <span italic v-if="item.material.primed">
            Primed
          </span>
          <span italic v-if="item.material.galvanized">
            Galv.
          </span>
        </p>
        <p sub v-if="item.cuts.length > 0">
          Cuts
          <p sub v-for="cut in item.cuts">
            <span>
              ({{ cut.quantity }}) @
            </span>
            <span v-if="cut.feet">
              {{ cut.feet }}'
            </span>
            <span v-if="cut.inches">
              {{ cut.inches }}"
            </span>
            <span v-else>
              0"
            </span>
            <span v-if="cut.numerator">
              {{ cut.numerator }}/{{ cut.denominator }}
            </span>
          </p>
        </p>
      </div>
    </div>

    <br>

    <!-- Click Message -->
    <div col>
      <em v-if="received">Click to view details and confirm/deny this order</em>
      <em v-if="placed">Click to view details or cancel this order</em>
    </div>

  </div>
</template>

<script>
export default {
  props: ['order', 'received', 'placed'],
  computed: {
    newOrder () {
      if (this.$store.getters.notifications.length > 0) {

        let isNew = false

        this.$store.getters.notifications.forEach(item => {
          if (item.subject == this.order._id) {
            isNew = true
          }
        })

        return isNew

      } else {
        return false
      }
    }
  },
  methods: {
    viewOrderDetails () {
      this.$router.push({
        path: 'order-details',
        query: {
          order: this.order._id,
          received: this.received,
          placed: this.placed
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  p {
    margin: 0;
  }

  .new {
    position: absolute;
    opacity: .2;
    font-size: 100px;
    font-weight: bold;
    color: $success;
  }

  em {
    width: 100%;
  }
</style>
