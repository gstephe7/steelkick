<template>
  <div id="transactions">

    <h3>Transaction History</h3>

    <div class="transaction-list" v-if="transactions.length > 0">

      <div class="transaction" v-for="item in transactions" :key="item.id" @click="viewTransaction(item)">

        <TransactionEntry :item="item"></TransactionEntry>

      </div>

    </div>

    <div v-else class="error">
      <p>You don't have any transactions yet</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import TransactionEntry from '@/components/transactions/TransactionEntry'

export default {
  components: {
    TransactionEntry
  },
  data () {
    return {
      transactions: []
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/orders/transactions`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.transactions = res.data.order.reverse()
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    viewTransaction (item) {
      this.$router.push({
        path: 'transaction-details',
        query: {
          order: item._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #transactions {
    max-width: 800px;
    margin: auto;
    padding: 10px;
  }

  h3 {
    text-align: center;
  }

  .transaction-list {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 300px;
  }

  .transaction {
    width: 100%;
    cursor: pointer;
  }

  .error {
    text-align: center;
  }
</style>
