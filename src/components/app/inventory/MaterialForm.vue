<template>
  <form @submit.prevent="completeEntry">

    <div center wrap>

      <div col>

        <div center>
          <select @change="autoSetGrade" class="autotab" v-model="material.shape" :highlight="errors.shape" id="autofocus">
            <option disabled selected :value="undefined">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape }}
            </option>
          </select>
          <select v-model="material.dimension" class="autotab" :highlight="errors.dimension">
            <option disabled selected :value="undefined">Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>

        <div center>
          <LengthInput v-model="material.length" :edit="material" :highlight="errors.length"></LengthInput>
          <input type="number" class="autotab" v-model="material.quantity" placeholder="Quantity" maxlength="4">
        </div>

        <div center>
          <select v-model="material.primed" class="autotab" @change="autoSetPrice">
            <option :value="undefined">Not Primed</option>
            <option :value="true">Primed</option>
          </select>
          <select v-model="material.galvanized" class="autotab" @change="autoSetPrice">
            <option :value="undefined">Not Galvanized</option>
            <option :value="true">Galvanized</option>
          </select>
        </div>

        <div center>
          <textarea placeholder="Location in shop (for internal use)" v-model="material.location" class="autotab"></textarea>
        </div>

        <br>

      </div>

      <div col>

        <div center>
          <select v-model="material.domestic" class="autotab" :highlight="errors.domestic">
            <option disabled selected :value="undefined">Steel Origin</option>
            <option :value="true">Domestic</option>
            <option :value="false">Foreign</option>
          </select>
          <select v-model="material.condition" class="autotab">
            <option selected disabled :value="undefined">
              Condition
            </option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Fair">Fair</option>
            <option value="Poor">Poor</option>
          </select>
        </div>

        <div center>
          <select v-model="material.grade" class="autotab">
            <option selected disabled :value="undefined">
              Grade
            </option>
            <option value="A36">A36</option>
            <option value="A992">A992</option>
            <option value="A500">A500</option>
          </select>
          <input type="text" class="autotab" placeholder="Heat #" v-model="material.heat">
        </div>

        <div center>
          <select v-model="material.forSale" class="autotab" @change="checkAddressValid" :highlight="errors.addressInvalid">
            <option selected disabled :value="undefined">
              For Sale?
            </option>
            <option :value="true">For Sale</option>
            <option :value="false">Not For Sale</option>
          </select>
          <input class="autotab" placeholder="$ Cwt (ex: 42)" v-model="material.cwt" type="number" step="0.01">
        </div>

        <div center>
          <textarea placeholder="Additional remarks" v-model="material.remarks" class="autotab"></textarea>
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
import ConfirmationPopup from '@/components/app/popups/ConfirmationPopup'
import LengthInput from '@/components/app/inputs/LengthInput'

export default {
  props: ['btnText', 'edit'],
  components: {
    ConfirmationPopup,
    LengthInput
  },
  data () {
    return {
      showDeletePopup: false,
      material: {},
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
        if (item.shape == this.material.shape) {
          item.dimensions.forEach(value => {
            newDimensions.push(value.dimension)
          })
        }
      })
      return newDimensions
    },
    weightPerFoot () {

      if (this.material.shape && this.material.dimension) {

        let weight = null

        material.forEach(item => {
          if (item.shape == this.material.shape) {
            item.dimensions.forEach(value => {
              if (value.dimension == this.material.dimension) {
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
        this.material.forSale = false
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
      // set the company for the material
      this.material.company = this.$store.getters.companyId
      this.material.weightPerFoot = this.weightPerFoot

      // form error messages
      if (!this.material.shape) {
        this.errors.shape = true
      } else {
        this.errors.shape = false
      }

      if (!this.material.dimension) {
        this.errors.dimension = true
      } else {
        this.errors.dimension = false
      }

      if (!this.material.length) {
        this.errors.length = true
      } else {
        this.errors.length = false
      }

      if (!this.material.domestic) {
        this.errors.domestic = true
      } else {
        this.errors.domestic = false
      }

      // resort to default values
      if (!this.material.quantity) {
        this.quantity = 1
      }

      if (!this.errors.shape && !this.errors.dimension && !this.errors.length && !this.errors.domestic) {
        this.verified = true
      }
    },
    autoSetGrade () {
      if (this.material.shape === 'W' || this.material.shape === 'S' || this.material.shape === 'M' || this.material.shape === 'HP') {
        this.material.grade = 'A992'
      }
      if (this.material.shape === 'HSS' || this.material.shape === 'PIPE') {
        this.material.grade = 'A500'
      }
      if (this.material.shape === 'C' || this.material.shape === 'L' || this.material.shape === 'FB' || this.material.shape === 'RB' || this.material.shape === 'SB' || this.material.shape === 'MC' || this.material.shape === 'PL') {
        this.grade = 'A36'
      }
      this.autoSetPrice()
    },
    autoSetPrice () {
      if (this.material.shape) {
        let matched = false
        this.prices.forEach(item => {
          if (item.shape == this.material.shape) {
            matched = true
            if (this.material.galvanized) {
              this.material.cwt = item.galvanized
            } else if (this.material.primed) {
              this.material.cwt = item.primed
            } else {
              this.material.cwt = item.standard
            }
          }
        })
        if (matched == false) {
          this.material.cwt = null
        }
      }
    },
    completeEntry () {
      this.checkForm()

      if (this.verified) {
        if (this.edit) {
          this.$store.dispatch('loading')
          api.axios.put(`${api.baseUrl}/material/edit-material`, {
            material: this.material
          })
          .then(() => {
            this.$store.dispatch('complete')
            this.$emit('close')
            this.$store.dispatch('action', {
              material: this.material._id,
              action: 'edited',
              description: 'in the inventory',
              quantity: this.material.quantity
            })
            this.$store.dispatch('success', 'Successfully updated material!')
            .then(() => {
              location.reload(true)
            })
          })
          .catch(() => {
            this.$store.dispatch('complete')
          })

        } else {
          this.$store.dispatch('loading')
          api.axios.post(`${api.baseUrl}/material/new-material`, {
            material: this.material
          })
          .then(res => {
            this.$store.dispatch('complete')
            this.$store.dispatch('action', {
              material: res.data.material._id,
              action: 'added',
              description: 'to the inventory',
              quantity: res.data.material.quantity
            })
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
          _id: this.material._id
        }
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$store.dispatch('action', {
          materialDescription: `${this.material.shape} ${this.material.dimension} ${this.material.length}"`,
          action: 'deleted',
          description: 'from the inventory',
          quantity: this.material.quantity
        })
        this.$router.push('inventory')
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })
    }
  },
  created () {
    if (this.edit) {
      this.material = this.edit
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
  },
  mounted () {
    document.getElementById('autofocus').focus()
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
