<template>
  <div id="order-preview">

    <div class="contact-info">

      <!-- Buyer Info -->
      <div class="buyer-info">
        <p class="title">Buyer</p>
        <p>{{ order.buyer.company }}</p>
        <p>{{ order.buyer.city }}, {{ order.buyer.state }}</p>
        <p>{{ order.buyer.contactName }}</p>
        <p>{{ order.buyer.phone }}</p>
      </div>

      <!-- Seller Info -->
      <div class="seller-info">
        <p class="title">Seller</p>
        <p>{{ order.seller.company }}</p>
        <p>{{ order.seller.city }}, {{ order.seller.state }}</p>
        <p>{{ order.seller.contactName }}</p>
        <p>{{ order.seller.phone }}</p>
      </div>

    </div>

    <!-- Info on order transaction -->
    <div class="info-div">
      <p class="title">Order</p>
      <p>Date Placed: {{ order.date }}</p>
      <p>Time Placed: {{ order.time }}</p>
      <p>Total: ${{ order.total }}</p>
    </div>

    <!-- Info on material ordered -->
    <div class="info-div">
      <p class="title">Material Ordered</p>
      <div v-for="item in order.order" :key="item.id">
        <p>({{ item.quantity }}) {{ item.shape.toUpperCase() }} {{ item.dimension }}</p>
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
