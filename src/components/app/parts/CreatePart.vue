<template>
  <div main>

    <Back>Back</Back>

    <h1>Create New Part</h1>

    <hr>

    <div col>
      <h2>{{ $route.query.jobName }}</h2>
    </div>

    <br>

    <form @submit.prevent="submit">

      <div center wrap>

        <div>
          <div row>
            <input v-model="part.pieceMark" placeholder="Piece Mark" :highlight="errors.pieceMark" class="autotab">
            <input v-model="part.minorMark" placeholder="Minor Mark" class="autotab">
          </div>
          <div row>
            <select v-model="part.shape" class="autotab" @change="autoSetGrade" :highlight="errors.shape">
              <option disabled selected :value="undefined">
                Shape
              </option>
              <option v-for="shape in shapes" :value="shape" :key="shape">
                {{ shape }}
              </option>
            </select>
            <select v-model="part.dimension" class="autotab" :highlight="errors.dimension">
              <option disabled selected :value="undefined">Dimension</option>
              <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
            </select>
          </div>
        </div>

        <div>
          <div row>
            <LengthInput v-model="part.length" :highlight="errors.length"></LengthInput>
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

      <!-- Sequences -->
      <div col>

        <p>
          Sequences
          <ToolTip>
            Add this part to different sequences within the job.
          </ToolTip>
        </p>

        <div row v-for="(sequence, index) in sequences">
          <select v-model="sequences[index].id" class="autotab" :highlight="sequences[index].error">
            <option v-for="item in sequenceList" :value="item._id">Sequence {{ item.number }}</option>
          </select>
          <input v-model="sequences[index].quantity" placeholder="Quantity" class="autotab" :highlight="sequences[index].error">
        </div>

        <button type="button" @click="addSequence">+ Add to Another Seq.</button>

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
        <span v-if="errors.repeat">
          <p v-for="item in errors.messages">
            {{ item }}
          </p>
        </span>
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
      sequences: [],
      sequenceList: [],
      errors: {
        pieceMark: false,
        shape: false,
        dimension: false,
        length: false,
        repeat: false,
        messages: []
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
    addSequence () {
      let index = this.sequences.length
      this.sequences.push({
        id: this.sequenceList[index]._id,
        number: this.sequenceList[index].number,
        quantity: null
      })
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
          sequences: this.sequences
        })
        .then(res => {
          this.$store.dispatch('complete')
          this.$router.push({
            name: 'PartConfirmation',
            query: {
              job: this.$route.query.job,
              jobName: this.$route.query.jobName,
              new: true
            }
          })
        })
        .catch(err => {
          this.$store.dispatch('complete')
          this.errors.repeat = true
          this.errors.messages = err.response.data.messages
          err.response.data.sequences.forEach(item => {
            this.sequences.forEach(value => {
              if (item == value.id) {
                value.error = true
              }
            })
          })
        })
      }
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/sequences`, {
      params: {
        id: this.$route.query.job
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.sequenceList = res.data.sequences
      this.sequences.push({
        id: res.data.sequences[0]._id,
        number: res.data.sequences[0].number,
        quantity: null
      })
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
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
