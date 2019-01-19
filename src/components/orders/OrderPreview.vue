<template>
  <div id="order-preview">

    <div class="contact-info">

      <!-- Buyer Info -->
      <div class="buyer-info">
        <p class="title">Buyer</p>
        <p>{{ order.order.buyer.name }}</p>
        <p>{{ order.order.buyer.city }}, {{ order.order.buyer.state }}</p>
        <p>{{ order.order.buyer.contactName }}</p>
        <p>{{ order.order.buyer.phone }}</p>
      </div>

      <!-- Seller Info -->
      <div class="seller-info">
        <p class="title">Seller</p>
        <p>{{ order.order.seller.name }}</p>
        <p>{{ order.order.seller.city }}, {{ order.order.seller.state }}</p>
        <p>{{ order.order.seller.contactName }}</p>
        <p>{{ order.order.seller.phone }}</p>
      </div>

    </div>

    <!-- Info on order transaction -->
    <div class="info-div">
      <p class="title">Order</p>
      <p>Date Placed: {{ order.date }}</p>
      <p>Time Placed: {{ order.time }}</p>
      <p>Total: {{ order.order.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
    </div>

    <!-- Info on material ordered -->
    <div class="info-div">
      <p class="title">Material Ordered</p>
      <div v-for="item in order.order.order" :key="item.id">
        <p>
          <span>
            ({{ item.quantity }})
          </span>
          <span>
            {{ item.material.shape.toUpperCase() }}
          </span>
          <span>
            {{ item.material.dimension }}
          </span>
          x
          <span>
            <span v-if="item.material.feet">
              {{ item.material.feet }}'
            </span>
            <span v-if="item.material.inches">
              {{ item.material.inches }}"
            </span>
            <span v-if="item.material.numerator">
              {{ item.material.numerator }}/{{ item.material.denominator }}
            </span>
          </span>
        </p>
      </div>
    </div>

    <!-- Click Message -->
    <div class="click-message">
      <p v-if="received">Click to view details and confirm/deny this order</p>
      <p v-if="placed">Click to view details or cancel this order</p>
    </div>

  </div>
</template>

<script>
export default {
  props: ['order', 'received', 'placed']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #order-preview {
    box-shadow: $box-shadow;
    padding: 10px;
  }

  .contact-info {
    display: flex;
    justify-content: space-between;
  }

  .seller-info {
    text-align: right;
  }

  .info-div {
    margin-top: 10px;
  }

  .click-message {
    margin-top: 25px;
    color: royalblue;
    text-decoration: underline;
    font-style: italic;
    text-align: center;
  }

  p {
    margin: 0;
  }

  .title {
    text-decoration: underline;
  }
</style>
