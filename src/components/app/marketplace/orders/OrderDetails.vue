<template>
  <div main v-if="loaded">

    <h1>Pending Order</h1>

    <hr>

    <div between wrap>

      <!-- Buyer Info -->
      <div box grow>
        <strong>Buyer</strong>
        <p>
          <router-link :to="{ name: 'Company', query: { id: order.buyer._id } }">
            {{ order.buyer.name }}
          </router-link>
        </p>
        <p>{{ order.buyer.street }}</p>
        <p>{{ order.buyer.city }}, {{ order.buyer.state }} {{ order.buyer.zipcode }}</p>
        <p>{{ order.buyer.contactName }}</p>
        <p>{{ order.buyer.phone }}</p>
        <p>{{ order.buyer.email }}</p>
        <p>Remarks: {{ order.buyer.remarks }}</p>
        <br>
      </div>

      <!-- Seller Info -->
      <div box grow>
        <strong>Seller</strong>
        <p>
          <router-link :to="{ name: 'Company', query: { id: order.seller._id } }">
            {{ order.seller.name }}
          </router-link>
        </p>
        <p>{{ order.seller.street }}</p>
        <p>{{ order.seller.city }}, {{ order.seller.state }} {{ order.seller.zipcode }}</p>
        <p>{{ order.seller.contactName }}</p>
        <p>{{ order.seller.phone }}</p>
        <p>{{ order.seller.email }}</p>
        <p>Remarks: {{ order.seller.remarks }}</p>
        <br>
      </div>

    </div>

    <!-- Date and Time order placed -->
    <div>
      <strong>Order Date/Time</strong>
      <p>{{ order.date }}</p>
      <p>{{ order.time }}</p>
    </div>

    <br>

    <div>
      <MaterialPreview v-for="item in order.order"
                       :key="item._id"
                       :item="item.material"
                       :order="item"
                       :transaction="true">
      </MaterialPreview>
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

    <!-- Confirm/Deny order for received order -->
    <div around v-if="$route.query.received">
      <button red @click="toggleDecline">Decline</button>
      <button green @click="toggleConfirm">Confirm</button>
    </div>

    <!-- Cancel placed order -->
    <div v-else col>
      <p>This order has been placed. Please wait to hear back from the seller for confirmation.</p>
      <button red @click="toggleCancel">Cancel Order</button>
    </div>

    <!-- Cancel/Decline Confirmation -->
    <div col v-if="showCancel">
      <p>
        Are you sure you want to cancel this order?
      </p>
      <div around>
        <button small @click="toggleCancel">No</button>
        <button small @click="cancelOrder">Yes</button>
      </div>
    </div>

    <!-- Decline Order -->
    <div col v-if="showDecline">
      <p>
        Send a message explaining why you had to decline this order request.
      </p>
      <textarea v-model="declineMessage"></textarea>
      <div around>
        <button small @click="toggleDecline">Cancel</button>
        <button small red @click="declineOrder">Decline Order</button>
      </div>
    </div>

    <!-- Confirm Order -->
    <div col v-if="showConfirm">
      <p>
        Send a message with your confirmation
      </p>
      <textarea v-model="confirmationMessage"></textarea>
      <div around>
        <button small @click="toggleConfirm">Cancel</button>
        <button small green @click="confirmOrder">Confirm Order</button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import MaterialPreview from '@/components/app/material/MaterialPreview'

export default {
  components: {
    MaterialPreview
  },
  data () {
    return {
      order: {},
      loaded: false,
      declineMessage: '',
      confirmationMessage: '',
      showCancel: false,
      showDecline: false,
      showConfirm: false,
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
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    removeNotification () {
      this.$store.getters.notifications.forEach(item => {
        if (item.subject == this.order._id) {
          this.$store.dispatch('notificationViewed', this.order._id)
        }
      })
    },
    cancelNotification () {
      api.axios.post(`${api.baseUrl}/users/notification-viewed`, {
        companyId: this.order.seller._id,
        subjectId: this.order._id
      })
    },
    toggleCancel () {
      this.showCancel = !this.showCancel
    },
    toggleDecline () {
      this.showDecline = !this.showDecline
    },
    toggleConfirm () {
      this.showConfirm = !this.showConfirm
    },
    cancelOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/cancel-order`, {
        id: this.order._id
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.cancelNotification()
        this.$router.push({ name: 'OrderPage' })
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    },
    declineOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/decline-order`, {
        id: this.order._id,
        msg: this.declineMessage
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.removeNotification()
        this.$router.push({ name: 'OrderPage' })
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    },
    confirmOrder () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/orders/confirm-order`, {
        id: this.order._id,
        msg: this.confirmationMessage
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.removeNotification()
        this.$router.push({ name: 'OrderPage' })
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
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

  textarea {
    height: 125px;
  }

  a {
    color: royalblue;
    text-decoration: none;
  }

  [box] {
    padding-right: 20px;
  }
</style>
