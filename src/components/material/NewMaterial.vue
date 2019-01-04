<template>
  <div id="new-material">

    <div class="material-form">

      <div class="form">

        <div class="subform">
          <select @change="pushDimensions" class="autotab" v-model="shape" :class="{ required : errors.shape }">
            <option disabled selected value="Shape">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape.toUpperCase() }}
            </option>
          </select>
          <select v-model="dimension" class="autotab" :class="{ required : errors.dimension }">
            <option disabled selected value="Dimension">Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>

        <div class="subform">
          <div class="length" :class="{ required : errors.length }">
            <input class="feet-input autotab" type="number" placeholder="10" maxlength="2" v-model="feet">'
            <input class="inches-input autotab" type="number" placeholder="9" maxlength="2" v-model="inches">"
            <input class="numerator-input autotab" type="number" maxlength="2" v-model="numerator"> /
            <input class="denominator-input autotab" type="number" maxlength="2" v-model="denominator">
          </div>
          <input type="number" class="input autotab" v-model="quantity" placeholder="Quantity" maxlength="4">
        </div>

        <div class="subform">
          <select v-model="painted" class="autotab">
            <option value="false">Not Painted</option>
            <option value="true">Painted</option>
          </select>
          <select v-model="galvanized" class="autotab">
            <option value="false">Not Galvanized</option>
            <option value="true">Galvanized</option>
          </select>
        </div>

        <div class="subform">
          <textarea placeholder="Location in shop (for internal use)" v-model="location"></textarea>
        </div>

      </div>

      <div class="form">

        <div class="subform">
          <select v-model="domestic" class="autotab" :class="{ required : errors.domestic }">
            <option disabled selected value="null">Steel Origin</option>
            <option value="true">Domestic</option>
            <option value="false">Foreign</option>
          </select>
          <select v-model="condition" class="autotab">
            <option selected disabled :value="null">
              Condition
            </option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div class="subform">
          <select v-model="grade" class="autotab">
            <option selected disabled value="null">
              Grade
            </option>
            <option value="A36">A36</option>
            <option value="A992">A992</option>
            <option value="A500">A500</option>
          </select>
          <input type="text" class="input" placeholder="Heat #" v-model="heat">
        </div>

        <div class="subform">
          <select v-model="forSale" class="autotab">
            <option selected disabled value="false">
              For Sale?
            </option>
            <option value="true">For Sale</option>
            <option value="false">Not For Sale</option>
          </select>
          <input type="number" class="input autotab" placeholder="$ Cwt (ex: 42)" v-model="cwt">
        </div>

        <div class="subform">
          <textarea placeholder="Additional remarks" v-model="remarks" class="autotab"></textarea>
        </div>

      </div>

    </div>

    <div class="buttons">
      <button @click="completeEntry" class="autotab">{{ btnText }}</button>
      <button v-if="edit" class="delete" @click="deletePopup">Delete</button>
    </div>

    <div>
      <p v-if="errors.shape" class="err-msg">
        Please enter material shape
      </p>
      <p v-if="errors.dimension" class="err-msg">
        Please enter material dimension
      </p>
      <p v-if="errors.length" class="err-msg">
        Please enter material length
      </p>
      <p v-if="errors.domestic" class="err-msg">
        Please enter material origin
      </p>
    </div>

    <ConfirmationPopup msg="Are you sure you want to delete this item?"
                       btnText="Delete"
                       class="popup"
                       :class="{ show : showDeletePopup }"
                       @cancel="deletePopup"
                       @confirm="deleteItem">
    </ConfirmationPopup>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import ConfirmationPopup from '@/components/popups/ConfirmationPopup'

