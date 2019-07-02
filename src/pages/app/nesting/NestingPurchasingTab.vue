<template>
  <div>
    <Form @submitForm="nest">

      <template #title>
        Configure Nesting Options
      </template>

      <template #content>
        <div class="grow container">

          <div>
            <h5>Group Job Sequences</h5>
            <div v-for="(group, index) in options.groups" class="space article">
              <h6>Group {{ index + 1 }}</h6>
              <div class="wrap">
                <span v-for="sequence in group">
                  <InputCheckBox v-model="sequence.included" chip @change="removeSequence(index, sequence.number)">
                    Seq. {{ sequence.number }}
                  </InputCheckBox>
                </span>
              </div>
            </div>
            <div class="space center">
              <Button outline @click="addGroup">
                ADD GROUP
              </Button>
            </div>
          </div>

          <hr>

          <div class="div">
            <h5>Beam Order Lengths</h5>
            <div class="space wrap">
              <span v-for="(length, index) in options.beamLengths">
                <InputCheckBox v-model="options.beamLengths[index].used" tiny>
                  {{ +(length.length / 12).toFixed(2) }}'
                </InputCheckBox>
              </span>
            </div>
            <div class="space">
              <p class="center">
                Add Custom Order Length
              </p>
              <div class="align center">
                <InputLength v-model="options.newBeamLength"
                             :class="{ error : options.errors.beamLength }">
                </InputLength>
                <Button outline @click="addLength(options.newBeamLength, options.beamLengths, 'beamLength')">
                  ADD
                </Button>
              </div>
            </div>
          </div>

          <hr>

          <div class="div">
            <h5>Tube Order Lengths</h5>
            <div class="space wrap">
              <span v-for="(length, index) in options.tubeLengths">
                <InputCheckBox v-model="options.tubeLengths[index].used" tiny>
                  {{ +(length.length / 12).toFixed(2) }}'
                </InputCheckBox>
              </span>
            </div>
            <div class="space">
              <p class="center">
                Add Custom Order Length
              </p>
              <div class="align center">
                <InputLength v-model="options.newTubeLength"
                             :class="{ error : options.errors.tubeLength }">
                </InputLength>
                <Button outline @click="addLength(options.newTubeLength, options.tubeLengths, 'tubeLength')">
                  ADD
                </Button>
              </div>
            </div>
          </div>

          <hr>

        </div>
      </template>

      <template #action>
        NEST JOB
      </template>

    </Form>

    <div v-if="nesting">
      <p class="center">Nesting job... please wait...</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material'

