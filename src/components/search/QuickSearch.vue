<template>
  <div id="quick-search">
    <div class="layer">
      <h2>Search For Steel Near You</h2>
      <div class="search">
        <div class="search-section">
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
        <div class="search-section">
          <div class="length">
            <input class="feet-input" type="text" placeholder="10" maxlength="2">'
            <input class="inches-input" type="text" placeholder="9" maxlength="2">"
            <input class="numerator-input" type="text" maxlength="2"> /
            <input class="denominator-input" type="text" maxlength="2">
          </div>
          <input type="text" placeholder="Zipcode">
        </div>
      </div>
      <button>Search</button>
      <router-link :to="{ name: 'Home' }">Advanced Search</router-link>
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
