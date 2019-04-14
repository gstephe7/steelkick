<template>
  <div main>

    <Back>Back to sequence</Back>

    <h1>Create New Part</h1>

    <hr>

    <div col>
      <h2>{{ $route.query.jobName }}</h2>
      <h3>Sequence {{ $route.query.sequenceNumber }}</h3>
    </div>

    <br>

    <form @submit.prevent="submit">

      <div center wrap>

        <div>
          <div row>
            <input v-model="part.pieceMark" placeholder="Piece Mark" :highlight="errors.pieceMark" class="autotab">
            <select v-model="part.shape" class="autotab" @change="autoSetGrade" :highlight="errors.shape">
              <option disabled selected :value="undefined">
                Shape
              </option>
              <option v-for="shape in shapes" :value="shape" :key="shape">
                {{ shape }}
              </option>
            </select>
          </div>
          <div row>
            <select v-model="part.dimension" class="autotab" :highlight="errors.dimension">
              <option disabled selected :value="undefined">Dimension</option>
              <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
            </select>
            <LengthInput v-model="part.length" :highlight="errors.length"></LengthInput>
          </div>
        </div>

        <div>
          <div row>
            <input v-model.number="part.quantity" :placeholder="`Seq. ${this.$route.query.sequenceNumber} Quantity`" class="autotab">
            <select v-model="part.grade" class="autotab">
              <option selected disabled :value="undefined">
                Grade
              </option>
              <option value="A36">A36</option>
              <option value="A992">A992</option>
              <option value="A500">A500</option>
            </select>
          </div>
          <div row>
            <select v-model="part.primed" class="autotab">
              <option selected disabled :value="undefined">Primed?</option>
              <option :value="false">Not Primed</option>
              <option :value="true">Primed</option>
            </select>
            <select v-model="part.galvanized" class="autotab">
              <option selected disabled :value="undefined">Galvanized?</option>
              <option :value="false">Not Galvanized</option>
              <option :value="true">Galvanized</option>
            </select>
          </div>
        </div>

      </div>

      <br>

      <!-- Minor Members -->
      <div col>

        <p>
          Minor Members
          <ToolTip>
            Add the piece marks of minor members associated with this part.
          </ToolTip>
        </p>

        <button type="button" @click="addMinorMember" class="autotab">
          + Add Minor Member
        </button>

        <div align v-for="(member, index) in part.minorMembers">
          <br>
          <icon small click class="red" icon="trash-alt" @click="removeMinorMember(index)"></icon>
          <input tiny v-model.number="member.quantity" placeholder="Quant">
          <input small v-model="member.pieceMark" placeholder="Piece Mark">
        </div>

      </div>

      <br>
      <hr>
      <br>

      <div col>
        <button green type="submit">Create Part</button>
      </div>

      <div errors>
        <p v-if="errors.pieceMark">
          Please enter a piece mark for this part
        </p>
        <p v-if="errors.shape">
          Please enter a shape for this part
        </p>
        <p v-if="errors.dimension">
          Please enter a dimension for this part
        </p>
        <p v-if="errors.length">
          Please enter a length for this part
        </p>
      </div>

    </form>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import LengthInput from '@/components/app/inputs/LengthInput'
import ToolTip from '@/components/app/popups/ToolTip'

export default {
  components: {
    LengthInput,
    ToolTip
  },
  data () {
    return {
      part: {
        minorMembers: []
      },
      errors: {
        pieceMark: false,
        shape: false,
        dimension: false,
        length: false
      }
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
        if (item.shape == this.part.shape) {
          item.dimensions.forEach(value => {
            newDimensions.push(value.dimension)
          })
        }
      })
      return newDimensions
    },
    formValid () {
      if (this.errors.pieceMark || this.errors.shape || this.errors.dimension || this.errors.length) {
        return false
      } else {
        return true
      }
    }
  },
  methods: {
    autoSetGrade () {
      if (this.part.shape === 'W' || this.part.shape === 'S' || this.part.shape === 'M' || this.part.shape === 'HP') {
        this.part.grade = 'A992'
      }
      if (this.part.shape === 'HSS' || this.part.shape === 'PIPE') {
        this.part.grade = 'A500'
      }
      if (this.part.shape === 'C' || this.part.shape === 'L' || this.part.shape === 'FB' || this.part.shape === 'RB' || this.part.shape === 'SB' || this.part.shape === 'MC' || this.part.shape === 'PL') {
        this.part.grade = 'A36'
      }
    },
    addMinorMember () {
      this.part.minorMembers.push({
        quantity: null,
        pieceMark: ''
      })
    },
    removeMinorMember (index) {
      this.part.minorMembers.splice(index, 1)
    },
    autoCompleteForm () {
      if (!this.part.quantity) {
        this.part.quantity = 1
      }

      let weightPerFoot = null
      let lengthInFeet = this.part.length / 12

      material.forEach(shape => {
        if (shape.shape == this.part.shape) {
          shape.dimensions.forEach(dimension => {
            if (dimension.dimension == this.part.dimension) {
              weightPerFoot = dimension.weight
            }
          })
        }
      })

      this.part.weight = weightPerFoot * lengthInFeet
    },
    checkForm () {
      this.autoCompleteForm()

      if (!this.part.pieceMark) {
        this.errors.pieceMark = true
      } else {
        this.errors.pieceMark = false
      }

      if (!this.part.shape) {
        this.errors.shape = true
      } else {
        this.errors.shape = false
      }

      if (!this.part.dimension) {
        this.errors.dimension = true
      } else {
        this.errors.dimension = false
      }

      if (!this.part.length) {
        this.errors.length = true
      } else {
        this.errors.length = false
      }
    },
    submit () {
      this.checkForm()
      if (this.formValid) {
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/jobs/create-part`, {
          part: this.part,
          job: this.$route.query.job,
          sequence: this.$route.query.sequence,
          sequenceNumber: this.$route.query.sequenceNumber
        })
        .then(res => {
          this.$store.dispatch('complete')
          console.log(res)
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    margin-bottom: 0px;
  }

  h3 {
    margin-top: 0px;
  }

  input[tiny] {
    width: 50px;
  }
</style>
