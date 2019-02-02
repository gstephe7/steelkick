<template>
  <div id="quick-search">

    <div class="layer">

      <h2>Search For Steel Near You</h2>

      <div class="search">

        <div class="search-section">
          <select @change="pushDimensions" v-model="shape" class="autotab">
            <option disabled selected :value="null">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape.toUpperCase() }}
            </option>
          </select>
          <select v-model="dimension" class="autotab">
            <option disabled selected :value="null">
              Dimension
            </option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">
              {{ dimension }}
            </option>
          </select>
        </div>

        <div class="search-section">
          <div class="length">
            <input class="feet-input autotab" type="number" placeholder="10" maxlength="2" v-model="feet">'
            <input class="inches-input autotab" type="number" placeholder="9" maxlength="2" v-model="inches">"
            <input class="numerator-input autotab" type="number" maxlength="2" v-model="numerator"> /
            <input class="denominator-input autotab" type="number" maxlength="2" v-model="denominator">
          </div>
          <select v-model="state" class="autotab">
            <option :value="null" selected disabled>State</option>
            <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
          </select>
        </div>

      </div>

      <button @click="search" class="autotab">Search</button>
      <router-link :to="{ name: 'Search' }">Advanced Search</router-link>

    </div>
  </div>
</template>

<script>
import material from '@/assets/data/material.js'
import states from '@/assets/data/states.js'

export default {
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
      state: null,
      states: states
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
          update: true,
          forSale: true,
          shape: this.shape,
          dimension: this.dimension,
          feet: this.feet,
          domestic: null,
          painted: null,
          galvanized: null,
          cut: null,
          delivery: null,
          state: this.state,
          company: null
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
    background-image: url('../../assets/img/background-min.jpg');
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
