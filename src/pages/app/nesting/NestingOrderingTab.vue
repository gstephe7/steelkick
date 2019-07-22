<template>
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
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
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

    groups () {
      let phases = []

      this.options.groups.forEach(group => {
        let sequences = []
        group.forEach(item => {
          if (item.included) {
            sequences.push(item.number)
          }
        })
        phases.push(sequences)
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
    },


    nest () {

      api.request({
        type: 'post',
        endpoint: '/nest/',
        load: true,
        data: {
          jobId: this.$store.getters.currentJob._id,
          options: {
            groups: this.groups,
            beamLengths: this.options.beamLengths,
            tubeLengths: this.options.tubeLengths
          }
        },
        res: res => {
          this.$router.push('job-details')
          setTimeout(() => {
            this.$router.push('nesting')
          }, 10)
          this.$store.dispatch('snackbar', 'Successfully nested parts!')
        },
        err: err => {
          console.log(err)
        }
      })

    }


  }
}
</script>

<style lang="scss" scoped>
</style>
