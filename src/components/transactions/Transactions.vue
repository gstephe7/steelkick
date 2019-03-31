<template>
  <div main>

    <h1>Transaction History</h1>

    <div v-if="transactions.length > 0">

      <TransactionEntry v-for="item in transactions"
                        :key="item._id"
                        :item="item">
      </TransactionEntry>

    </div>

    <div v-else>
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
    .catch(() => {
      this.$store.dispatch('complete')
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
