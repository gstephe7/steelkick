<template>
  <div main>

    <h1>Your Cart</h1>

    <div v-if="cart.length > 0">
      <CartSeller v-if="cart.length > 0"
                  v-for="order in cart"
                  :key="order._id"
                  :order="order">
      </CartSeller>
    </div>

    <div col v-else>
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
      let newData = res.data.cart.reverse()
      this.cart = res.data.cart
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