export default {
  props: ['btnText', 'edit', 'item'],
  components: {
    ConfirmationPopup
  },
  data () {
    return {
      showDeletePopup: false,
      shapes: [
        'w',
        'hss',
        'c',
        'l'
      ],
      _id: null,
      shape: 'Shape',
      dimensions: [],
      dimension: 'Dimension',
      feet: null,
      inches: null,
      numerator: null,
      denominator: null,
      quantity: null,
      location: '',
      domestic: null,
      painted: false,
      galvanized: false,
      condition: null,
      grade: null,
      heat: null,
      forSale: false,
      cwt: null,
      remarks: '',
      errors: {
        shape: false,
        dimension: false,
        length: false,
        domestic: false
      },
      verified: false
    }
  },
  computed: {
    weightPerFoot () {

      if (this.shape != 'Shape' && this.dimension != 'Dimension') {

        let weight = null
        let dimension = this.dimension

        material[this.shape].forEach(item => {
          if (item.dimension == dimension) {
            weight = item.weight
          }
        })

        return weight

      }

    }
  },
  methods: {
    pushDimensions () {
      this.autoSetGrade()
      const newDimensions = []
      material[this.shape].forEach(dimension => {
        newDimensions.push(dimension.dimension)
      })
      this.dimensions = newDimensions
    },
    checkForm () {
      // form error messages
      if (this.shape === 'Shape') {
        this.errors.shape = true
      } else {
        this.errors.shape = false
      }

      if (this.dimension === 'Dimension') {
        this.errors.dimension = true
      } else {
        this.errors.dimension = false
      }

      if (!this.feet && !this.inches && !this.numerator) {
        this.errors.length = true
      } else {
        this.errors.length = false
      }

      if (!this.domestic) {
        this.errors.domestic = true
      } else {
        this.errors.domestic = false
      }

      // resort to default values
      if (!this.quantity) {
        this.quantity = 1
      }

      if (!this.errors.shape && !this.errors.dimension && !this.errors.length && !this.errors.domestic) {
        this.verified = true
      }
    },
    autoSetGrade () {
      if (this.shape === 'w') {
        this.grade = 'A992'
      }
      if (this.shape === 'hss') {
        this.grade = 'A500'
      }
      if (this.shape === 'c') {
        this.grade = 'A36'
      }
      if (this.shape === 'l') {
        this.grade = 'A36'
      }
    },
    completeEntry () {
      this.checkForm()

      if (this.verified) {
        if (this.edit) {
          this.$store.dispatch('loading')
          api.axios.put(`${api.baseUrl}/material/edit-material`, {
            _id: this._id,
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
            quantity: this.quantity,
            location: this.location,
            domestic: this.domestic,
            painted: this.painted,
            galvanized: this.galvanized,
            condition: this.condition,
            grade: this.grade,
            heat: this.heat,
            forSale: this.forSale,
            cwt: this.cwt,
            remarks: this.remarks,
            weightPerFoot: this.weightPerFoot
          })
          .then(res => {
            this.$store.dispatch('complete')
            this.$router.push({
              path: '/material-confirmation',
              query: {
                edit: true
              }
            })
          })
          .catch(err => {
            this.$store.dispatch('complete')
          })

        } else {
          this.$store.dispatch('loading')
          api.axios.post(`${api.baseUrl}/material/new-material`, {
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
            quantity: this.quantity,
            location: this.location,
            domestic: this.domestic,
            painted: this.painted,
            galvanized: this.galvanized,
            condition: this.condition,
            grade: this.grade,
            heat: this.heat,
            forSale: this.forSale,
            cwt: this.cwt,
            remarks: this.remarks,
            weightPerFoot: this.weightPerFoot,
            company: this.$store.getters.companyId
          })
          .then(res => {
            this.$store.dispatch('complete')
            this.$router.push({
              path: '/material-confirmation',
              query: {
                newEntry: true
              }
            })
          })
          .catch(err => {
            this.$store.dispatch('complete')
          })
        }
      }
    },
    deletePopup () {
      this.showDeletePopup = !this.showDeletePopup
    },
    deleteItem () {
      this.$store.dispatch('loading')
      api.axios.delete(`${api.baseUrl}/material/delete-material`, {
        params: {
          _id: this._id
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.$router.push('inventory')
      })
      .catch(err => {
        this.$store.dispatch('complete')
      })
    }
  },
  created () {
    if (this.edit) {
      this._id = this.item._id
      this.shape = this.item.shape
      this.pushDimensions()
      this.dimension = this.item.dimension
      this.feet = this.item.feet
      this.inches = this.item.inches
      this.numerator = this.item.numerator
      this.denominator = this.item.denominator
      this.domestic = this.item.domestic
      this.painted = this.item.painted
      this.galvanized = this.item.galvanized
      this.quantity = this.item.quantity
      this.location = this.item.location
      this.condition = this.item.condition
      this.grade = this.item.grade
      this.heat = this.item.heat
      this.forSale = this.item.forSale
      this.cwt = this.item.cwt
      this.remarks = this.item.remarks
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

  .buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  button {
    background-color: $success;
  }

  .delete {
    background-color: $alert;
  }

  .popup {
    height: 0;
    visibility: hidden;
    opacity: 0;
    transition: 250ms all;
  }

  .show {
    height: 310px;
    opacity: 1;
    visibility: visible;
  }

  .required {
    outline: solid thin $alert;
  }

  .err-msg {
    color: $alert;
    text-align: center;
  }
</style>
