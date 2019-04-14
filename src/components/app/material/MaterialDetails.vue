<template>
    <div main>

      <div>
        <span back @click="$router.back()">
          <span v-if="$route.query.buying">
            &lt; Back to results
          </span>
          <span v-if="$route.query.cart">
            &lt; Back to cart
          </span>
        </span>
      </div>

      <div v-if="item">

        <!-- Heading with shape, cwt, length, and quantity -->
        <div between>
          <h1>
            {{ item.shape.toUpperCase() }} {{ item.dimension }}
          </h1>
          <h1>
            ${{ item.cwt }} Cwt
          </h1>
        </div>

        <div between>
          <span>
            <span v-if="item.feet">
              {{ item.feet }}'
            </span>
            <span v-if="item.inches">
              {{ item.inches }}"
            </span>
            <span v-else>
              0"
            </span>
            <span v-if="item.numerator">
              {{ item.numerator }}/{{ item.denominator }}
            </span>
          </span>

          <span>
            {{ item.quantity }} available
          </span>
        </div>

        <br>

        <div between>

          <!-- Additional details on material -->
          <div col start grow>
            <div>
              <span>
                {{ item.grade }}
              </span>
            </div>
            <div>
              <span v-if="item.domestic">
                Domestic
              </span>
              <span v-else>
                Foreign
              </span>
            </div>
            <div>
              <span>
                {{ item.condition }} condition
              </span>
            </div>
            <div v-if="item.heat">
              <i check>&#10004;</i>Heat #s included
            </div>
            <div v-if="item.primed">
              <i check>&#10004;</i>Primed
            </div>
            <div v-if="item.galvanized">
              <i check>&#10004;</i>Galvanized
            </div>
            <div v-if="item.remarks">
              <small>Remarks: {{ item.remarks }}</small>
            </div>
          </div>

          <!-- Information on company -->
          <div col end grow>
            <strong>
              <router-link :to="{ name: 'Company', query: { id: company._id } }">
                {{ company.name }}
              </router-link>
            </strong>
            <address>
              {{ company.city }}, {{ company.state }}
            </address>
            <div v-if="$store.getters.loggedIn">
              <span v-if="distance">
                {{ distance.toFixed(2) }} miles away
              </span>
              <span v-else>
                Distance N/A
              </span>
            </div>
            <div v-else>
              <span>
                Login to see distance
              </span>
            </div>
            <div>
              <span v-if="company.delivery.offered">
                Delivery: ${{ company.delivery.price }}/mile
              </span>
              <span v-else>
                Delivery: N/A
              </span>
            </div>
            <div>
              <span v-if="company.cut.offered">
                Cut to length: ${{ company.cut.price }}/cut
              </span>
              <span v-else>
                Cut to length: N/A
              </span>
            </div>
          </div>

        </div>

        <br>

        <!-- Preferences for order -->
        <div>

          <!-- Quantity Ordered -->
          <div>
            <label between align>
              Order Quantity:
              <input small type="number" @change="maxQuantity" v-model="quantity">
            </label>
          </div>

          <!-- Cut to length -->
          <div>
            <label between align>
              Cut to length?
              <span>
                <button small v-if="company.cut.offered" @click="addCut">
                  Add Cut (${{ company.cut.price }}/cut)
                </button>
                <button v-else disabled>
                  Does not offer
                </button>
              </span>
            </label>
          </div>

          <br>

          <!-- Details for cuts requested -->
          <div sub row align v-for="(cut, index) in cuts" :key="index">
            <div>
              <input tiny type="number" v-model="cut.quantity" @blur="calculateCutLengthInches(cut)">
            </div>
            <div>
              <span length :highlight="totalLengthExceeded">
                <input length type="number" placeholder="11" maxlength="2" v-model="cut.feet" @blur="calculateCutLengthInches(cut)">'
                <input length type="number" placeholder="9" maxlength="2" v-model="cut.inches" @blur="calculateCutLengthInches(cut)">"
                <input length type="number" maxlength="2" v-model="cut.numerator"> /
                <input length denominator type="number" maxlength="2" v-model="cut.denominator" @blur="calculateCutLengthInches(cut)">
              </span>
            </div>
            <div>
              <button tiny red @click="removeCut(index)">X</button>
            </div>
          </div>

          <div errors>
            <p v-if="totalLengthExceeded">
              Length of cut cannot exceed order length
            </p>
            <p  v-if="materialLengthExceeded">
              Length of cut cannot exceed material stock length
            </p>
          </div>
        </div>

        <br>

        <!-- Material price -->
        <dl col end>

          <!-- weight of material ordered -->
          <div row>
            <dt>
              Weight:
            </dt>
            <dd>
              {{ totalWeight.toFixed(2) }} lbs
            </dd>
          </div>

          <!-- subtotal for material alone -->
          <div row>
            <dt>
              Material Subtotal:
            </dt>
            <dd>
              {{ totalMaterialPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </dd>
          </div>

          <!-- total for cut expenses -->
          <div row>
            <dt>
              Cut Expense:
            </dt>
            <dd>
              {{ totalCutPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
            </dd>
          </div>

          <!-- total price -->
          <div row>
            <dt>
              <h2>
                Total Price:
              </h2>
            </dt>
            <dd>
              <h2>
                {{ totalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}
              </h2>
            </dd>
          </div>

        </dl>

        <!-- place order -->
        <div col>
          <button green v-if="$route.query.buying" @click="submit">
            Add to Cart
          </button>
          <button green v-if="$route.query.cart" @click="submit">
            Update Order
          </button>
        </div>

        <!-- item already in cart alert -->
        <div errors v-if="itemRepeat">
          <p>This item has already been added to your cart!</p>
        </div>

        <!-- if cart item, remove item from cart button -->
        <div col v-if="$route.query.cart">
          <button red @click="removeItem">
            Remove from cart
          </button>
        </div>

      </div>
    </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      item: '',
      company: '',
      quantity: 1,
      cuts: [],
      itemRepeat: false,
      distance: null
    }
  },
  created () {
    if (this.$route.query.cart) {

      this.$store.dispatch('loading')
      api.axios.get(`${api.baseUrl}/cart/item`, {
        params: {
          cartId: this.$route.query.cartId,
          orderId: this.$route.query.orderId
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.item = res.data.item.material
        this.company = res.data.seller
        this.quantity = res.data.item.quantity
        this.cuts = res.data.item.cuts
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })

    } else {

      this.$store.dispatch('loading')
      api.axios.get(`${api.baseUrl}/material/item`, {
        params: {
          id: this.$route.query.id
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.item = res.data.material
        this.company = res.data.material.company

        if (this.$store.getters.loggedIn) {
          // make call for distance between companies
          api.axios.post(`${api.baseUrl}/users/distance`, {
            buyer: this.$store.getters.companyId,
            seller: this.company._id
          })
          .then(res => {
            this.distance = res.data.distance
          })
          .catch(() => {
          })
        }

      })
      .catch(() => {
        this.$store.dispatch('complete')
      })

    }
  },
  methods: {
    // prevents users from ordering more than available
    maxQuantity (e) {
      if (e.target.value > this.item.quantity) {
        e.target.value = this.item.quantity
        this.quantity = this.item.quantity
      }
      if (!e.target.value) {
        this.quantity = 1
      }
    },
    // adds a new cut to the order
    addCut () {
      if (!this.totalLengthExceeded) {
        this.cuts.push({
          quantity: 1,
          feet: null,
          inches: null,
          numerator: null,
          denominator: null,
          lengthInches: null
        })
      }
    },
    // removes the selected cut from the order
    removeCut (index) {
      this.cuts.splice(index, 1)
    },
    // converts the cut length to inches
    calculateCutLengthInches (cut) {
      if (!cut.quantity) {
        cut.quantity = 1
      }

      let quantity = parseFloat(cut.quantity) || 1
      let feet = parseFloat(cut.feet) * 12 || 0
      let inches = parseFloat(cut.inches) || 0
      let fraction = parseFloat(cut.numerator) / parseFloat(cut.denominator) || 0

      cut.lengthInches = (feet + inches + fraction) * quantity
    },
    submit () {

      // if editing a cart item
      if (this.$route.query.cart) {
        this.$store.dispatch('loading')
        api.axios.put(`${api.baseUrl}/cart/edit-cart`, {
          buyer: this.$store.getters.companyId,
          seller: this.company._id,
          orderId: this.$route.query.orderId,
          order: {
            material: this.item._id,
            quantity: this.quantity,
            cuts: this.cuts,
            weight: this.totalWeight,
            materialPrice: this.totalMaterialPrice,
            cutPrice: this.totalCutPrice,
            subtotalPrice: this.totalPrice
          }
        })
        .then(() => {
          this.$router.push({ name: 'Cart' })
          this.$store.dispatch('complete')
        })
        .catch(() => {
          this.$store.dispatch('complete')
        })
      }

      // if placing a new item in the cart
      else {
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/cart/`, {
          buyer: this.$store.getters.companyId,
          seller: this.company._id,
          order: {
            material: this.item._id,
            quantity: this.quantity,
            cuts: this.cuts,
            weight: this.totalWeight,
            materialPrice: this.totalMaterialPrice,
            cutPrice: this.totalCutPrice,
            subtotalPrice: this.totalPrice
          },
          distance: this.distance
        })
        .then(() => {
          this.$store.dispatch('complete')
          this.$router.push({ name: 'Cart' })
        })
        .catch(() => {
          this.$store.dispatch('complete')
          this.itemRepeat = true
        })
      }

    },
    removeItem () {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/cart/remove-item`, {
        cart: this.$route.query.cartId,
        order: this.$route.query.orderId
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push({ name: 'Cart' })
      })
      .catch(() => {
        this.$store.dispatch('complete')
        this.$router.push({ name: 'Cart' })
      })
    }
  },
  computed: {
    // prevents total length of cut pieces from exceeding length of stock order
    totalLengthExceeded () {
      let length = 0

      this.cuts.forEach(cut => {
        length += parseFloat(cut.lengthInches)
      })

      if (length > this.totalLengthInches) {
        return true
      } else {
        return false
      }
    },
    // prevents user from ordering a cut length that is greater than the material's stock length
    materialLengthExceeded () {
      let feet = parseFloat(this.item.feet) * 12 || 0
      let inches = parseFloat(this.item.inches) || 0
      let fraction = parseFloat(this.item.numerator) / parseFloat(this.item.denominator) || 0
      let materialLength = feet + inches + fraction

      let exceeded = false

      this.cuts.forEach(cut => {
        if (cut.lengthInches > materialLength) {
          exceeded = true
        }
      })

      return exceeded
    },
    // calculates total length in inches of stock material
    totalLengthInches () {
      let feet = parseFloat(this.item.feet) * 12
      let inches = parseFloat(this.item.inches)
      let fraction = parseFloat(this.item.numerator) / parseFloat(this.item.denominator)

      let quantity = parseFloat(this.quantity)

      if (!feet) feet = 0
      if (!inches) inches = 0
      if (!fraction) fraction = 0

      return (feet + inches + fraction) * quantity
    },
    // calculates total length in feet of stock material
    totalLengthFeet () {
      return this.totalLengthInches / 12
    },
    // calculates total weight of order
    totalWeight () {
      return this.totalLengthFeet * this.item.weightPerFoot
    },
    // calculates cost of material alone
    totalMaterialPrice () {
      const poundWeight = this.item.cwt / 100
      return (this.totalWeight * poundWeight)
    },
    // calculates total price of all cuts
    totalCutPrice () {
      if (this.cuts.length > 0) {

        let cutQuantity = 0

        this.cuts.forEach(cut => {
          cutQuantity += parseFloat(cut.quantity)
        })

        return cutQuantity * parseFloat(this.company.cut.price)
      } else {
        return 0
      }
    },
    // calculates total price
    totalPrice () {
      return parseFloat(this.totalMaterialPrice) + parseFloat(this.totalCutPrice)
    }
  }
}
</script>

<style lang="scss" scoped>

  h1 {
    font-weight: bold;
    margin: 20px 0 0 0;
    @media screen and (max-width: 649px) {
      font-size: 18px;
    }
    @media screen and (min-width: 650px) {
      font-size: 32px;
    }
  }

  h2 {
    font-weight: bold;
    text-align: right;
  }
</style>
