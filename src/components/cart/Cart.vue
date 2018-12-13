<template>
  <div id="cart">

    <h2>Your Cart</h2>

    <div class="cart-items">
      <CartItem v-for="item in cart"
                      :item="item">
      </CartItem>
    </div>

  </div>
</template>

<script>
import CartItem from '@/components/cart/CartItem'

export default {
  components: {
    CartItem
  },
  data () {
    return {
      cart: [
        {
          id: 'gsh27dh7263',
          shape: 'w',
          dimension: '8x10',
          feet: 10,
          inches: 7,
          numerator: 7,
          denominator: 8,
          cwt: 42,
          grade: 'A992',
          heat: '593726718',
          quantity: 1,
          domestic: true,
          painted: true,
          galvanized: true,
          company: 'Benco Welding Inc.',
          city: 'Winder',
          state: 'GA',
          cut: true,
          delivery: true,
          deliveryCost: 46,
          cuts: [
            {
              quantity: 1,
              feet: 5,
              inches: 6,
              numerator: 7,
              denominator: 16
            },
            {
              quantity: 1,
              feet: 5,
              inches: 1,
              numerator: 7,
              denominator: 16
            }
          ],
          cutCost: 10,
          materialPrice: 44.76
        }
      ]
    }
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

  .cart-items {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
