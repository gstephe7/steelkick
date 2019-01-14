<template>
  <div id="cart">

    <h2>Your Cart</h2>

    <div v-if="cart.length > 0">
      <CartSeller v-if="cart.length > 0"
                  v-for="order in cart"
                  :key="order._id"
                  :order="order">
      </CartSeller>
    </div>

    <div v-else class="empty-cart">
      <p>Your cart is empty</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import CartSeller from '@/components/cart/CartSeller'

export default {
  components: {
    CartSeller
  },
  data () {
    return {
      cart: []
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/cart/view-cart`, {
      params: {
        buyer: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.cart = res.data.cart
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #cart {
    padding: 10px;
    max-width: 800px;
    margin: auto;
  }

  .seller-div {
    margin-top: 50px;
  }

  .cart-items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .price-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  h3 {
    font-weight: bold;
  }

  .empty-cart {
    text-align: center;
  }
</style>
