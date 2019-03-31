<template>
  <form @submit.prevent="completeEntry">

    <div center wrap>

      <div col fieldset>

        <div center>
          <select @change="autoSetGrade" class="autotab" v-model="shape" :highlight="errors.shape" autofocus>
            <option disabled selected :value="null">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape }}
            </option>
          </select>
          <select v-model="dimension" class="autotab" :highlight="errors.dimension">
            <option disabled selected :value="null">Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>

        <div center>
          <span length :highlight="errors.length">
            <input length class="autotab" type="number" placeholder="11" maxlength="2" v-model="feet">'
            <input length class="autotab" type="number" placeholder="9" maxlength="2" v-model="inches">"
            <input length class="autotab" type="number" maxlength="2" v-model="numerator"> /
            <input length denominator class="autotab" type="number" maxlength="2" v-model="denominator">
          </span>
          <input type="number" class="autotab" v-model="quantity" placeholder="Quantity" maxlength="4">
        </div>

        <div center>
          <select v-model="primed" class="autotab" @change="autoSetPrice">
            <option :value="false">Not Primed</option>
            <option :value="true">Primed</option>
          </select>
          <select v-model="galvanized" class="autotab" @change="autoSetPrice">
            <option :value="false">Not Galvanized</option>
            <option :value="true">Galvanized</option>
          </select>
        </div>

        <div center>
          <textarea placeholder="Location in shop (for internal use)" v-model="location" class="autotab"></textarea>
        </div>

      </div>

      <div col fieldset>

        <div center>
          <select v-model="domestic" class="autotab" :highlight="errors.domestic">
            <option disabled selected :value="null">Steel Origin</option>
            <option :value="true">Domestic</option>
            <option :value="false">Foreign</option>
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

        <div center>
          <select v-model="grade" class="autotab">
            <option selected disabled :value="null">
              Grade
            </option>
            <option value="A36">A36</option>
            <option value="A992">A992</option>
            <option value="A500">A500</option>
          </select>
          <input type="text" class="autotab" placeholder="Heat #" v-model="heat">
        </div>

        <div center>
          <select v-model="forSale" class="autotab" @change="checkAddressValid" :highlight="errors.addressInvalid">
            <option selected disabled :value="null">
              For Sale?
            </option>
            <option :value="true">For Sale</option>
            <option :value="false">Not For Sale</option>
          </select>
          <input class="autotab" placeholder="$ Cwt (ex: 42)" v-model="cwt" type="number" step="0.01">
        </div>

        <div center>
          <textarea placeholder="Additional remarks" v-model="remarks" class="autotab"></textarea>
        </div>

      </div>

    </div>

    <div errors v-if="errors.addressInvalid">
      <p>
        Please enter a valid address before listing steel for sale
        <br>
        <a @click="editAddress">Click here to edit your address</a>
      </p>
    </div>

    <div col>
      <button green class="autotab">
        {{ btnText }}
      </button>
      <button red type="button" v-if="edit" @click="deletePopup">
        Delete
      </button>
    </div>

    <div errors>
      <p v-if="errors.shape">
        Please enter material shape
      </p>
      <p v-if="errors.dimension">
        Please enter material dimension
      </p>
      <p v-if="errors.length">
        Please enter material length
      </p>
      <p v-if="errors.domestic">
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

  </form>
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
      _id: null,
      shape: null,
      dimension: null,
      feet: null,
      inches: null,
      numerator: null,
      denominator: null,
      quantity: null,
      location: null,
      domestic: null,
      primed: false,
      galvanized: false,
      condition: null,
      grade: null,
      heat: null,
      forSale: null,
      cwt: null,
      remarks: null,
      errors: {
        shape: false,
        dimension: false,
        length: false,
        domestic: false,
        addressInvalid: false
      },
      verified: false,
      prices: []
    }
  },
  computed: {
    shapes () {
      let allShapes = []
      material.forEach(item => {
        allShapes.push(item.shape)
      })
      return allShapes
    },
    dimensions () {
      let newDimensions = []
      material.forEach(item => {
        if (item.shape == this.shape) {
          item.dimensions.forEach(value => {
            newDimensions.push(value.dimension)
          })
        }
      })
      return newDimensions
    },
    weightPerFoot () {

      if (this.shape && this.dimension) {

        let weight = null

        material.forEach(item => {
          if (item.shape == this.shape) {
            item.dimensions.forEach(value => {
              if (value.dimension == this.dimension) {
                weight = value.weight
              }
            })
          }
        })

        return weight

      } else {
        return null
      }

    }
  },
  methods: {
    checkAddressValid () {
      if (this.$store.getters.addressValid) {
        return
      } else {
        this.forSale = false
        this.errors.addressInvalid = true
      }
    },
    editAddress () {
      this.$router.push({
        name: 'EditProfile',
        query: {
          addressInvalid: true
        }
      })
    },
    checkForm () {
      // form error messages
      if (!this.shape) {
        this.errors.shape = true
      } else {
        this.errors.shape = false
      }

      if (!this.dimension) {
        this.errors.dimension = true
      } else {
        this.errors.dimension = false
      }

      if (!this.feet && !this.inches && !this.numerator) {
        this.errors.length = true
      } else {
        this.errors.length = false
      }

      if (this.domestic == null) {
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
      if (this.shape === 'W' || this.shape === 'S' || this.shape === 'M' || this.shape === 'HP') {
        this.grade = 'A992'
      }
      if (this.shape === 'HSS' || this.shape === 'PIPE') {
        this.grade = 'A500'
      }
      if (this.shape === 'C' || this.shape === 'L' || this.shape === 'FB' || this.shape === 'RB' || this.shape === 'SB' || this.shape === 'MC' || this.shape === 'PL') {
        this.grade = 'A36'
      }
      this.autoSetPrice()
    },
    autoSetPrice () {
      if (this.shape) {
        let matched = false
        this.prices.forEach(item => {
          if (item.shape == this.shape) {
            matched = true
            if (this.galvanized) {
              this.cwt = item.galvanized
            } else if (this.primed) {
              this.cwt = item.primed
            } else {
              this.cwt = item.standard
            }
          }
        })
        if (matched == false) {
          this.cwt = null
        }
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
            primed: this.primed,
            galvanized: this.galvanized,
            condition: this.condition,
            grade: this.grade,
            heat: this.heat,
            forSale: this.forSale,
            cwt: this.cwt,
            remarks: this.remarks,
            weightPerFoot: this.weightPerFoot
          })
          .then(() => {
            this.$store.dispatch('complete')
            this.$router.push({
              path: 'material-confirmation',
              query: {
                edit: true
              }
            })
          })
          .catch(() => {
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
            primed: this.primed,
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
          .then(() => {
            this.$store.dispatch('complete')
            this.$router.push({
              path: 'material-confirmation',
              query: {
                newEntry: true
              }
            })
          })
          .catch(() => {
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
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('inventory')
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    }
  },
  created () {
    if (this.edit) {
      this.$store.dispatch('loading')
      api.axios.get(`${api.baseUrl}/material/item`, {
        params: {
          id: this.$route.query.id
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this._id = res.data.material._id
        this.shape = res.data.material.shape
        this.dimension = res.data.material.dimension
        this.feet = res.data.material.feet
        this.inches = res.data.material.inches
        this.numerator = res.data.material.numerator
        this.denominator = res.data.material.denominator
        this.domestic = res.data.material.domestic
        this.primed = res.data.material.primed
        this.galvanized = res.data.material.galvanized
        this.quantity = res.data.material.quantity
        this.location = res.data.material.location
        this.condition = res.data.material.condition
        this.grade = res.data.material.grade
        this.heat = res.data.material.heat
        this.forSale = res.data.material.forSale
        this.cwt = res.data.material.cwt
        this.remarks = res.data.material.remarks
      })
      .catch(() => {
        this.store.dispatch('complete')
      })
    }
  },
  beforeMount () {
    api.axios.get(`${api.baseUrl}/material/get-prices`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.prices = res.data.prices
    })
    .catch(() => {
    })
  }
}
</script>

<style lang="scss" scoped>

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
</style>
