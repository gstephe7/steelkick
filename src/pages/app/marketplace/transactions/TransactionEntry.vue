<template>
  <section card click @click="viewTransaction()">

    <div class="new" v-if="newTransaction">
      New
    </div>

    <div between>

      <div>
        <b v-if="purchase">
          Purchase
        </b>
        <b v-else>
          Sale
        </b>
      </div>

      <div>
        <b v-if="purchase">-{{ item.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</b>
        <b v-else>{{ item.totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</b>
      </div>

    </div>

    <div between>

      <div>
        <span>
          {{ item.date }}
        </span>
      </div>

      <div>
        <span v-if="purchase">
          {{ item.seller.name }}
        </span>
        <span v-else>
          {{ item.buyer.name }}
        </span>
      </div>

    </div>

  </section>
</template>

<script>
export default {
  props: ['item'],
  computed: {
    purchase () {
      if (this.item.buyer._id == this.$store.getters.companyId) {
        return true
      } else {
        return false
      }
    },
    newTransaction () {
      // if (this.$store.getters.notifications.length > 0) {
      //
      //   let isNew = false
      //
      //   this.$store.getters.notifications.forEach(item => {
      //     if (item.subject == this.item._id) {
      //       isNew = true
      //     }
      //   })
      //
      //   return isNew
      //
      // } else {
        return false
      // }
    }
  },
  methods: {
    viewTransaction () {
      this.$router.push({
        path: 'transaction-details',
        query: {
          order: this.item._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .new {
    position: absolute;
    opacity: .2;
    font-size: 40px;
    width: 150px;
    text-align: center;
    margin-top: -3px;
    margin-right: auto;
    margin-left: auto;
    left: 0;
    right: 0;
    font-weight: bold;
    color: $success;
  }
</style>
