<template>
  <div>

    <Form @submitForm="submit" ref="form">

      <template v-slot:title>
        <div>
          {{ $store.getters.currentJob.name }}
        </div>
      </template>

      <template v-slot:content>

        <InputText v-model="part.pieceMark" required>
          Piece Mark
        </InputText>

        <InputText v-model="part.minorMark">
          Minor Mark
        </InputText>

        <InputSelect v-model="part.shape"
                     @input="autoSetGrade"
                     required>
          <template v-slot:label>Shape</template>
          <template v-slot:options>
            <option v-for="shape in shapes"
                    :key="shape"
                    :value="shape">
              {{ shape }}
            </option>
          </template>
        </InputSelect>

        <InputSelect v-model="part.dimension" required>
          <template v-slot:label>Dimension</template>
          <template v-slot:options>
            <option v-for="dimension in dimensions"
                    :key="dimension"
                    :value="dimension">
              {{ dimension }}
            </option>
          </template>
        </InputSelect>

        <InputLength v-model="part.length" :edit="edit" required>
        </InputLength>

        <InputSelect v-model="part.grade">
          <template v-slot:label>Grade</template>
          <template v-slot:options>
            <option value="A36">A36</option>
            <option value="A992">A992</option>
            <option value="A500">A500</option>
          </template>
        </InputSelect>

        <InputCheckBox v-model="part.primed">
          Primed
        </InputCheckBox>

        <InputCheckBox v-model="part.galvanized">
          Galvanized
        </InputCheckBox>

        <div class="basis">
          <hr>
          <div class="between align">
            <span class="article">
              Sequences
            </span>
            <Button text @click="addSequence" v-if="!edit">
              + ADD
            </Button>
          </div>
          <div class="space">
            <div class="center align"
                 v-for="(sequence, index) in sequences">
              <InputSelect v-model="sequences[index].number">
                <template v-slot:label>Sequence</template>
                <template v-slot:options>
                  <option v-for="item in sequenceList" :value="item">Sequence {{ item }}</option>
                </template>
              </InputSelect>
              <InputText v-model.number="sequences[index].quantity"
                         type="number"
                         tiny>
                Quan
              </InputText>
              <Button outline delete v-if="!edit" @click="removeSequence(index)">
                <icon icon="times"></icon>
              </Button>
            </div>
          </div>
        </div>

        <div class="basis">
          <hr>
          <div class="between align">
            <span class="article">
              Minor Members
            </span>
            <Button text @click="addMinorMember">
              + ADD
            </Button>
          </div>
          <div class="space">
            <div class="align center" v-for="(member, index) in part.minorMembers">
              <InputText v-model="member.minorMark">
                Minor Mark
              </InputText>
              <InputText v-model.number="member.quantity"
                         type="number"
                         tiny>
                Quant
              </InputText>
              <Button outline delete @click="removeMinorMember(index)">
                <icon icon="times"></icon>
              </Button>
            </div>
          </div>
        </div>

      </template>

    </Form>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import method from '@/global/methods.js'

export default {
  props: {
    edit: Object
  },
  data () {
    return {
      part: {
        minorMembers: []
      },
      sequences: []
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
    removeSequence (index) {
      this.sequences.splice(index, 1)
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
      if (this.edit) {
        if (this.sequences[0].quantity) {
          this.part.quantity = this.sequences[0].quantity
        } else {
          this.part.quantity = 1
        }
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
    submitForm () {
      this.$refs.form.submit()
    },
    submit () {
      this.autoCompleteForm()

      if (this.edit) {
        this.$store.dispatch('loading')
        api.axios.put(`${api.baseUrl}/jobs/edit-part`, {
          part: this.part
        })
        .then(() => {
          this.$store.dispatch('complete')
          this.$emit('close')
          this.$store.dispatch('snackbar', 'Part updated successfully!')
        })
      }

      else {
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/jobs/create-part`, {
          part: this.part,
          jobId: this.$store.getters.currentJob._id,
          sequences: this.sequences
        })
        .then(() => {

          let newParts = []
          this.sequences.forEach(item => {
            let part = this.part
            part.sequence = item.number
            part.quantity = item.quantity
            part.progress = []
            newParts.push(part)
          })

          this.$store.dispatch('complete')
          this.$emit('close', newParts)
          this.$store.dispatch('snackbar', 'Part created successfully!')
        })
      }

    }
  },
  created () {
    if (this.edit) {
      this.part = this.edit
      this.sequences.push({
        number: this.part.sequence,
        quantity: this.part.quantity
      })
    } else {
      this.sequences.push({
        number: this.sequenceList[0],
        quantity: null
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
