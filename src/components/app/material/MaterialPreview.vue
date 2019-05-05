<template>
  <div card click @click="viewDetails">

    <div between>

      <!-- Shape and Dimension -->
      <h4>
        {{ item.shape.toUpperCase() }} {{ item.dimension }}
      </h4>

      <!-- Hundred Weight Price -->
      <h4 v-if="item.forSale">${{ item.cwt }} Cwt</h4>
      <h4 v-else>Not For Sale</h4>

    </div>

    <div between>

      <!-- Length -->
      <span>
        <span v-if="this.feet">
          {{ this.feet }}'
        </span>
        <span v-if="this.inches">
          {{ this.inches }}"
        </span>
        <span v-else>
          0"
        </span>
        <span v-if="this.fraction">
          {{ this.fraction }}
        </span>
      </span>

      <!-- Quantity -->
      <span v-if="transaction">
        {{ order.quantity }} added
      </span>
      <span v-else>
        {{ item.quantity }} available
      </span>

    </div>

    <br>

    <!-- Specifications -->
    <div between>

      <!-- Item Information -->
      <div col start>

        <!-- Grade and Origin -->
        <div>
          <span>
            {{ item.grade }}
          </span>
          <div>
            <span v-if="item.domestic">
              Domestic
            </span>
            <span v-else>
              Foreign
            </span>
          </div>
        </div>

        <!-- Heat Numbers -->
        <div v-if="item.heat">
          <div v-if="transaction">
            Heat #: {{ item.heat }}
          </div>
          <div v-else-if="inventory">
            Heat #: {{ item.heat }}
          </div>
          <div v-else>
            <i check>&#10004;</i> Heat #'s included
          </div>
        </div>

        <!-- Galvanized or Primed -->
        <div>
          <div v-if="item.galvanized">
            <i check>&#10004;</i> Galvanized
          </div>
          <div v-if="item.primed">
            <i check>&#10004;</i> Primed
          </div>
        </div>

      </div>

      <!-- Location or Company Info (if buying) -->
      <div col end>

        <div v-if="inventory">
          <span>
            Location: {{ item.location }}
          </span>
        </div>

        <div v-if="buying">
          <strong>
            {{ item.company.name }}
          </strong>
          <address v-if="item.company.city && item.company.state">
            {{ item.company.city }}, {{ item.company.state }}
          </address>
          <div v-if="item.company.delivery.offered">
            <i check>&#10004;</i> Offers Delivery
          </div>
          <div v-if="item.company.cut.offered">
            <i check>&#10004;</i> Offers Cut to Order
          </div>
        </div>

      </div>

    </div>

    <!-- Remarks -->
    <div col start v-if="item.remarks">
      <br>
      <small>
        Remarks: {{ item.remarks }}
      </small>
    </div>

    <br>

    <!-- Order information if preview is cart item -->
    <div v-if="transaction">

      <!-- Cuts Requested -->
      <div v-if="order.cuts.length > 0">
        <p>Cuts Requested</p>
        <div sub v-for="(cut, index) in order.cuts" :key="index">
          <span>
            {{ cut.quantity }} @
          </span>
          <span v-if="cut.feet">
            {{ cut.feet }}'
          </span>
          <span v-if="cut.inches">
            {{ cut.inches }}"
          </span>
          <span v-if="cut.numerator">
            {{ cut.numerator }}/{{ cut.denominator }}
          </span>
        </div>
      </div>

      <!-- Material and Cut Price Breakdown -->
      <dl col end>

        <!-- Item Weight -->
        <div row>
          <dt>
            Weight:
          </dt>
          <dd>
            {{ order.weight.toFixed(2) }} lbs
          </dd>
        </div>

        <!-- subtotal for material alone -->
        <div row>
          <dt>
            Material:
          </dt>
          <dd>
            {{ order.materialPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          </dd>
        </div>

        <!-- total for cut expenses -->
        <div row>
          <dt>
            Cut Expense:
          </dt>
          <dd>
            {{ order.cutPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
          </dd>
        </div>

        <!-- subtotal for order item -->
        <div row>
          <dt>
            <b>
              Subtotal:
            </b>
          </dt>
          <dd>
            <b>
              {{ order.subtotalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </b>
          </dd>
        </div>

      </dl>

    </div>

    <!-- Click Message -->
    <div col>
      <em v-if="inventory">Click to edit material</em>
      <em v-if="buying">Click for information/to place order</em>
      <em v-if="cartItem">Click to edit this item/remove item from cart</em>
    </div>

  </div>
</template>

<script>
import method from '@/global/methods.js'

export default {
  props: ['item', 'order', 'cartId', 'cartItem', 'checkout', 'transaction', 'buying', 'inventory'],
  computed: {
    feet () {
      return method.getFeet(this.item.length)
    },
    inches () {
      return method.getInches(this.item.length)
    },
    fraction () {
      return method.getFraction(this.item.length)
    }
  },
  methods: {
    viewDetails () {
      if (this.inventory) {
        this.$router.push({
          name: 'MaterialPage',
          query: {
            materialId: this.item._id
          }
        })
      } else if (this.buying) {
        this.$router.push({
          path: '/listing',
          query: {
            buying: true,
            id: this.item._id
          }
        })
      } else if (this.cartItem) {
        this.$router.push({
          path: '/listing',
          query: {
            cart: true,
            id: this.item._id,
            orderId: this.order._id,
            cartId: this.cartId
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  h4 {
    @media screen and (min-width: 500px) {
      font-size: 22px;
    }
  }

  p {
    margin: 0;
  }
</style>
