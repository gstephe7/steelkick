<template>
  <div id="cart-seller">

    <hr>

    <h3 class="heading">Order From {{ order.seller.name }}</h3>

    <!-- Items ordered from seller -->
    <div class="cart-items">

      <div v-for="item in order.order" :key="item._id" @click="editItem(item)" class="cart-item">

        <CartItem :item="item">
        </CartItem>

      </div>

    </div>

    <!-- Add more material from seller -->
    <div class="add-material">
      <p>Add more material for this shipment</p>
      <button @click="addMaterial">Add Material</button>
    </div>

    <!-- Delivery -->
    <div class="form-section">
      <div class="label">
        <label>Delivery?</label>
      </div>
      <div class="input">
        <select v-if="order.seller.delivery.offered && this.deliveryWeightExceeded === false" v-model="delivery.selected" @change="updateDelivery">
          <option :value="undefined" disabled selected>Pickup/Delivery</option>
          <option :value="false">Pickup</option>
          <option :value="true">Delivery (${{ order.seller.delivery.price }}/mile)</option>
        </select>
        <select v-else>
          <option selected disabled>Pickup Only</option>
        </select>
      </div>
    </div>

    <!-- Address Invalid Alert -->
    <div v-if="addressInvalid" class="alert">
      <p>Please enter a valid address for your company's profile before requesting delivery</p>
    </div>

    <!-- Max Delivery Weight Exceeded Alert -->
    <div v-if="deliveryWeightExceeded" class="alert">
      <p>This order exceeds the seller's maximum delivery weight of {{ order.seller.delivery.maxWeight }} lbs</p>
    </div>

    <!-- Distance Away -->
    <div class="price-div">
      <div class="price-box">
        <div class="item">
          <p>Distance</p>
        </div>
        <div class="price">
          <p v-if="order.delivery.distance">{{ order.delivery.distance.toFixed(2) }} miles</p>
        </div>
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
          <p>{{ totalDeliveryPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
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

    <!-- Checkout Button -->
    <div class="checkout">
      <button class="checkout-btn" @click="checkout">Checkout with {{ order.seller.name }}</button>
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
        return parseFloat(this.order.delivery.distance) * parseFloat(this.order.seller.delivery.price)
      } else {
        return 0
      }
    },
    deliveryWeightExceeded () {
      let totalWeight = 0
      this.order.order.forEach(item => {
        let weight = parseFloat(item.material.weightPerFoot)
        let feet = parseFloat(item.material.feet) || 0
        let inches = parseFloat(item.material.inches) || 0
        let numerator = parseFloat(item.material.numerator) || 0
        let denominator = parseFloat(item.material.denominator) || 0

        let fraction = (numerator > 0) ? (( numerator / denominator ) / 12) : 0
        let inchesToFeet = (inches > 0) ? inches / 12 : 0
        let length = feet + inchesToFeet + fraction

        let quantity = parseFloat(item.quantity)
        let orderWeight = weight * length * quantity

        totalWeight = totalWeight + orderWeight
      })

      if (this.order.seller.delivery.offered) {
        if (totalWeight <= this.order.seller.delivery.maxWeight) {
          return false
        } else {
          return true
        }
      } else {
        return false
      }
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
      this.$router.push({
        name: 'Checkout',
        query: {
          id: this.order._id,
          material: this.materialPrice,
          delivery: this.totalDeliveryPrice,
          total: this.totalPrice
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #cart-seller {
    margin: 75px 0 125px 0;
  }

  .heading {
    font-size: 22px;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .cart-item {
    width: 100%;
    display: flex;
    justify-content: center;
    cursor: pointer;
  }

  .add-material {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  .form-section {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-top: 50px;
    select {
      border: 1px solid $accent;
    }
  }

  .input {
    margin-left: 20px;
  }

  .price-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin: 10px 5px 0 0;
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

  .checkout {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .checkout-btn {
    background-color: $success;
  }

  .remove-btn {
    background-color: $alert;
  }

  .alert {
    color: $alert;
    text-align: right;
  }

  h3 {
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  b, p {
    margin: 0;
  }
</style>
