<template>
  <div id="advanced-search">

    <h2>Search for Steel</h2>

    <div class="search">

      <div class="form">

        <div class="subform">
          <select @change="pushDimensions" v-model="shape">
            <option disabled selected value="Shape">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape.toUpperCase() }}
            </option>
          </select>
          <select v-model="dimension">
            <option disabled selected value="Dimension">Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>

        <div class="subform">
          <div class="length">
            <input class="feet-input" type="number" placeholder="10" maxlength="2" v-model="feet">'
            <input class="inches-input" type="number" placeholder="9" maxlength="2" v-model="inches">"
            <input class="numerator-input" type="number" maxlength="2" v-model="numerator"> /
            <input class="denominator-input" type="number" maxlength="2" v-model="denominator">
          </div>
          <select v-model="domestic">
            <option disabled selected value="null">Steel Origin</option>
            <option value="true">Domestic Only</option>
            <option value="false">Any</option>
          </select>
        </div>

        <div class="subform">
          <select v-model="painted">
            <option value="false">Not Painted</option>
            <option value="true">Painted</option>
          </select>
          <select v-model="galvanized">
            <option value="false">Not Galvanized</option>
            <option value="true">Galvanized</option>
          </select>
        </div>

      </div>

      <div class="form">

        <div class="subform">
          <select v-model="radius">
            <option value="10">Within 10 miles</option>
            <option value="25">Within 25 miles</option>
            <option value="50" selected>Within 50 miles</option>
            <option value="75">Within 75 miles</option>
            <option value="100">Within 100 miles</option>
            <option value="">Any</option>
          </select>
          <input type="number" class="input" placeholder="Zipcode" v-model="zipcode">
        </div>

        <div class="subform">
          <select v-model="cut">
            <option disabled selected value="null">Cut to Length?</option>
            <option value="true">Offers Cut to Length</option>
            <option value="false">Doesn't matter</option>
          </select>
          <select v-model="delivery">
            <option disabled selected value="null">Delivery?</option>
            <option value="true">Offers Delivery</option>
            <option value="false">Doesn't matter</option>
          </select>
        </div>

        <div class="subform">
          <select v-model="state">
            <option value="null" selected disabled>State</option>
            <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
          </select>
          <select v-model="company">
            <option value="null" selected disabled>Company</option>
            <option v-for="company in stateCompanies" :value="company" :key="company">{{ company }}</option>
          </select>
        </div>

      </div>

      <div class="subform">
        <button @click="search">Search</button>
      </div>

    </div>
  </div>
</template>

<script>
import material from '@/assets/data/material.js'

export default {
  data () {
    return {
      shapes: [
        'w',
        'hss',
        'c',
        'l'
      ],
      shape: 'Shape',
      dimensions: [],
      dimension: 'Dimension',
      feet: null,
      inches: null,
      numerator: null,
      denominator: null,
      domestic: null,
      painted: false,
      galvanized: false,
      radius: '50',
      zipcode: '',
      cut: null,
      delivery: null,
      state: null,
      company: null,
      states: [
        'GA',
        'AL',
        'SC',
        'FL',
        'TN',
        'NC'
      ],
      stateCompanies: [
        'Benco Welding Inc.',
        'AMD Welding',
        'King Steel',
        'RAI'
      ]
    }
  },
  computed: {
    length () {
      const feet = parseFloat(this.feet) * 12
      const inches = parseFloat(this.inches)
      const fraction = parseFloat(this.numerator) / parseFloat(this.denominator)

      if (this.numerator && this.denominator && this.inches && this.feet) {
        return feet + inches + fraction
      } else if (this.inches && this.feet) {
        return feet + inches
      } else if (this.inches && !this.feet) {
        return inches
      } else if (this.feet) {
        return feet
      } else {
        return 0
      }

    }
  },
  methods: {
    pushDimensions () {
      const newDimensions = []
      material[this.shape].forEach(dimension => {
        newDimensions.push(dimension.dimension)
      })
      this.dimensions = newDimensions
    },
    search () {
      this.$router.push({
        name: 'Listings',
        query: {
          shape: this.shape,
          dimension: this.dimension,
          length: this.length,
          domestic: this.domestic,
          painted: this.painted,
          galvanized: this.galvanized,
          radius: this.radius,
          zipcode: this.zipcode,
          cut: this.cut,
          delivery: this.delivery,
          state: this.state,
          company: this.company
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #advanced-search {
    padding: 10px;
    padding-bottom: 100px;
  }

  h2 {
    text-align: center;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    max-width: 800px;
    margin: auto;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 400px;
    padding-top: 25px;
  }

  .subform {
    display: flex;
    justify-content: space-around;
    align-items: center;
    max-width: 400px;
    min-width: 300px;
    height: 60px;
  }

  select {
    border: thin solid $accent;
  }

  .length {
    border: thin solid $accent;
  }

  .input {
    border: 1px solid $accent;
  }
</style>
