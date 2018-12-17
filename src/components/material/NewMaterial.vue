<template>
  <div id="new-material">

    <div class="material-form">

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
          <input type="number" class="input" placeholder="Quantity">
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

        <div class="subform">
          <textarea placeholder="Location in shop (for internal use)"></textarea>
        </div>

      </div>

      <div class="form">

        <div class="subform">
          <select v-model="domestic">
            <option disabled selected value="null">Steel Origin</option>
            <option value="true">Domestic</option>
            <option value="false">Foreign</option>
          </select>
          <select>
            <option selected disabled value="fair">
              Condition
            </option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div class="subform">
          <select>
            <option selected disabled value="null">
              Grade
            </option>
            <option value="A36">A36</option>
            <option value="A992">A992</option>
            <option value="A500">A500</option>
          </select>
          <input type="text" class="input" placeholder="Heat #">
        </div>

        <div class="subform">
          <select>
            <option selected disabled value="false">
              For Sale?
            </option>
            <option value="true">For Sale</option>
            <option value="false">Not For Sale</option>
          </select>
          <input type="number" class="input" placeholder="$ Cwt (ex: 42)">
        </div>

        <div class="subform">
          <textarea placeholder="Additional remarks"></textarea>
        </div>

      </div>

    </div>

    <div>
      <button @click="$router.push('/new-material-confirmation')">{{ btnText }}</button>
    </div>

  </div>
</template>

<script>
import material from '@/assets/data/material.js'

export default {
  props: ['btnText'],
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
      galvanized: false
    }
  },
  methods: {
    pushDimensions () {
      const newDimensions = []
      material[this.shape].forEach(dimension => {
        newDimensions.push(dimension.dimension)
      })
      this.dimensions = newDimensions
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #new-material {
    padding: 10px;
    max-width: 650px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .material-form {
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

  .input {
    border: 1px solid $accent;
  }

  .length {
    border: 1px solid $accent;
  }

  select {
    border: 1px solid $accent;
  }

  button {
    background-color: $success;
  }
</style>
