<template>
  <Form @submitForm="submit">

    <template v-slot:title>
      <span v-if="!edit">Add New Material</span>
    </template>

    <template v-slot:content>

      <div>

        <div class="center">
          <!-- Shape -->
          <InputSelect v-model="material.shape"
                       @input="autoSetGrade"
                       :auto="true"
                       :highlight="errors.shape">
            <template v-slot:label>
              Shape
            </template>
            <template v-slot:options>
              <option v-for="shape in shapes" :key="shape" :value="shape">
                {{ shape }}
              </option>
            </template>
          </InputSelect>

          <!-- Dimension -->
          <InputSelect v-model="material.dimension"
                       :auto="true"
                       :highlight="errors.dimension">
            <template v-slot:label>
              Dimension
            </template>
            <template v-slot:options>
              <option v-for="dimension in dimensions" :key="dimension" :value="dimension">
                {{ dimension }}
              </option>
            </template>
          </InputSelect>
        </div>

        <div class="center">
          <!-- Length -->
          <InputLength v-model="material.length" :highlight="errors.length" :edit="edit">
            Length
          </InputLength>

          <!-- Quantity -->
          <InputText v-model="material.quantity"
                     type="number"
                     :auto="true">
            Quantity
          </InputText>
        </div>

        <div class="center">
          <!-- Primed -->
          <InputSelect v-model="material.primed" :auto="true">
            <template v-slot:label>
              Primed?
            </template>
            <template v-slot:options>
              <option :value="false">
                Not Primed
              </option>
              <option :value="true">
                Primed
              </option>
            </template>
          </InputSelect>

          <!-- Galvanized -->
          <InputSelect v-model="material.galvanized" :auto="true">
            <template v-slot:label>
              Galvanized?
            </template>
            <template v-slot:options>
              <option :value="false">
                Not Galvanized
              </option>
              <option :value="true">
                Galvanized
              </option>
            </template>
          </InputSelect>
        </div>

        <div class="center">
          <!-- Location -->
          <InputTextArea v-model="material.location" :auto="true">
            Location
          </InputTextArea>
        </div>

      </div>

      <div>

        <div class="center">
          <!-- Origin -->
          <InputSelect v-model="material.domestic" :auto="true" :highlight="errors.domestic">
            <template v-slot:label>
              Steel Origin
            </template>
            <template v-slot:options>
              <option :value="true">
                Domestic
              </option>
              <option :value="false">
                Foreign
              </option>
            </template>
          </InputSelect>

          <!-- Condition -->
          <InputSelect v-model="material.condition" :auto="true">
            <template v-slot:label>
              Condition
            </template>
            <template v-slot:options>
              <option value="Excellent">Excellent</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
              <option value="Poor">Poor</option>
            </template>
          </InputSelect>
        </div>

        <div class="center">
          <!-- Grade -->
          <InputSelect v-model="material.grade" :auto="true">
            <template v-slot:label>
              Grade
            </template>
            <template v-slot:options>
              <option value="A36">A36</option>
              <option value="A992">A992</option>
              <option value="A500">A500</option>
            </template>
          </InputSelect>

          <!-- Heat Number -->
          <InputText v-model="material.heat" :auto="true">
            Heat #
          </InputText>
        </div>

        <div class="center">
          <!-- For Sale -->
          <InputSelect v-model="material.forSale" :auto="true">
            <template v-slot:label>
              For Sale?
            </template>
            <template v-slot:options>
              <option :value="false">Not For Sale</option>
              <option :value="true">For Sale</option>
            </template>
          </InputSelect>

          <!-- CWT Price -->
          <InputText v-model="material.cwt" :auto="true">
            $CWT Price
          </InputText>
        </div>

        <div class="center">
          <!-- Remarks -->
          <InputTextArea v-model="material.remarks" :auto="true">
            Remarks
          </InputTextArea>
        </div>

      </div>

    </template>

    <template v-slot:action>
      <span v-if="!edit">Add Material</span>
    </template>

    <template v-slot:errors>
      <span v-if="errors.shape">
        Please enter a shape
      </span>
      <span v-if="errors.dimension">
        Please enter a dimension
      </span>
      <span v-if="errors.length">
        Please enter a length
      </span>
      <span v-if="errors.domestic">
        Please enter origin of material
      </span>
    </template>

  </Form>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'

export default {
  props: ['edit'],
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

      if (this.material.domestic == undefined) {
        this.errors.domestic = true
      } else {
        this.errors.domestic = false
      }

      // resort to default values
      if (!this.material.quantity) {
        this.material.quantity = 1
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
        this.material.grade = 'A36'
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
    submit () {
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
            this.$store.dispatch('snackbar', 'Successfully updated material!')
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
            this.$router.push('/inventory')
            this.$store.dispatch('snackbar', 'New material added!')
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
  }
}
</script>

<style lang="scss" scoped>
</style>
