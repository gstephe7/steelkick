<template>
  <Form @submitForm="nest">

    <template #title>
      Configure Nesting Options
    </template>

    <template #content>
      <div class="grow container">
        <h5>Possible Order Lengths</h5>
        <div class="space wrap">
          <span v-for="(length, index) in options">
            <InputCheckBox v-model="options[index].used" tiny>
              {{ length.length / 12 }}'
            </InputCheckBox>
          </span>
        </div>
      </div>
    </template>

    <template #action>
      NEST JOB
    </template>

  </Form>
</template>

<script>
import api from '@/api/api'

export default {
  props: {
    parts: Array
  },
  data () {
    return {
      finalNest: [],
      options: [
        { length: 240, used: true },
        { length: 300, used: true },
        { length: 360, used: true },
        { length: 420, used: true },
        { length: 480, used: true },
        { length: 540, used: true },
        { length: 600, used: true },
        { length: 660, used: true },
        { length: 720, used: true }
      ]
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

  },
  methods: {
    nest () {

      function getLengths (shape, options) {
        let selectedLengths = []
        options.forEach(item => {
          if (item.used) {
            selectedLengths.push(item.length)
          }
        })
        if (shape == 'FB' || shape == 'SB' || shape == 'RB' || shape == 'PIPE') return [240]
        else if (shape == 'C' || shape == 'MC' || shape == 'L') return [240, 480]
        else return selectedLengths
      }

      this.allShapes.forEach(shape => {

        let lengths = getLengths(shape, this.options)

        this.nestMaterial(shape, lengths)

      })

    },


    nestMaterial (shape, lengths) {

      function getDimensions (shape, parts) {
        let dimensions = []
        parts.forEach(part => {
          let index = dimensions.findIndex(value => {
            return value == part.dimension
          })
          if (index == -1) {
            dimensions.push(part.dimension)
          }
        })
        return dimensions
      }

      let dimensions = getDimensions(shape, this.parts)

      dimensions.forEach(dimension => {

        let matchingParts = this.expandedParts.filter(part => {
          if (part.shape == shape && part.dimension == dimension) return true
        })

        function nestParts (parts, lengths) {

          let bestNest = {}

          lengths.forEach(length => {

            let lengthNest = {
              length: length,
              drop: length
            }

            parts.forEach((part, index) => {
              if (part.length < length) {

                let partNest = {
                  length: length,
                  parts: [{
                    quantity: 1,
                    part: part
                  }],
                  drop: length - part.length
                }

                function addParts (start, array) {
                  for (var i = start; i < array.length; i++) {
                    if (i != index) {
                      let newDrop = partNest - array[i].length
                      if (newDrop >= 0) {
                        partNest.push({
                          part: array[i],
                          quantity: 1
                        })
                        partNest.drop = newDrop
                        addParts(i + 1, array)
                      } else {
                        return
                      }
                    }
                  }
                }

                addParts(0, parts)

                if (partNest.drop < lengthNest.drop) {
                  lengthNest = partNest
                }

              }
            })

            if (lengthNest.drop < bestNest.drop) {
              bestNest = lengthNest
            }

          })

          if (matchingParts.length > 0) {
            nestParts(matchingParts, lengths)
          }

        }

        nestParts(matchingParts, lengths)

      })

    }
  }
}
</script>

<style lang="scss" scoped>
</style>
