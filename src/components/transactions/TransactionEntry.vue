<template>
  <div id="transaction-entry">

    <div class="container">

      <div>
        <b>{{ item.type }}</b>
      </div>

      <div>
        <b v-if="item.type === 'Sale'">${{ item.total }}</b>
        <b v-if="item.type === 'Purchase'">-${{ item.total }}</b>
      </div>

    </div>

    <div class="container">

      <div>
        <p>{{ item.date }}</p>
      </div>

      <div>
        <p>{{ item.company }}</p>
      </div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #transaction-entry {
    box-shadow: $box-shadow;
    padding: 10px;
    margin: 5px 0 5px 0;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  p {
    margin: 0;
  }
</style>
