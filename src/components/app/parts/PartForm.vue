<template>
  <div>

    <Form @submit="submit">

      <template v-slot:title>
        <div>
          <span v-if="edit">Edit Part</span>
          <span v-else>Create a New Part</span>
        </div>
        <div>
          {{ $store.getters.currentJob.name }}
        </div>
      </template>

      <template v-slot:content>

        <InputText v-model="part.pieceMark" size="small">
          Piece Mark
        </InputText>

        <InputText v-model="part.minorMark" size="small">
          Minor Mark
        </InputText>

        <InputSelect v-model="part.shape" size="small">
          <template v-slot:label>Shape</template>
          <template v-slot:options>
            <option v-for="shape in shapes"
                    :key="shape"
                    :value="shape">
              {{ shape }}
            </option>
          </template>
        </InputSelect>

        <InputSelect v-model="part.dimension" size="small">
          <template v-slot:label>Dimension</template>
          <template v-slot:options>
            <option v-for="dimension in dimensions"
                    :key="dimension"
                    :value="dimension">
              {{ dimension }}
            </option>
          </template>
        </InputSelect>

        <InputLength v-model="part.length"></InputLength>

        <InputSelect v-model="part.grade" size="small">
          <template v-slot:label>Grade</template>
          <template v-slot:options>
            <option value="A36">A36</option>
            <option value="A992">A992</option>
            <option value="A500">A500</option>
          </template>
        </InputSelect>

        <InputSelect v-model="part.primed" size="small">
          <template v-slot:label>Primed?</template>
          <template v-slot:options>
            <option :value="false">Not Primed</option>
            <option :value="true">Primed</option>
          </template>
        </InputSelect>

        <InputSelect v-model="part.galvanized" size="small">
          <template v-slot:label>Galvanized?</template>
          <template v-slot:options>
            <option :value="false">Not Galvanized</option>
            <option :value="true">Galvanized</option>
          </template>
        </InputSelect>

        <div class="basis" v-if="!edit">
          <hr>
          <p>Sequences</p>
          <div class="center"
               v-for="(sequence, index) in sequences">
            <InputSelect v-model="sequences[index].number" size="small">
              <template v-slot:label>Sequence</template>
              <template v-slot:options>
                <option v-for="item in sequenceList" :value="item">Sequence {{ item }}</option>
              </template>
            </InputSelect>
            <InputText v-model="sequences[index].quantity" size="small">
              Quantity
            </InputText>
          </div>

          <div class="col">
            <button @click="addSequence" type="button">
              + Sequence
            </button>
          </div>
        </div>

        <div class="basis" v-if="!edit">
          <hr>
          <p>Minor Members</p>

          <div>
            <button type="button" @click="addMinorMember" class="autotab">
              + Minor Member
            </button>
          </div>

          <br>

          <div class="align center" v-for="(member, index) in part.minorMembers">
            <icon class="small click red" icon="trash-alt" @click="removeMinorMember(index)"></icon>
            <InputText v-model="member.quantity" size="tiny">
              Quant
            </InputText>
            <InputText v-model="member.minorMark" size="small">
              Minor Mark
            </InputText>
          </div>
          <hr>
        </div>

      </template>

      <template v-slot:action>Create Part</template>

    </Form>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import method from '@/global/methods.js'
import ToolTip from '@/components/app/popups/ToolTip'

export default {
  props: ['edit'],
  components: {
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