export default {
  props: {
    parts: Array
  },
  data () {
    return {
      nesting: false,
      finalNest: [],
      options: {
        groups: [this.getSequences()],
        beamLengths: [
          { length: 240, used: true },
          { length: 300, used: true },
          { length: 360, used: true },
          { length: 420, used: true },
          { length: 480, used: true },
          { length: 540, used: true },
          { length: 600, used: true },
          { length: 660, used: true },
          { length: 720, used: true }
        ],
        newBeamLength: null,
        tubeLengths: [
          { length: 240, used: true },
          { length: 300, used: true },
          { length: 360, used: true },
          { length: 420, used: true },
          { length: 480, used: true },
          { length: 540, used: true },
          { length: 600, used: true }
        ],
        newTubeLength: null,
        errors: {
          beamLength: false,
          tubeLength: false
        }
      }
    }
  },
  computed: {

    sortedParts () {
      let parts = this.parts
      return parts.sort((a, b) => {
        return b.length - a.length
      })
    },

    groups () {
      let phases = []

      this.options.groups.forEach(group => {
        let sequences = []
        group.forEach(item => {
          if (item.included) {
            sequences.push(item.number)
          }
        })
        let groupParts = this.parts.filter(part => {
          return sequences.find(sequence => {
            return sequence == part.sequence
          })
        })
        phases.push(groupParts.sort((a, b) => {
          return b.length - a.length
        }))
      })

      return phases
    }

  },
  methods: {


    addLength (length, array, error) {
      if (length) {
        this.options.errors[error] = false
        let newIndex = array.findIndex(item => {
          return item.length > length
        })
        if (newIndex == -1) {
          array.push({
            length: length,
            used: true
          })
        } else {
          array.splice(newIndex, 0, {
            length: length,
            used: true
          })
        }
      } else {
        this.options.errors[error] = true
      }
    },


    nest () {

      this.nesting = true

      setTimeout(() => {

        this.groups.forEach((parts, index) => {
          this.nestParts(index)
        })

        this.$emit('newNest', this.finalNest)

        this.$emit('close')

        this.$store.dispatch('snackbar', 'Job successfully nested!')

      }, 25)

    },


    nestParts (index) {
      if (this.groups[index].length > 0) {

        let part = this.groups[index][0]

        let lengths = this.getLengths(part.shape)
        let matches = this.matchingParts(this.groups[index], part.shape, part.dimension)

        let newNest = this.nestLengths(part, matches, lengths)

        this.removeParts(newNest.parts)

        let combinedNest = this.combineNest(newNest)

        this.addNest(combinedNest)

        this.nestParts(index)

      }

      else {
        return
      }
    },


    nestLengths (part, matches, lengths) {
      let currentNest = null

      lengths.forEach(item => {
        if (item >= part.length) {

          let newNest = this.addParts(part, item, matches, null, 1)

          if (currentNest == null || newNest.drop < currentNest.drop) {
            currentNest = newNest
          }

        }
      })

      return currentNest
    },


    addParts (part, length, matches, nest, start) {
      if (start <= matches.length) {

        let newNest = {
          job: this.$store.getters.currentJob._id,
          quantity: 1,
          material: {
            shape: part.shape,
            dimension: part.dimension,
            length: length,
            weightPerFoot: this.getWeight(part)
          },
          parts: [{
            part: part,
            quantity: 1
          }],
          drop: length - part.length
        }

        for (var i = start; i < matches.length; i++) {
          let newDrop = newNest.drop - matches[i].length
          if (newDrop == 0) {
            newNest.parts.push({
              part: matches[i],
              quantity: 1
            })
            newNest.drop = newDrop
            return newNest
          } else if (newDrop > 0) {
            newNest.parts.push({
              part: matches[i],
              quantity: 1
            })
            newNest.drop = newDrop
          }
        }

        if (nest == null || newNest.drop < nest.drop) {
          return this.addParts(part, length, matches, newNest, start + 1)
        } else {
          return this.addParts(part, length, matches, nest, start + 1)
        }

      } else {
        return nest
      }
    },


    combineNest (nest) {
      let combinedNest = nest

      for (var i = 0; i < combinedNest.parts.length; i++) {
        let item = combinedNest.parts[i]
        let nextItem = combinedNest.parts[i + 1]
        if (nextItem) {
          if (item.part.minorMark == nextItem.part.minorMark) {
            nextItem.quantity += item.quantity
            combinedNest.parts.splice(i, 1)
            return this.combineNest(combinedNest)
          }
        }
      }

      return combinedNest
    },


    addNest (nest) {
      if (this.finalNest.length > 0) {
        let lastNest = this.finalNest[this.finalNest.length - 1]

        if (lastNest.parts.length == nest.parts.length) {
          let partsMatch = true
          lastNest.parts.forEach((item, index) => {
            if (item.part.minorMark != nest.parts[index].part.minorMark) {
              partsMatch = false
            }
          })

          if (partsMatch) {
            this.finalNest[this.finalNest.length - 1].quantity += 1
          } else {
            this.finalNest.push(nest)
          }
        } else {
          this.finalNest.push(nest)
        }
      } else {
        this.finalNest.push(nest)
      }
    },


    removeParts (newParts) {
      newParts.forEach(item => {
        let partIndex = this.parts.findIndex(value => {
          return value._id == item.part._id
        })
        if (partIndex != -1) {
          if (this.parts[partIndex].quantity > 1) {
            this.parts[partIndex].quantity -= 1
          } else {
            this.parts.splice(partIndex, 1)
          }
        }
      })

    },


    matchingParts (parts, shape, dimension) {
      let newParts = parts.filter(item => {
        if (item.shape == shape && item.dimension == dimension) {
          return true
        }
      })

      let expandedParts = []

      newParts.forEach(item => {
        if (item.quantity > 1) {
          for (var i = 0; i < item.quantity; i++) {
            expandedParts.push(item)
          }
        } else {
          expandedParts.push(item)
        }
      })

      return expandedParts
    },


    getWeight (part) {
      let weight = 0

      material.forEach(item => {
        if (item.shape == part.shape) {
          item.dimensions.forEach(value => {
            if (value.dimension == part.dimension) {
              weight = value.weight
            }
          })
        }
      })

      return weight
    },


    getLengths (shape) {

      function selectedLengths (array) {
        let lengths = []
        array.forEach(item => {
          if (item.used == true) {
            lengths.push(item.length)
          }
        })
        return lengths.reverse()
      }

      switch (shape) {
        case 'FB':
        case 'SB':
        case 'RB':
        case 'PIPE':
          return [240]
        case 'C':
        case 'MC':
        case 'L':
          return [240, 480]
        case 'HSS':
          return selectedLengths(this.options.tubeLengths)
        case 'W':
        case 'M':
        case 'S':
        case 'HP':
          return selectedLengths(this.options.beamLengths)
      }
    },


    getSequences () {
      let sequences = []

      for (let i = 0; i < this.$store.getters.currentJob.sequences; i++) {
        sequences.push({
          number: i + 1,
          included: true
        })
      }

      return sequences
    },


    addGroup () {
      let sequences = this.getSequences()

      sequences.forEach(item => {
        item.included = false
      })

      this.options.groups.push(sequences)
    },


    removeSequence (placeholder, number) {
      this.options.groups.forEach((group, index) => {
        if (index != placeholder) {
          group.forEach(item => {
            if (item.number == number) {
              item.included = false
            }
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
