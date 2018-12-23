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
import TransactionEntry from '@/components/transactions/TransactionEntry'

export default {
  components: {
    TransactionEntry
  },
  data () {
    return {
      transactions: [
        {
          id: 'gh365sfa1',
          type: 'Purchase',
          company: 'RAI',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 105.45,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/22/2018',
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
            }
          ]
        },
        {
          id: 'gh365sfa2',
          type: 'Sale',
          company: 'AMD Welding',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 22.45,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/21/2018',
          order: [
            {
              id: 'gsh37dh7263',
              shape: 'l',
              dimension: '3x3x1/4',
              feet: 20,
              inches: 7,
              numerator: 7,
              denominator: 8,
              cwt: 42,
              grade: 'A36',
              heat: '593326718',
              quantity: 3,
              domestic: true,
              painted: false,
              galvanized: false,
              cut: true,
              cuts: [],
              cutCost: 0,
              materialPrice: 44.76,
              subtotal: 54.76
            }
          ]
        },
        {
          id: 'gh365sfa3',
          type: 'Sale',
          company: 'Quality Welding',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 55.22,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/21/2018',
          order: [
            {
              id: 'gsh27dh7263',
              shape: 'c',
              dimension: '3x4.1',
              feet: 12,
              inches: 3,
              numerator: 15,
              denominator: 16,
              cwt: 42,
              grade: 'A36',
              heat: '593726718',
              quantity: 1,
              domestic: true,
              painted: true,
              galvanized: true,
              cut: true,
              cuts: [],
              cutCost: 0,
              materialPrice: 44.76,
              subtotal: 54.76
            }
          ]
        },
        {
          id: 'gh365sfa4',
          type: 'Sale',
          company: 'King Steel',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 503.40,
          date: '12/20/2018',
          order: [
            {
              id: 'gsh27dh7261',
              shape: 'w',
              dimension: '16x26',
              feet: 8,
              inches: null,
              numerator: null,
              denominator: null,
              cwt: 45,
              grade: 'A992',
              heat: '593736718',
              quantity: 5,
              domestic: true,
              painted: false,
              galvanized: false,
              cut: false,
              cuts: [],
              cutCost: 0,
              materialPrice: 44.76,
              subtotal: 54.76
            }
          ]
        },
        {
          id: 'gh365sfa5',
          type: 'Purchase',
          company: 'King Steel',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 50.20,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/20/2018',
          order: [
            {
              id: 'gsh27dh7363',
              shape: 'w',
              dimension: '8x18',
              feet: 9,
              inches: 6,
              numerator: 7,
              denominator: 8,
              cwt: 42,
              grade: 'A992',
              heat: '593766718',
              quantity: 1,
              domestic: true,
              painted: false,
              galvanized: false,
              cut: true,
              cuts: [],
              cutCost: 0,
              materialPrice: 44.76,
              subtotal: 54.76
            }
          ]
        },
        {
          id: 'gh365sfa6',
          type: 'Purchase',
          company: 'RAI',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 105.45,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/22/2018',
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
            }
          ]
        },
        {
          id: 'gh365sfa7',
          type: 'Purchase',
          company: 'RAI',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 105.45,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/22/2018',
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
            }
          ]
        },
        {
          id: 'gh365sfa8',
          type: 'Purchase',
          company: 'RAI',
          street: '2005 Hwy 441',
          city: 'Athens',
          state: 'GA',
          zipcode: '30606',
          contactName: 'Matt Reneike',
          phone: '678-233-7110',
          email: 'matt@raisteel.com',
          total: 105.45,
          materialPrice: 50.45,
          deliveryCost: 0,
          date: '12/22/2018',
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
            }
          ]
        }
      ]
    }
  },
  methods: {
    viewTransaction (item) {
      this.$router.push({
        path: 'transaction-details',
        query: {
          order: item
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
