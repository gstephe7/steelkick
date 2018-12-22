<template>
  <div id="order-page">

    <h3>Pending Orders</h3>

    <div class="pending-orders">

      <div class="order-div">

        <hgroup>
          <h4>Orders Received</h4>
        </hgroup>

        <div class="orders">

          <div class="order" v-for="order in received" :key="order.id" @click="viewOrderDetails({ order: order, received: true })">

            <OrderPreview :order="order" :received="true"></OrderPreview>

          </div>

        </div>

      </div>

      <div class="order-div">

        <hgroup>
          <h4>Orders Placed</h4>
        </hgroup>

        <div class="orders">

          <div class="order" v-for="order in placed" :key="order.id" @click="viewOrderDetails({ order: order, received: false })">

            <OrderPreview :order="order" :placed="true"></OrderPreview>

          </div>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
import OrderPreview from '@/components/orders/OrderPreview'

export default {
  components: {
    OrderPreview
  },
  data () {
    return {
      received: [
        {
          buyer: {
            company: 'AMD Welding',
            contactName: 'Derrick Thomas',
            phone: '678-233-7110',
            email: 'dthomas@amdwelding.com',
            street: '1162 Winder Industrial Pkwy',
            city: 'Winder',
            state: 'GA',
            zipcode: '30656'
          },
          seller: {
            company: 'Benco Welding Inc.',
            contactName: 'Butch Davis',
            phone: '678-233-7110',
            email: 'butch@bencowelding.com',
            street: '1163 Winder Industrial Pkwy',
            city: 'Winder',
            state: 'GA',
            zipcode: '30656'
          },
          date: '12/22/2018',
          time: '12:15',
          remarks: 'Will pickup tomorrow around 12 if that\'s ok',
          delivery: false,
          deliveryCost: 0,
          materialPrice: 44.76,
          total: 54.76,
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
          buyer: {
            company: 'Quality Welding',
            contactName: 'Lee Leet',
            phone: '678-233-7110',
            email: 'leelee@qualitywelding.com',
            street: '1200 Carl-Bethlehem Hwy',
            city: 'Auburn',
            state: 'GA',
            zipcode: '30658'
          },
          seller: {
            company: 'Benco Welding Inc.',
            contactName: 'Butch Davis',
            phone: '678-233-7110',
            email: 'butch@bencowelding.com',
            street: '1162 Winder Industrial Pkwy',
            city: 'Winder',
            state: 'GA',
            zipcode: '30656'
          },
          date: '12/21/2018',
          time: '13:57',
          remarks: 'Deliver ASAP',
          delivery: true,
          deliveryCost: 45.66,
          materialPrice: 64.99,
          total: 105.75,
          order: [
            {
              id: 'gsh27dh7261',
              shape: 'l',
              dimension: '2x2x1/4',
              feet: 20,
              inches: null,
              numerator: null,
              denominator: null,
              cwt: 39,
              grade: 'A36',
              heat: '593726738',
              quantity: 2,
              domestic: true,
              painted: false,
              galvanized: false,
              cut: false,
              cuts: [],
              cutCost: 0,
              materialPrice: 64.99,
              subtotal: 64.99
            }
          ]
        }
      ],
      placed: [
        {
          buyer: {
            company: 'Benco Welding Inc.',
            contactName: 'Butch Davis',
            phone: '678-233-7110',
            email: 'butch@bencowelding.com',
            street: '1162 Winder Industrial Pkwy',
            city: 'Winder',
            state: 'GA',
            zipcode: '30656'
          },
          seller: {
            company: 'RAI',
            contactName: 'Matt Reneike',
            phone: '678-233-7110',
            email: 'matt@raisteel.com',
            street: '2005 Hwy 441',
            city: 'Athens',
            state: 'GA',
            zipcode: '30606',
          },
          date: '12/21/2018',
          time: '11:54',
          remarks: '',
          delivery: false,
          deliveryCost: 0,
          materialPrice: 510.23,
          total: 510.23,
          order: [
            {
              id: 'gsh27dh7262',
              shape: 'hss',
              dimension: '3 1/2 x 3 1/2 x 5/16',
              feet: 20,
              inches: null,
              numerator: null,
              denominator: null,
              cwt: 40,
              grade: 'A992',
              heat: '593716718',
              quantity: 3,
              domestic: true,
              painted: false,
              galvanized: false,
              cut: false,
              cuts: [],
              cutCost: 0,
              materialPrice: 510.23,
              subtotal: 510.23
            }
          ]
        }
      ]
    }
  },
  methods: {
    viewOrderDetails ({order, received}) {
      this.$router.push({
        path: 'order-details',
        query: {
          order: order,
          received: received
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #order-page {
    padding: 10px;
    max-width: 800px;
    margin: auto;
  }

  h3 {
    text-align: center;
  }

  .pending-orders {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }

  .order-div {
    box-shadow: $box-shadow;
    margin: 15px;
    min-width: 300px;
    flex: 1;
  }

  .order {
    cursor: pointer;
  }

  hgroup {
    padding: 10px;
    h4 {
      font-weight: bold;
      margin: 0;
    }
    box-shadow: $box-shadow;
  }
</style>
