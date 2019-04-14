<template>
  <div main>

    <h1>Order Placed!</h1>

    <p>An email has been sent to both you and the seller with details for this order.</p>

    <h2>Order Confirmation</h2>

      <!-- Seller Info -->
      <dl>

        <div row start>
          <dt>
            Seller:
          </dt>
          <dd grow>
            {{ order.seller.name }}
          </dd>
        </div>

        <div row>
          <dt>
            Address:
          </dt>
          <dd grow>
            <address>
              {{ order.seller.street }} {{ order.seller.city }}, {{ order.seller.state }} {{ order.seller.zipcode }}
            </address>
          </dd>
        </div>

        <div row>
          <dt>
            Contact:
          </dt>
          <dd grow>
            {{ order.seller.contactName }}
          </dd>
        </div>

        <div row>
          <dt>
            Phone:
          </dt>
          <dd grow>
            {{ order.seller.phone }}
          </dd>
        </div>

        <div row>
          <dt>
            Email:
          </dt>
          <dd grow>
            {{ order.seller.email }}
          </dd>
        </div>

        <div row>
          <dt>
            Remarks:
          </dt>
          <dd grow>
            {{ order.seller.remarks }}
          </dd>
        </div>

      </dl>

      <!-- Items Ordered -->
      <h2>Order Details</h2>

      <MaterialPreview v-for="item in order.order"
                       :key="item._id"
                       :item="item.material"
                       :order="item"
                       :transaction="true">
      </MaterialPreview>

      <br>

      <!-- Price Breakdown -->
      <dl col end>

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

  </div>
</template>

<script>
import MaterialPreview from '@/components/app/material/MaterialPreview'

export default {
  components: {
    MaterialPreview
  },
  data () {
    return {
      order: this.$route.params
    }
  }
}
</script>

<style lang="scss" scoped>

  h2 {
    font-weight: bold;
  }

  p, em {
    margin: 0;
  }
</style>
