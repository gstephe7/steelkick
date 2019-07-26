<template>
  <Form @submitForm="submit" ref="form">

    <template v-slot:content>

      <div>

        <div class="center">
          <!-- Shape -->
          <InputSelect v-model="material.shape"
                       @input="autoSetGrade"
                       required>
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
                       required>
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
          <InputLength v-model="material.length"
                       :edit="edit"
                       required>
            Length
          </InputLength>

          <!-- Quantity -->
          <InputText v-model.number="material.quantity"
                     type="number">
            Quantity
          </InputText>
        </div>

        <div class="center">
          <!-- Primed -->
          <InputCheckBox v-model="material.primed">
            Primed
          </InputCheckBox>

          <!-- Galvanized -->
          <InputCheckBox v-model="material.galvanized">
            Galvanized
          </InputCheckBox>
        </div>

        <div class="center">
          <!-- Location -->
          <InputTextArea v-model="material.location">
            Location
          </InputTextArea>
        </div>

      </div>

      <div>

        <div class="center">
          <!-- Origin -->
          <InputCheckBox v-model="material.domestic">
            Domestic
          </InputCheckBox>

          <!-- Condition -->
          <InputSelect v-model="material.condition">
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
          <InputSelect v-model="material.grade">
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
          <InputText v-model="material.heat">
            Heat #
          </InputText>
        </div>

        <div class="center">
          <!-- For Sale -->
          <InputCheckBox v-model="material.forSale">
            For Sale
          </InputCheckBox>

          <!-- CWT Price -->
          <InputText v-model="material.cwt">
            $CWT Price
          </InputText>
        </div>

        <div class="center">
          <!-- Remarks -->
          <InputTextArea v-model="material.remarks">
            Remarks
          </InputTextArea>
        </div>

      </div>

    </template>

  </Form>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'

export default {
  props: {
    edit: Object
  },
  data () {
    return {
      material: {},
      prices: [],
      showDeletePopup: false
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
    checkForm () {
      // set the company for the material
      this.material.company = this.$store.getters.companyId
      this.material.weightPerFoot = this.weightPerFoot

      // resort to default values
      if (!this.material.quantity) {
        this.material.quantity = 1
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
    submitForm () {
      this.$refs.form.submit()
    },
    submit () {
      this.checkForm()

      if (this.edit) {
        this.$store.dispatch('loading')
        api.axios.put(`${api.baseUrl}/material/edit-material`, {
          material: this.material
        })
        .then(() => {
          this.$emit('close')
          this.$store.dispatch('complete')
          this.$store.dispatch('action', {
            material: this.material._id,
            materialDescription: `${res.data.material.shape}${res.data.material.dimension} ${res.data.material.length}"`,
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
          this.$emit('close', res.data.material)
          this.$store.dispatch('complete')
          this.$store.dispatch('action', {
            material: res.data.material._id,
            materialDescription: `${res.data.material.shape}${res.data.material.dimension} ${res.data.material.length}"`,
            action: 'added',
            description: 'to the inventory',
            quantity: res.data.material.quantity
          })
          this.$store.dispatch('snackbar', 'New material added!')
        })
        .catch(() => {
          this.$store.dispatch('complete')
        })
      }
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
        companyId: this.$store.getters.companyId
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
