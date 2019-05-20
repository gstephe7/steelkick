<template>
  <form @submit.prevent="submit">

    <div center wrap>

      <div>
        <div row>
          <input v-model="part.pieceMark" placeholder="Piece Mark" :highlight="errors.pieceMark" class="autotab" id="autofocus">
          <input v-model="part.minorMark" placeholder="Minor Mark" :highlight="errors.pieceMark" class="autotab">
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
          <LengthInput v-model="part.length" :edit="edit" :highlight="errors.length"></LengthInput>
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

    <div center v-if="edit">
      <div row>
        <label>
          Seq. {{ part.sequence.number }} Quantity:
        </label>
        <input v-model="part.quantity" class="autotab">
      </div>
    </div>

    <!-- Sequences -->
    <div col v-if="!edit">

      <p>
        Sequences
        <ToolTip>
          Add this part to different sequences within the job.
        </ToolTip>
      </p>

      <div row v-for="(sequence, index) in sequences">
        <select v-model="sequences[index].number" class="autotab" :highlight="sequences[index].error">
          <option v-for="item in sequenceList" :value="item">Sequence {{ item }}</option>
        </select>
        <input v-model="sequences[index].quantity" placeholder="Quantity" class="autotab" :highlight="errors.quantity">
      </div>

      <button type="button" @click="addSequence">
        + Add to Another Seq.
      </button>

    </div>

    <br>

    <!-- Minor Members -->
    <div col v-if="!edit">

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
        <input small v-model="member.minorMark" placeholder="Minor Mark">
      </div>

    </div>

    <div center v-if="edit">
      <button small type="button" @click="$emit('close')">
        Cancel
      </button>
      <button small green type="submit">
        Save
      </button>
    </div>

    <div v-else>
      <br>
      <hr>
      <br>
      <div col>
        <button green type="submit">Create Part</button>
      </div>
    </div>

    <div errors>
      <p v-if="errors.pieceMark">
        Please enter a piece mark or minor mark for this part
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
      <p v-if="errors.quantity">
        Please enter a quantity for at least one sequence
      </p>
      <span v-if="errors.repeat">
        <p v-for="item in errors.repeats">
          This part has already been created for Sequence {{ item }}
        </p>
      </span>
    </div>

  </form>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import method from '@/global/methods.js'
import LengthInput from '@/components/app/inputs/LengthInput'
import ToolTip from '@/components/app/popups/ToolTip'

export default {
  props: ['edit'],
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
      existingParts: [],
      errors: {
        pieceMark: false,
        shape: false,
        dimension: false,
        length: false,
        quantity: false,
        repeat: false,
        repeats: []
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
    sequenceList () {
      return method.getSequences(this.$store.getters.currentJob.sequences)
    },
    totalQuantity () {
      let quant = 0
      this.sequences.forEach(item => {
        quant += item.quantity
      })
      return quant
    },
    formValid () {
      if (this.errors.pieceMark || this.errors.shape || this.errors.dimension || this.errors.length || this.errors.quantity || this.errors.repeat) {
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
      let index = this.sequences.length + 1

      if (this.sequences.length < this.sequenceList.length) {
        this.sequences.push({
          number: index,
          quantity: null
        })
      }
    },
    addMinorMember () {
      this.part.minorMembers.push({
        quantity: null,
        minorMark: ''
      })
    },
    removeMinorMember (index) {
      this.part.minorMembers.splice(index, 1)
    },
    autoCompleteForm () {
      if (this.edit && !this.part.quantity) {
        this.part.quantity = 1
      }

      if (!this.part.minorMark) {
        this.part.minorMark = this.part.pieceMark
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

      if (!this.part.pieceMark && !this.part.minorMark) {
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

      if (this.totalQuantity == 0) {
        this.errors.quantity = true
      } else {
        this.errors.quantity = false
      }

      // check existing parts for this job to see if part was already made for this sequence
      this.errors.repeats = []
      this.sequences.forEach((sequence, index) => {
        sequence.error = false
        if (sequence.quantity > 0) {
          this.existingParts.forEach(part => {
            if (sequence.number == part.sequence && part.minorMark == this.part.minorMark) {
              sequence.error = true
              this.errors.repeats.push(sequence.number)
            }
          })
        } else {
          if (this.sequences.length > 1) {
            this.sequences.splice(index, 1)
          }
        }
      })

      if (this.errors.repeats.length > 0) {
        this.errors.repeat = true
      } else {
        this.errors.repeat = false
      }
    },
    submit () {
      this.checkForm()
      if (this.formValid) {

        if (this.edit) {
          this.$store.dispatch('loading')
          api.axios.put(`${api.baseUrl}/jobs/edit-part`, {
            part: this.part
          })
          .then(() => {
            this.$store.dispatch('complete')
            location.reload(true)
          })
        }

        else {
          this.$store.dispatch('loading')
          api.axios.post(`${api.baseUrl}/jobs/create-part`, {
            part: this.part,
            jobId: this.$store.getters.currentJob._id,
            sequences: this.sequences
          })
          .then(res => {
            this.$store.dispatch('complete')
            this.$router.push('/parts')
            this.$store.dispatch('snackbar', 'Part created successfully!')
          })
        }

      }
    }
  },
  created () {
    if (this.edit) {
      this.part = this.edit
    } else {
      api.get('/jobs/parts', {
        jobId: this.$store.getters.currentJob._id,
        select: 'minorMark sequence'
      }, (res) => {
        this.existingParts = res.data.parts
      })
      this.addSequence()
    }
  },
  mounted () {
    document.getElementById('autofocus').focus()
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

  label {
    width: 110px;
    padding: 10px 15px;
    margin: 5px;
    text-align: left;
  }
</style>
