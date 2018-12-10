<template>
    <div id="listing">

      <p class="back" @click="$router.back()">
        < Back to results
      </p>

      <div class="listing-details">

        <!-- Heading with shape, length, and cwt -->
        <div class="heading">
          <div>
            <h2>
              {{ listing.shape.toUpperCase() }} {{ listing.dimension }}
            </h2>
          </div>
          <div>
            <h2>${{ listing.cwt }} Cwt</h2>
          </div>
        </div>

        <div class="heading">
          <div>
            <p>
              {{ listing.feet }}' {{ listing.inches }}" <span v-if="listing.numerator">{{ listing.numerator }}/{{ listing.denominator }}</span>
            </p>
          </div>
          <div>
            <p>{{ listing.quantity }} available</p>
          </div>
        </div>

        <div class="info-div">

          <!-- Additional details on material -->
          <div class="info-container">
            <div>
              <p>{{ listing.grade }}</p>
            </div>
            <div>
              <p v-if="listing.domestic">Domestic</p>
              <p v-else>Foreign</p>
            </div>
            <div>
              <p v-if="listing.heat"><span class="check">&#10004;</span>Heat #s included</p>
            </div>
            <div>
              <p v-if="listing.painted"><span class="check">&#10004;</span>Painted</p>
            </div>
            <div>
              <p v-if="listing.galvanized"><span class="check">&#10004;</span>Galvanized</p>
            </div>
          </div>

          <!-- Information on company -->
          <div class="info-container">
            <div>
              <h4>
                {{ company.company }}
              </h4>
            </div>
            <div>
              <p>
                {{ company.city }}, {{ company.state }}
              </p>
            </div>
            <div>
              <p v-if="company.delivery">
                Delivery: ${{ company.deliveryPrice }}/mile
              </p>
              <p v-else>
                Delivery: N/A
              </p>
            </div>
            <div>
              <p v-if="company.cut">
                Cut to length: ${{ company.cutPrice }}/cut
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
              <input type="number" @change="maxQuantity" v-model="order.quantity" class="quantity-input">
            </div>
          </div>

          <!-- Delivery -->
          <div class="form-section">
            <div class="label">
              <label>Delivery?</label>
            </div>
            <div class="input">
              <select v-if="company.delivery" v-model="order.delivery">
                <option :value="false">Pickup</option>
                <option :value="true">Delivery (${{ company.deliveryPrice }}/mile)</option>
              </select>
              <select v-else>
                <option selected disabled>Pickup Only</option>
              </select>
            </div>
          </div>

          <!-- Cut to length -->
          <div class="form-section">
            <div class="label">
              <label>Cut to length?</label>
            </div>
            <div class="input">
              <button v-if="company.cut" class="add-cut" @click="addCut">
                Add Cut (${{ company.cutPrice }}/cut)
              </button>
              <button v-else disabled class="add-cut">
                Does not offer
              </button>
            </div>
          </div>

          <!-- Details for cuts requested -->
          <div class="cut-div" v-for="(cut, index) in order.cuts">
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

          <!-- total for delivery -->
          <div class="price-container">
            <div class="expense-box">
              <p>Delivery Expense:</p>
            </div>
            <div class="price-box">
              <p>
                ${{ totalDeliveryPrice.toFixed(2) }}
              </p>
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
          <button class="success">Add to Cart</button>
        </div>

      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      listing: {
        id: 'gsh27dh7263',
        shape: 'w',
        dimension: '8x10',
        weight: 10,
        feet: 10,
        inches: 7,
        numerator: 7,
        denominator: 8,
        cwt: 42,
        grade: 'A992',
        heat: '593726718',
        quantity: 5,
        domestic: true,
        painted: true,
        galvanized: true
      },
      company: {
        company: 'Benco Welding Inc.',
        city: 'Winder',
        state: 'GA',
        cut: true,
        cutPrice: 5,
        cutKerf: .125,
        delivery: true,
        deliveryMaxWeight: 2000,
        deliveryMaxLength: 20,
        deliveryPrice: 2,
        deliveryMaxDistance: 25
      },
      order: {
        quantity: 1,
        delivery: false,
        distance: 23,
        cuts: []
      }
    }
  },
  methods: {
    // prevents users from ordering more than available
    maxQuantity (e) {
      if (e.target.value > this.listing.quantity) {
        e.target.value = this.listing.quantity
      }
      if (!e.target.value) {
        this.order.quantity = 1
      }
    },
    // adds a new cut to the order
    addCut () {
      this.order.cuts.push({
        quantity: 1,
        feet: null,
        inches: null,
        numerator: null,
        denominator: null,
        lengthInches: null
      })
    },
    // removes the selected cut from the order
    removeCut (index) {
      this.order.cuts.splice(index, 1)
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
    }
  },
  computed: {
    // calculates total length in inches of stock material
    totalLengthInches () {
      const feet = parseFloat(this.listing.feet) * 12
      const inches = parseFloat(this.listing.inches)
      const fraction = parseFloat(this.listing.numerator) / parseFloat(this.listing.denominator)
      let quantity = 1

      if (!this.order.quantity) {
        quantity = 1
      } else {
        quantity = parseFloat(this.order.quantity)
      }

      if (feet && inches && fraction) {
        return (feet + inches + fraction) * quantity
      } else if (feet && inches) {
        return (feet + inches) * quantity
      } else if (feet) {
        return feet * quantity
      } else if (inches) {
        return inches * quantity
      }
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
        return this.totalLengthFeet * this.listing.weight
      }
    },
    // calculates cost of material alone
    totalMaterialPrice () {
      const poundWeight = this.listing.cwt / 100
      return (this.totalWeight * poundWeight)
    },
    // calculate cost of delivery
    totalDeliveryPrice () {
      if (this.order.delivery) {
        return parseFloat(this.order.distance) * parseFloat(this.company.deliveryPrice)
      } else {
        return 0
      }
    },
    // calculates total price of all cuts
    totalCutPrice () {
      if (this.order.cuts.length > 0) {

        let cutQuantity = 0

        this.order.cuts.forEach(cut => {
          cutQuantity += parseFloat(cut.quantity)
        })

        return cutQuantity * parseFloat(this.company.cutPrice)
      } else {
        return 0
      }
    },
    // calculates total price
    totalPrice () {
      return parseFloat(this.totalMaterialPrice) + parseFloat(this.totalDeliveryPrice) + parseFloat(this.totalCutPrice)
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

  .info-div {
    display: flex;
    justify-content: space-between;
  }

  .info-container {
    margin-top: 25px;
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
