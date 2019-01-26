<template>
    <div id="listing">

      <p class="back" @click="$router.back()">
        <span v-if="$route.query.buying">
          < Back to results
        </span>
        <span v-if="$route.query.cart">
          < Back to cart
        </span>
      </p>

      <div class="listing-details" v-if="item">

        <!-- Heading with shape, length, and cwt -->
        <div class="heading">
          <div class="heading-div">
            <h2>
              {{ item.shape.toUpperCase() }} {{ item.dimension }}
            </h2>
          </div>
          <div>
            <h2>${{ item.cwt }} Cwt</h2>
          </div>
        </div>

        <div class="heading">
          <div>
            <p>
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
            </p>
          </div>
          <div>
            <p>{{ item.quantity }} available</p>
          </div>
        </div>

        <div class="info-div">

          <!-- Additional details on material -->
          <div class="info-container">
            <div>
              <p>{{ item.grade }}</p>
            </div>
            <div>
              <p v-if="item.domestic">Domestic</p>
              <p v-else>Foreign</p>
            </div>
            <div>
              <p>{{ item.condition }} condition</p>
            </div>
            <div>
              <p v-if="item.heat"><span class="check">&#10004;</span>Heat #s included</p>
            </div>
            <div>
              <p v-if="item.painted"><span class="check">&#10004;</span>Painted</p>
            </div>
            <div>
              <p v-if="item.galvanized"><span class="check">&#10004;</span>Galvanized</p>
            </div>
            <div v-if="item.remarks" class="remarks">
              <p>Remarks: {{ item.remarks }}</p>
            </div>
          </div>

          <!-- Information on company -->
          <div class="info-container">
            <div>
              <h4>
                {{ company.name }}
              </h4>
            </div>
            <div>
              <p>
                {{ company.city }}, {{ company.state }}
              </p>
            </div>
            <div v-if="$store.getters.loggedIn">
              <p v-if="distance">
                {{ distance.toFixed(2) }} miles away
              </p>
              <p v-else>
                calculating distance...
              </p>
            </div>
            <div v-else>
              <p>
                Login to see distance
              </p>
            </div>
            <div>
              <p v-if="company.delivery.offered">
                Delivery: ${{ company.delivery.price }}/mile
              </p>
              <p v-else>
                Delivery: N/A
              </p>
            </div>
            <div>
              <p v-if="company.cut.offered">
                Cut to length: ${{ company.cut.price }}/cut
              </p>
              <p v-else>
                Cut to length: N/A
              </p>
            </div>
          </div>

        </div>

        <!-- Preferences for order -->
        <div class="preferences">

          <!-- Quantity Ordered -->
          <div class="form-section">
            <div class="label">
              <label>Order Quantity: </label>
            </div>
            <div class="input">
              <input type="number" @change="maxQuantity" v-model="quantity" class="quantity-input">
            </div>
          </div>

          <!-- Cut to length -->
          <div class="form-section">
            <div class="label">
              <label>Cut to length?</label>
            </div>
            <div class="input">
              <button v-if="company.cut.offered" class="add-cut" @click="addCut">
                Add Cut (${{ company.cut.price }}/cut)
              </button>
              <button v-else disabled class="add-cut">
                Does not offer
              </button>
            </div>
          </div>

          <!-- Details for cuts requested -->
          <div class="cut-div" v-for="(cut, index) in cuts">
            <div>
              <input class="cut-quantity" type="number" v-model="cut.quantity">
            </div>
            <div>
              <div class="length">
                <input class="feet-input" type="number" placeholder="10" maxlength="2" v-model="cut.feet" @blur="calculateCutLengthInches(cut)">'
                <input class="inches-input" type="number" placeholder="9" maxlength="2" v-model="cut.inches" @blur="calculateCutLengthInches(cut)">"
                <input class="numerator-input" type="number" maxlength="2" v-model="cut.numerator"> /
                <input class="denominator-input" type="number" maxlength="2" v-model="cut.denominator" @blur="calculateCutLengthInches(cut)">
              </div>
            </div>
            <div>
              <button class="remove-cut" @click="removeCut(index)">X</button>
            </div>
          </div>
          <div v-if="totalLengthExceeded" class="length-exceeded">
            <p>Length of cut cannot exceed order length</p>
          </div>

        </div>

        <!-- Material price -->
        <div class="price-div">

          <!-- subtotal for material alone -->
          <div class="price-container">
            <div class="expense-box">
              <h3>Material Subtotal:</h3>
            </div>
            <div class="price-box">
              <h3>${{ totalMaterialPrice.toFixed(2) }}</h3>
            </div>
          </div>

          <!-- total for cut expenses -->
          <div class="price-container">
            <div class="expense-box">
              <p>Cut Expense:</p>
            </div>
            <div class="price-box">
              <p>
                ${{ totalCutPrice.toFixed(2) }}
              </p>
            </div>
          </div>

          <!-- total price -->
          <div class="price-container total">
            <div class="expense-box">
              <h2>Total Price:</h2>
            </div>
            <div class="price-box">
              <h2>
                ${{ totalPrice.toFixed(2) }}
              </h2>
            </div>
          </div>

        </div>

        <!-- place order -->
        <div class="place-order">
          <button v-if="$route.query.buying" class="success" @click="submit">
            Add to Cart
          </button>
          <button v-if="$route.query.cart" class="success" @click="submit">
            Update Order
          </button>
        </div>

        <!-- item already in cart alert -->
        <div class="alert-message" v-if="itemRepeat">
          <p>This item has already been added to your cart!</p>
        </div>

        <!-- if cart item, remove item from cart button -->
        <div class="remove-item" v-if="$route.query.cart">
          <button class="alert" @click="removeItem">Remove from cart</button>
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
      .catch(err => {
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
          api.axios.post(`${api.baseUrl}/distance/`, {
            companyA: this.$store.getters.companyName,
            companyB: this.company.name
          })
          .then(res => {
            this.distance = res.data.distance
          })
          .catch(err => {

          })
        }

      })
      .catch(err => {
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
      const feet = parseFloat(cut.feet) * 12
      const inches = parseFloat(cut.inches)
      const fraction = parseFloat(cut.numerator) / parseFloat(cut.denominator)

      if (feet && inches && fraction) {
        cut.lengthInches = feet + inches + fraction
      } else if (feet && inches) {
        cut.lengthInches = feet + inches
      } else if (feet) {
        cut.lengthInches = feet
      } else if (inches) {
        cut.lengthInches = inches
      }
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
            cutPrice: this.totalCutPrice,
            subtotalPrice: this.totalPrice
          }
        })
        .then(res => {
          this.$store.dispatch('complete')
          this.$router.push({ name: 'Cart' })
        })
        .catch(err => {
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
            cutPrice: this.totalCutPrice,
            subtotalPrice: this.totalPrice
          },
          distance: this.distance
        })
        .then(res => {
          this.$store.dispatch('complete')
          this.$router.push({ name: 'Cart' })
        })
        .catch(err => {
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
      .then(res => {
        this.$store.dispatch('complete')
        this.$router.push({ name: 'Cart' })
      })
      .catch(err => {
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
      if (this.totalLengthInches) {
        return this.totalLengthInches / 12
      }
    },
    // calculates total weight of order
    totalWeight () {
      if (this.totalLengthFeet) {
        return this.totalLengthFeet * this.item.weightPerFoot
      }
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
  @import '@/assets/scss/variables.scss';

  #listing {
    width: 90%;
    max-width: 800px;
    margin: auto;
  }

  .back {
    color: royalblue;
    cursor: pointer;
    margin: 25px 0 25px 0;
  }

  .heading {
    display: flex;
    justify-content: space-between;
  }

  .heading-div {
    max-width: 55%;
  }

  .info-div {
    display: flex;
    justify-content: space-between;
  }

  .info-container {
    margin-top: 25px;
    max-width: 50%;
  }

  .remarks {
    margin-top: 10px;
  }

  .preferences {
    margin-top: 50px;
  }

  .form-section {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }

  .label {
    width: 150px;
  }

  .input {
    width: 100px;
  }

  .add-cut {
    width: 140px;
    margin: 0;
  }

  .cut-div {
    margin: 15px 0 0 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 250px;
  }

  .quantity-input {
    border: 1px solid $accent;
    width: 120px;
  }

  .cut-quantity {
    width: 30px;
    height: 29px;
    padding: 5px;
    border: 1px solid $accent;
  }

  .length {
    border: 1px solid $accent;
  }

  .remove-cut {
    border-radius: 50%;
    height: 30px;
    width: 30px;
    font-size: 14px;
    margin: 0;
    background-color: $alert;
  }

  .length-exceeded {
    margin-top: 15px;
    color: $alert;
    text-align: center;
  }

  .price-div {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    margin-top: 50px;
  }

  .price-container {
    display: flex;
    justify-content: flex-end;
    align-content: flex-end;
  }

  .expense-box {
    width: 175px;
  }

  .price-box {
    width: 100px;
    text-align: right;
  }

  .total {
    margin-top: 25px;
  }

  .place-order {
    display: flex;
    justify-content: center;
    margin-top: 50px;
  }

  .success {
    background-color: $success;
  }

  .remove-item {
    display: flex;
    justify-content: center;
  }

  .alert {
    background-color: $alert;
  }

  .alert-message {
    color: $alert;
    text-align: center;
  }

  select {
    border: 1px solid $accent;
    width: 142px;
  }

  h2, h3, h4 {
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
  }
</style>
