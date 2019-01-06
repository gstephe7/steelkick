<template>
  <div id="cart-seller">

    <h3>Order From {{ order.seller }}</h3>

    <!-- Items ordered from seller -->
    <div class="cart-items">

      <div v-for="item in order.order" :key="item.id" @click="$router.push({ path: '/listing', query: { cart: true, item: item } })" class="cart-item">

        <CartItem :item="item">
          <button class="remove-btn" @click="removeItem">Remove from Cart</button>
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
        <select v-if="order.deliveryOffered" v-model="order.delivery">
          <option :value="false">Pickup</option>
          <option :value="true">Delivery (${{ order.deliveryPrice }}/mile)</option>
        </select>
        <select v-else>
          <option selected disabled>Pickup Only</option>
        </select>
      </div>
    </div>

    <!-- Price Breakdown -->
    <div class="price-div">
      <div class="price-box">
        <div class="item">
          <p>Material: </p>
        </div>
        <div class="price">
          <p>${{ materialPrice.toLocaleString() }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <p>Delivery: </p>
        </div>
        <div class="price">
          <p>${{ totalDeliveryPrice.toFixed(2) }}</p>
        </div>
      </div>
      <div class="price-box">
        <div class="item">
          <h3>Total: </h3>
        </div>
        <div class="price">
          <h3>${{ totalPrice.toLocaleString() }}</h3>
        </div>
      </div>
    </div>

    <!-- Checkout Button -->
    <div class="checkout">
      <button class="checkout-btn" @click="checkout">Checkout</button>
    </div>

  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem'

export default {
  components: {
    CartItem
  },
  props: ['order'],
  computed: {
    materialPrice () {
      let totalMaterialPrice = 0

      this.order.order.forEach(order => {
        totalMaterialPrice += parseFloat(order.subtotal)
      })

      return totalMaterialPrice
    },
    // calculate cost of delivery
    totalDeliveryPrice () {
      if (this.order.delivery) {
        return parseFloat(this.order.distance) * parseFloat(this.order.deliveryPrice)
      } else {
        return 0
      }
    },
    totalPrice () {
      if (this.order.delivery) {
        return parseFloat(this.order.deliveryPrice) + this.materialPrice
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
          company: this.order.seller
        }
      })
    },
    removeItem () {

    },
    checkout () {
      this.$router.push({
        name: 'Checkout',
        params: {
          seller: this.order.seller,
          order: this.order.order,
          materialPrice: this.materialPrice,
          deliveryPrice: this.order.deliveryPrice,
          totalPrice: this.totalPrice
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #cart-seller {
    margin-top: 50px;
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

  h3 {
    font-weight: bold;
    margin: 10px 0 10px 0;
  }

  b, p {
    margin: 0;
  }
</style>
