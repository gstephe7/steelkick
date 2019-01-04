<template>
  <div id="advanced-search">

    <div class="search">

      <div class="form">

        <div class="subform">
          <select @change="pushDimensions" v-model="shape" class="autotab">
            <option disabled selected :value="null">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape.toUpperCase() }}
            </option>
          </select>
          <select v-model="dimension" class="autotab">
            <option disabled selected :value="null">Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>

        <div class="subform">
          <div class="length">
            <input class="feet-input autotab" type="number" placeholder="10" maxlength="2" v-model="feet">'
            <input class="inches-input autotab" type="number" placeholder="9" maxlength="2" v-model="inches">"
            <input class="numerator-input autotab" type="number" maxlength="2" v-model="numerator">/
            <input class="denominator-input autotab" type="number" maxlength="2" v-model="denominator">
          </div>
          <select v-model="domestic" class="autotab">
            <option disabled selected :value="null">Steel Origin</option>
            <option :value="true">Domestic Only</option>
            <option :value="false">Any</option>
          </select>
        </div>

        <div class="subform">
          <select v-model="painted" class="autotab">
            <option :value="null">Painted?</option>
            <option :value="false">Not Painted</option>
            <option :value="true">Painted</option>
          </select>
          <select v-model="galvanized" class="autotab">
            <option :value="null">Galvanized?</option>
            <option :value="false">Not Galvanized</option>
            <option :value="true">Galvanized</option>
          </select>
        </div>

      </div>

      <div class="form" v-if="!inventory">

        <div class="subform">
          <select v-model="radius" class="autotab">
            <option value="10">Within 10 miles</option>
            <option value="25">Within 25 miles</option>
            <option value="50" selected>Within 50 miles</option>
            <option value="75">Within 75 miles</option>
            <option value="100">Within 100 miles</option>
            <option value="">Any</option>
          </select>
          <input type="number" class="input autotab" placeholder="Zipcode" maxlength="5" v-model="zipcode">
        </div>

        <div class="subform">
          <select v-model="cut" class="autotab">
            <option disabled selected :value="null">Cut to Length?</option>
            <option :value="true">Offers Cut to Length</option>
            <option :value="false">Doesn't matter</option>
          </select>
          <select v-model="delivery" class="autotab">
            <option disabled selected :value="null">Delivery?</option>
            <option :value="true">Offers Delivery</option>
            <option :value="false">Doesn't matter</option>
          </select>
        </div>

        <div class="subform">
          <select v-model="state" class="autotab">
            <option :value="null" selected disabled>State</option>
            <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
          </select>
          <select v-model="company" class="autotab">
            <option :value="null" selected disabled>Company</option>
            <option v-for="company in companies" :value="company" :key="company">{{ company }}</option>
          </select>
        </div>

      </div>

    </div>

    <div class="subform">
      <button v-if="searching" class="autotab" @click="search">
        Search
      </button>
      <button v-if="buying" @click="search" class="autotab">
        Update Search
      </button>
      <button v-if="inventory" @click="search" class="autotab">
        Filter
      </button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import states from '@/assets/data/states.js'

export default {
  props: ['inventory', 'buying', 'searching'],
  data () {
    return {
      shapes: [
        'w',
        'hss',
        'c',
        'l'
      ],
      dimensions: [],
      shape: null,
      dimension: null,
      feet: null,
      inches: null,
      numerator: null,
      denominator: null,
      domestic: null,
      painted: null,
      galvanized: null,
      radius: '50',
      zipcode: null,
      cut: null,
      delivery: null,
      state: null,
      company: null,
      states: states,
      companies: []
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
      let buying = () => {
        if (!this.inventory) return true
        else return false
      }

      // push search query when updating search
      if (this.$route.name === 'Listings') {
        this.$router.push({
          query: {
            update: true,
            forSale: buying(),
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
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
        this.$router.go()
      }

      // push search query when filtering through inventory
      else if (this.$route.name === 'Inventory') {
        this.$router.push({
          query: {
            update: true,
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
            domestic: this.domestic,
            painted: this.painted,
            galvanized: this.galvanized
          }
        })
        this.$router.go()
      }

      // Push search query when searching for steel
      else {
        this.$router.push({
          name: 'Listings',
          query: {
            update: true,
            forSale: buying(),
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
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
  },
  created () {
    // fills in the search form to reflect the current search
    if (this.$route.query.update) {

      this.shape = this.$route.query.shape

      if (this.$route.query.shape != null) {
        this.pushDimensions()
      }

      this.dimension = this.$route.query.dimension
      this.feet = this.$route.query.feet
      this.inches = this.$route.query.inches
      this.numerator = this.$route.query.numerator
      this.denominator = this.$route.query.denominator
      this.domestic = this.$route.query.domestic
      this.painted = this.$route.query.painted
      this.galvanized = this.$route.query.galvanized
      this.radius = this.$route.query.radius
      this.zipcode = this.$route.query.zipcode
      this.cut = this.$route.query.cut
      this.delivery = this.$route.query.delivery
      this.state = this.$route.query.state
      this.company = this.$route.query.company
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #advanced-search {
    max-width: 650px;
    padding: 10px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
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
    height: 24px;
    width: 128px;
  }

  .input {
    border: 1px solid $accent;
  }
</style>
