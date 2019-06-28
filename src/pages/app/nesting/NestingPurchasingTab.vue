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
      options: {
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
      },
      nesting: {
        part: {},
        nest: {
          job: this.$store.getters.currentJob._id,
          quantity: 1,
          material: {},
          parts: [],
          drop: 5000
        }
      }
    }
  },
  computed: {


    lengths () {
      if (this.nesting.part) {

        function getLengths (array) {
          let selectedLengths = []
          array.forEach(item => {
            if (item.used == true) {
              selectedLengths.push(item.length)
            }
          })
          return selectedLengths.reverse()
        }

        switch (this.nesting.part.shape) {
          case 'FB':
          case 'SB':
          case 'RB':
          case 'PIPE':
            return [240]
            break
          case 'C':
          case 'MC':
          case 'L':
            return [240, 480]
            break
          case 'HSS':
            return getLengths(this.options.tubeLengths)
            break
          case 'W':
          case 'M':
          case 'S':
          case 'HP':
            return getLengths(this.options.beamLengths)
        }
      }
    },


    sortedParts () {
      let parts = this.parts
      return parts.sort((a, b) => {
        return b.length - a.length
      })
    },


    matchingParts () {
      if (this.nesting.part) {

        let parts = this.sortedParts.filter(item => {
          if (item.shape == this.nesting.part.shape && item.dimension == this.nesting.part.dimension) {
            return true
          }
        })

        let expandedParts = []

        parts.forEach(item => {
          if (item.quantity > 1) {
            for (var i = 0; i < item.quantity; i++) {
              expandedParts.push(item)
            }
          } else {
            expandedParts.push(item)
          }
        })

        return expandedParts

      }
    },


    partWeight () {
      if (this.nesting.part) {
        let weight = 0

        material.forEach(item => {
          if (item.shape == this.nesting.part.shape) {
            item.dimensions.forEach(value => {
              if (value.dimension == this.nesting.part.dimension) {
                weight = value.weight
              }
            })
          }
        })

        return weight
      }
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

      this.nestParts()

      this.$emit('newNest', this.finalNest)

      this.$emit('close')

      this.$store.dispatch('snackbar', 'Job successfully nested!')

    },


    nestParts () {
      if (this.sortedParts.length > 0) {

        // reset temp nests
        this.nesting.nest.material = {}
        this.nesting.nest.parts = []
        this.nesting.nest.drop = 5000

        // set temp nests
        let part = this.sortedParts[0]
        this.nesting.part = part
        this.nesting.nest.material = {
          shape: part.shape,
          dimension: part.dimension,
          weight: this.partWeight
        }

        this.removeParts([this.nesting])

        this.nestLengths()

        this.nestParts()

      }

      else {
        return
      }
    },


    nestLengths () {
      this.lengths.forEach(item => {
        if (item >= this.nesting.part.length) {

          this.addParts(item, 0)

        }
      })

      let newParts = this.nesting.nest.parts.slice(1)

      this.removeParts(newParts)

      this.combineNest()

      this.addNest()
    },


    addParts (length, start) {
      if (start < this.matchingParts.length) {

        let nest = {
          parts: [{
            part: this.nesting.part,
            quantity: 1
          }],
          drop: length - this.nesting.part.length
        }

        for (var i = start; i < this.matchingParts.length; i++) {
          let newDrop = nest.drop - this.matchingParts[i].length
          if (newDrop >= 0) {
            nest.parts.push({
              part: this.matchingParts[i],
              quantity: 1
            })
            nest.drop = newDrop
          }
        }

        if (nest.drop < this.nesting.nest.drop) {
          this.nesting.nest.parts = nest.parts
          this.nesting.nest.drop = nest.drop
          this.nesting.nest.material.length = length
        }

        this.addParts(length, start + 1)

      } else {
        return
      }
    },


    combineNest () {
      for (var i = 0; i < this.nesting.nest.parts.length; i++) {
        let item = this.nesting.nest.parts[i]
        let nextItem = this.nesting.nest.parts[i + 1]
        if (nextItem) {
          if (item.part.minorMark == nextItem.part.minorMark) {
            nextItem.quantity += item.quantity
            this.nesting.nest.parts.splice(i, 1)
            return this.combineNest()
          }
        }
      }
    },


    addNest () {
      let material = this.nesting.nest.material
      let parts = this.nesting.nest.parts

      let nestIndex = this.finalNest.findIndex(item => {
        if (item.material.shape == material.shape && item.material.dimension == material.dimension && item.material.length == material.length) {
          return true
        }
      })

      if (nestIndex == -1) {
        this.finalNest.push(this.nesting.nest)
      } else {
        let partsMatch = true
        this.finalNest[nestIndex].parts.forEach((item, index) => {
          if (item.part.minorMark != parts[index].part.minorMark) {
            partsMatch = false
          }
        })
        if (partsMatch) {
          this.finalNest[nestIndex].quantity += 1
        } else {
          this.finalNest.push(this.nesting.nest)
        }
      }
    },


    removeParts (parts) {

      parts.forEach(item => {
        let partIndex = this.parts.findIndex(value => {
          return value._id == item.part._id
        })
        console.log(parts, partIndex)
        if (partIndex != -1) {
          if (this.parts[partIndex].quantity > 1) {
            this.parts[partIndex].quantity -= 1
          } else {
            this.parts.splice(partIndex, 1)
          }
        }
      })

    }

  }
}
</script>

<style lang="scss" scoped>
</style>
