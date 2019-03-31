<template>
  <div>

    <hr>

    <h2>
      Order With
      <router-link :to="{ name: 'Company', query: { id: order.seller._id } }">
        {{ order.seller.name }}
      </router-link>
    </h2>

    <!-- Items ordered from seller -->
    <div>
      <MaterialPreview v-for="item in order.order"
                       :key="item._id"
                       :item="item.material"
                       :order="item"
                       :cartId="order._id"
                       :cartItem="true"
                       :transaction="true">
      </MaterialPreview>
    </div>

    <br>

    <!-- Add more material from seller -->
    <section col>
      <p>Add more material for this shipment</p>
      <button @click="addMaterial">Add Material</button>
    </section>

    <br>

    <!-- Delivery -->
    <div col end>
      <label between align>
        Delivery?
        <div>
          <select v-if="order.seller.delivery.offered && this.deliveryWeightExceeded === false" v-model="delivery.selected" @change="updateDelivery">
            <option :value="undefined" disabled selected>Pickup/Delivery</option>
            <option :value="false">Pickup</option>
            <option :value="true">Delivery (${{ order.seller.delivery.price }}/mile)</option>
          </select>
          <select v-else>
            <option selected disabled>Pickup Only</option>
          </select>
        </div>
      </label>
    </div>

    <!-- Address Invalid Alert -->
    <div errors v-if="addressInvalid">
      <p>Please enter a valid address for your company's profile before requesting delivery</p>
    </div>

    <!-- Max Delivery Weight Exceeded Alert -->
    <div errors v-if="deliveryWeightExceeded">
      <p>This order exceeds the seller's maximum delivery weight of {{ order.seller.delivery.maxWeight }} lbs</p>
    </div>

    <!-- Distance Away -->
    <dl col end fieldset>
      <div row>
        <dt>
          Distance:
        </dt>
        <dd>
          <p v-if="order.delivery.distance">{{ order.delivery.distance.toFixed(2) }} miles</p>
        </dd>
      </div>
    </dl>

    <!-- Price Breakdown -->
    <dl col end fieldset>

      <div row>
        <dt>
          Total Weight:
        </dt>
        <dd>
          {{ totalWeight.toFixed(2) }} lbs
        </dd>
      </div>

      <div row>
        <dt>
          Material:
        </dt>
        <dd>
          {{ materialPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </dd>
      </div>

      <div row>
        <dt>
          Delivery:
        </dt>
        <dd>
          {{ totalDeliveryPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
        </dd>
      </div>

      <div row>
        <dt>
          <h3>Total: </h3>
        </dt>
        <dd>
          <h3>{{ totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h3>
        </dd>
      </div>

    </dl>

    <!-- Checkout Button -->
    <div col center>
      <button green @click="checkout">Checkout with {{ order.seller.name }}</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import MaterialPreview from '@/components/material/MaterialPreview'

export default {
  components: {
    MaterialPreview
  },
  props: ['order'],
  data () {
    return {
      delivery: {
        selected: this.order.delivery.selected
      },
      addressInvalid: false
    }
  },
  computed: {
    materialPrice () {
      let totalMaterialPrice = 0

      this.order.order.forEach(order => {
        totalMaterialPrice += parseFloat(order.subtotalPrice)
      })

      return totalMaterialPrice
    },
    // calculate cost of delivery
    totalDeliveryPrice () {
      if (this.delivery.selected) {
        let distancePrice = parseFloat(this.order.delivery.distance) * parseFloat(this.order.seller.delivery.price)
        return parseFloat(this.order.seller.delivery.fee) + distancePrice
      } else {
        return 0
      }
    },
    // total weight of entire order
    totalWeight () {
      let weight = 0
      this.order.order.forEach(item => {
        weight = weight + parseFloat(item.weight)
      })
      return weight
    },
    // alerts the buyer that the seller will not be able to ship this order due to excessive weight
    deliveryWeightExceeded () {
      if (this.order.seller.delivery.offered) {
        if (this.totalWeight <= this.order.seller.delivery.maxWeight) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
    },
    // alerts the buyer if any of the material order exceed the max length the seller can ship
    deliveryLengthExceeded () {
      let lengthExceeded = false
      this.order.order.forEach(item => {
        if (item.cuts.length > 0) {

        }
      })
      return lengthExceeded
    },
    totalPrice () {
      if (this.delivery.selected) {
        return parseFloat(this.totalDeliveryPrice) + parseFloat(this.materialPrice)
      } else {
        return this.materialPrice
      }
    }
  },
  methods: {
    addMaterial () {
      this.$router.push({
        name: 'Listings',
        query: {
          cart: true,
          forSale: true,
          company: this.order.seller._id
        }
      })
    },
    editItem (item) {
      this.$router.push({
        path: '/listing',
        query: {
          cart: true,
          id: item.material._id,
          seller: this.order.seller._id,
          orderId: item._id,
          cartId: this.order._id
        }
      })
    },
    updateDelivery () {
      if (this.$store.getters.addressValid) {
        api.axios.put(`${api.baseUrl}/cart/edit-delivery`, {
          id: this.order._id,
          selected: this.delivery.selected,
          distance: this.order.delivery.distance,
          price: this.totalDeliveryPrice
        })
        .then(res => {
          this.delivery = res.data.delivery
        })
        .catch(() => {
        })
      } else {
        this.delivery.selected = false
        this.addressInvalid = true
      }
    },
    checkout () {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/cart/update-cart`, {
        id: this.order._id,
        weight: this.totalWeight,
        materialPrice: this.materialPrice,
        totalPrice: this.totalPrice
      })
      .then(() => {
        this.$router.push({
          name: 'Checkout',
          query: {
            id: this.order._id
          }
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
