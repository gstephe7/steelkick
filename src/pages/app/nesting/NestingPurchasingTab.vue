<template>
  <Form @submitForm="nest">

    <template #title>
      Configure Nesting Options
    </template>

    <template #content>
      <div class="grow container">

        <div>
          <h5>Beam Order Lengths</h5>
          <div class="space wrap">
            <span v-for="(length, index) in beamOptions">
              <InputCheckBox v-model="beamOptions[index].used" tiny>
                {{ +(length.length / 12).toFixed(2) }}'
              </InputCheckBox>
            </span>
          </div>
          <div class="space">
            <p class="center">
              Add Custom Order Length
            </p>
            <div class="align center">
              <InputLength v-model="newBeamLength"
                           :class="{ error : errors.beamLength }">
              </InputLength>
              <Button outline @click="addLength(newBeamLength, beamOptions, 'beamLength')">
                ADD
              </Button>
            </div>
          </div>
        </div>

        <hr>

        <div class="div">
          <h5>Tube Order Lengths</h5>
          <div class="space wrap">
            <span v-for="(length, index) in tubeOptions">
              <InputCheckBox v-model="tubeOptions[index].used" tiny>
                {{ +(length.length / 12).toFixed(2) }}'
              </InputCheckBox>
            </span>
          </div>
          <div class="space">
            <p class="center">
              Add Custom Order Length
            </p>
            <div class="align center">
              <InputLength v-model="newTubeLength"
                           :class="{ error : errors.tubeLength }">
              </InputLength>
              <Button outline @click="addLength(newTubeLength, tubeOptions, 'tubeLength')">
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
      finalNest: [],
      beamOptions: [
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
      tubeOptions: [
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
  },
  computed: {
    allShapes () {
      let shapes = []

      this.parts.forEach(part => {
        let shapeIndex = shapes.findIndex(value => {
          return value == part.shape
        })
        if (shapeIndex == -1) {
          shapes.push(part.shape)
        }
      })

      return shapes
    },
    allSequences () {
      let sequences = []

      this.parts.forEach(part => {
        let seqIndex = sequences.findIndex(value => {
          return value == part.sequence
        })
        if (seqIndex == -1) {
          sequences.push(part.sequence)
        }
      })

      return sequences
    },
    expandedParts () {
      let multParts = []

      this.parts.forEach(part => {
        if (part.quantity > 1) {
          for (var i = 0; i < part.quantity; i++) {
            multParts.push(part)
          }
        } else {
          multParts.push(part)
        }
      })

      return multParts.sort((a, b) => {
        return b.length - a.length
      })
    },
    updatedFinalNest () {
      return this.combineNest(this.finalNest)
    }
  },
  methods: {
    addLength (length, array, error) {
      if (length) {
        this.errors[error] = false
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
        this.errors[error] = true
      }
    },
    nest () {

      this.allShapes.forEach(shape => {

        this.nestDimensions(shape)

      })

      this.$emit('newNest', this.updatedFinalNest)

      this.$emit('close')

      this.$store.dispatch('snackbar', 'Job successfully nested!')

    },


    nestDimensions (shape) {

      let allDimensions = this.getDimensions(shape)

      allDimensions.forEach(dimension => {

        this.nestLengths(shape, dimension)

      })

    },

    nestSequences (shape, dimension) {

      let sequences = []

      this.allSequences.forEach(item => {
        let parts = this.expandedParts.filter(part => {
          if (part.shape == shape && part.dimension == dimension && part.sequence == item) {
            return true
          }
        })
        sequences.push(parts)
      })

    },

    nestLengths (shape, dimension) {

      let nest = {
        drop: 5000
      }

      let parts = this.expandedParts.filter(part => {
        if (part.shape == shape && part.dimension == dimension) {
          return true
        }
      })

      if (parts.length > 0) {

        let allLengths = this.getLengths(shape).reverse()

        allLengths.forEach(length => {

          let newNest = this.nestParts(shape, dimension, length, parts)

          if (newNest.drop < nest.drop) {
            nest = newNest
          }

        })

        this.finalNest.push(nest)

        this.removeParts(nest.parts)

        if (parts.length > 0) {
          this.nestLengths(shape, dimension)
        }

      }

    },


    nestParts (shape, dimension, length, parts) {

      let nest = {
        job: this.$store.getters.currentJob._id,
        material: {
          shape: shape,
          dimension: dimension,
          length: length,
          weightPerFoot: this.getWeight(shape, dimension)
        },
        parts: [],
        quantity: 1,
        drop: length
      }

      parts.forEach((part, index) => {
        if (part.length < length) {

          let newNest = {
            job: this.$store.getters.currentJob._id,
            material: {
              shape: shape,
              dimension: dimension,
              length: length,
              weightPerFoot: this.getWeight(shape, dimension)
            },
            parts: [{
              part: part,
              quantity: 1
            }],
            quantity: 1,
            drop: length - part.length
          }

          function addParts (start) {
            for (var i = start; i < parts.length; i++) {
              if (i != index) {
                let newDrop = newNest.drop - parts[i].length
                if (newDrop >= 0) {
                  newNest.parts.push({
                    part: parts[i],
                    quantity: 1
                  })
                  newNest.drop = newDrop
                  addParts(i + 1)
                } else {
                  return
                }
              }
            }
          }

          addParts(0)

          if (newNest.drop < nest.drop) {
            nest = newNest
          }

        }

      })

      return nest

    },


    removeParts (parts) {

      parts.forEach(item => {
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


    getDimensions (shape) {
      let dimensions = []

      this.parts.forEach(part => {
        if (part.shape == shape) {
          let index = dimensions.findIndex(value => {
            return value == part.dimension
          })
          if (index == -1) {
            dimensions.push(part.dimension)
          }
        }
      })

      return dimensions
    },


    getParts (shape, dimension) {
      return this.expandedParts.filter(part => {
        if (part.shape == shape && part.dimension == dimension) {
          return true
        }
      })
    },


    getLengths (shape) {
      if (shape == 'FB' || shape == 'SB' || shape == 'RB' || shape == 'PIPE') {
        return [240]
      } else if (shape == 'C' || shape == 'MC' || shape == 'L') {
        return [240, 480]
      } else if (shape == 'HSS') {
        let tubeLengths = []
        this.tubeOptions.forEach(item => {
          if (item.used) {
            tubeLengths.push(item.length)
          }
        })
        return tubeLengths
      } else {
        let beamLengths = []
        this.beamOptions.forEach(item => {
          if (item.used) {
            beamLengths.push(item.length)
          }
        })
        return beamLengths
      }
    },


    getWeight (shape, dimension) {
      let weight = 0

      material.forEach(item => {
        if (item.shape == shape) {
          item.dimensions.forEach(value => {
            if (value.dimension == dimension) {
              weight = value.weight
            }
          })
        }
      })

      return weight
    },


    combineNest (nest) {

      let newNest = nest

      function multNests () {

        newNest.forEach((item, index) => {

          if (item.parts.length > 1) {

            function multParts () {
              for (var i = 1; i < item.parts.length; i++) {
                if (item.parts[i].part.minorMark == item.parts[i - 1].part.minorMark) {
                  item.parts[i - 1].quantity += 1
                  item.parts.splice(i, 1)
                  multParts()
                }
              }
            }

            multParts()

          }

          if (index > 0 && item.parts.length == newNest[index - 1].parts.length) {

            let match = true

            item.parts.forEach((part, x) => {
              if (part.part.minorMark != newNest[index - 1].parts[x].part.minorMark) {
                match = false
              }
            })

            if (match) {
              newNest[index - 1].quantity += 1
              newNest.splice(index, 1)
              multNests()
            }

          }

        })

      }

      multNests()

      return newNest

    }

  }
}
</script>

<style lang="scss" scoped>
</style>
