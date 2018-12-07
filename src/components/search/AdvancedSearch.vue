<template>
  <div id="advanced-search">

    <h2>Search for Steel</h2>

    <div class="search">

      <div class="form">

        <div class="subform">
          <select @change="pushDimensions" v-model="selectedShape">
            <option disabled selected value="Shape">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape">
              {{ shape.toUpperCase() }}
            </option>
          </select>
          <select>
            <option disabled selected>Dimension</option>
            <option v-for="dimension in dimensions">{{ dimension }}</option>
          </select>
        </div>

        <div class="subform">
          <div class="length">
            <input class="feet-input" type="text" placeholder="10" maxlength="2">'
            <input class="inches-input" type="text" placeholder="9" maxlength="2">"
            <input class="numerator-input" type="text" maxlength="2"> /
            <input class="denominator-input" type="text" maxlength="2">
          </div>
          <select>
            <option disabled selected>Steel Origin</option>
            <option value="true">Domestic Only</option>
            <option value="false">Any</option>
          </select>
        </div>

        <div class="subform">
          <select>
            <option value="false">Not Painted</option>
            <option value="true">Painted</option>
          </select>
          <select>
            <option value="false">Not Galvanized</option>
            <option value="true">Galvanized</option>
          </select>
        </div>

      </div>

      <div class="form">

        <div class="subform">
          <select>
            <option value="10">Within 10 miles</option>
            <option value="25">Within 25 miles</option>
            <option value="50">Within 50 miles</option>
            <option value="75">Within 75 miles</option>
            <option value="100">Within 100 miles</option>
            <option value="">Any</option>
          </select>
          <input type="text" class="input" placeholder="Zipcode">
        </div>

        <div class="subform">
          <select>
            <option disabled selected>Cut to Length?</option>
            <option value="true">Offers Cut to Length</option>
            <option value="false">Doesn't matter</option>
          </select>
          <select>
            <option disabled selected>Delivery?</option>
            <option value="true">Offers Delivery</option>
            <option value="false">Doesn't matter</option>
          </select>
        </div>

        <div class="subform">
          <button>Search</button>
        </div>

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
      selectedShape: 'Shape',
      dimensions: []
    }
  },
  methods: {
    pushDimensions () {
      const newDimensions = []
      material[this.selectedShape].forEach(dimension => {
        newDimensions.push(dimension.dimension)
      })
      this.dimensions = newDimensions
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
