<template>
  <div id="cart">

    <h2>Your Cart</h2>

    <CartSeller v-for="order in cart"
                :key="order.seller"
                :order="order">
    </CartSeller>

  </div>
</template>

<script>
import CartSeller from '@/components/cart/CartSeller'

export default {
  components: {
    CartSeller
  },
  data () {
    return {
      id: 'gdjskw1928',
      cart: [
        {
          seller: 'Benco Welding Inc.',
          deliveryOffered: true,
          delivery: false,
          deliveryPrice: 3.32,
          distance: 23,
          order: [
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
              materialPrice: 44.76,
              subtotal: 54.76
            },
            {
              id: 'gsh28dh7263',
              shape: 'l',
              dimension: '3 1/2 x 3 1/2 x 5/16',
              feet: 8,
              inches: 6,
              numerator: 15,
              denominator: 16,
              cwt: 39,
              grade: 'A36',
              heat: '593736718',
              quantity: 100,
              domestic: true,
              painted: true,
              galvanized: true,
              company: 'Benco Welding Inc.',
              city: 'Winder',
              state: 'GA',
              cut: false,
              cuts: [],
              cutCost: 0,
              materialPrice: 2500.19,
              subtotal: 2500.19
            }
          ]
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
</style>
