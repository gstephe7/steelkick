<template>
  <div id="quick-search">

    <div class="layer">

      <h2>Search For Steel Near You</h2>

      <div class="search">

        <div class="search-section">
          <select @change="pushDimensions" v-model="shape">
            <option disabled selected value="Shape">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape.toUpperCase() }}
            </option>
          </select>
          <select v-model="dimension">
            <option disabled selected>Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>

        <div class="search-section">
          <div class="length">
            <input class="feet-input" type="number" placeholder="10" maxlength="2" v-model="feet">'
            <input class="inches-input" type="number" placeholder="9" maxlength="2" v-model="inches">"
            <input class="numerator-input" type="number" maxlength="2" v-model="numerator"> /
            <input class="denominator-input" type="number" maxlength="2" v-model="denominator">
          </div>
          <input type="number" placeholder="Zipcode" v-model="zipcode">
        </div>

      </div>

      <button @click="search">Search</button>
      <router-link :to="{ name: 'Search' }">Advanced Search</router-link>

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
      zipcode: ''
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
          zipcode: this.zipcode
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #quick-search {
    height: 400px;
    background-image: url('../../assets/img/background.jpg');
    background-position: center;
    background-size: cover;
  }

  .layer {
    background-color: $qs-background;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  h2 {
    color: $accent;
    font-size: 32px;
    text-align: center;
    padding: 0 10px 0 10px;
    margin-top: 0;
  }

  .search {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }

  .search-section {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 300px;
    height: 50px;
  }

  a {
    color: $accent;
  }
</style>
