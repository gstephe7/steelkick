<template>
  <div class="main">

    <h1>{{ company.name }}</h1>

    <hr>

    <div card v-if="companyLoaded">
      <EditCompany v-if="editing"
                   :company="company"
                   @close="editing = false">
      </EditCompany>


      <ViewCompany v-else
                   :company="company"
                   @editing="editing = true">
      </ViewCompany>
    </div>

    <div card>
      <div>
        <h2>Material</h2>
        <hr>
      </div>
      <div v-if="material.length > 0">

      </div>

      <div v-else>
        <p>No material for this company</p>
      </div>
    </div>

    <div class="section col">
      <h2>Create Parts</h2>
      <InputSelect v-model="jobId" big>
        <template #label>Job</template>
        <template #options>
          <option v-for="job in jobs" :value="job._id">
            {{ job.name }}
          </option>
        </template>
      </InputSelect>
      <InputText v-model="numberOfParts" big type="number">
        # of Parts
      </InputText>
      <Button create @click="createParts">
        Create
      </Button>
      <div v-if="partsCreated">
        Success!
      </div>
    </div>

    <div class="section">
      <button red @click="showDelete = !showDelete">Delete Company</button>
    </div>

    <div v-if="showDelete">
      <p>
        Are you sure you want to delete this company?
      </p>
      <div around>
        <button @click="showDelete = false">Cancel</button>
        <button red @click="deleteCompany">Delete</button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import ViewCompany from '@/pages/app/marketplace/editProfile/ViewCompany'
import EditCompany from '@/pages/app/marketplace/editProfile/EditCompany'

export default {
  components: {
    ViewCompany,
    EditCompany
  },
  data () {
    return {
      company: {},
      material: [],
      jobId: null,
      jobs: [],
      numberOfParts: null,
      companyLoaded: false,
      editing: false,
      showDelete: false,
      partsCreated: false
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
    currentJob () {
      let jobIndex = this.jobs.findIndex(job => {
        return job._id == this.jobId
      })

      return this.jobs[jobIndex]
    }
  },
  methods: {
    deleteCompany () {
      this.$store.dispatch('loading')
      api.axios
        .delete(`${api.baseUrl}/admin/delete-company`, {
          params: {
            id: this.company._id
          }
        })
        .then(() => {
          this.$store.dispatch('complete')
          this.$router.push({ name: 'AdminHome' })
        })
        .catch(() => {
          this.$store.dispatch('complete')
        })
    },
    createParts () {
      let parts = []
      let currentSequences = this.currentJob.sequences
      let jobId = this.jobId

      function randomPart () {
        let part = {}

        let randomShape = () => {
          let num = Math.random()
          if (num < 0.55) return "W"
          else if (num < 0.8) return "HSS"
          else if (num < 0.9) return "L"
          else if (num < 0.97) return "C"
          else return "FB"
        }

        let randomDimension = (shape) => {
          let dimensions = []
          let acceptedDims = ['8x10', '10x12', '12x14', '14x22', '16x26', '18x35', '21x44', '24x55', '3x3x1/4', '4x4x1/4', '5x5x5/16', '6x6x3/8', '4x5.4', '5x6.7', '6x8.2', '1/4x4', '3/8x6']
          material.forEach(item => {
            if (item.shape == shape) {
              item.dimensions.forEach(value => {
                let match = acceptedDims.find(dim => {
                  return dim == value.dimension
                })
                if (match) {
                  dimensions.push(value.dimension)
                }
              })
            }
          })
          let num = Math.floor(Math.random() * dimensions.length)

          return dimensions[num]
        }

        let randomMark = (shape) => {
          let page = () => {
            if (shape == 'L' || shape == 'C') return Math.floor((Math.random() * 2) + 1)
            else return Math.floor((Math.random() * 100) + 3)
          }

          let member = () => {
            if (shape == 'W') return 'B'
            else if (shape == 'HSS') return 'C'
            else if (shape == 'L') return 'MA'
            else return 'MC'
          }
          let number = Math.floor((Math.random() * 9) + 1)
          return `${page()}${member()}${number}`
        }

        let randomLength = (shape) => {
          let num = Math.random()
          if (shape == 'W') return Math.floor((num * 500) + 36)
          else if (shape == 'HSS') return Math.floor((num * 500) + 24)
          else return Math.floor(num * 240)
        }

        let randomSequences = (shape, jobSequences) => {
          let sequences = []
          let randomQuant = () => {
            if (shape == 'L') return Math.floor(Math.random() * 50)
            else return Math.floor(Math.random() * 3)
          }
          for (var i = 0; i < jobSequences; i++) {
            let coinFlip = Math.random()
            if (coinFlip > 0.5) {
              sequences.push({
                number: i + 1,
                quantity: randomQuant()
              })
            }
          }
          return sequences
        }

        let findWeight = (shape, dimension, length) => {
          let weight = 0
          let lengthInFeet = parseFloat(length / 12)
          material.forEach(item => {
            if (item.shape == shape) {
              item.dimensions.forEach(value => {
                if (value.dimension == dimension) {
                  weight = parseFloat(value.weight)
                }
              })
            }
          })
          return weight * lengthInFeet
        }

        part.shape = randomShape()
        part.dimension = randomDimension(part.shape)
        part.minorMark = randomMark(part.shape)
        part.length = randomLength(part.shape)
        part.weight = findWeight(part.shape, part.dimension, part.length)
        part.job = jobId

        return {
          sequences: randomSequences(part.shape, currentSequences),
          part: part
        }
      }

      for (var i = 0; i < this.numberOfParts; i++) {
        let newPart = randomPart()
        parts.push(newPart)
      }

      api.request({
        type: 'post',
        endpoint: '/admin/create-parts',
        load: true,
        data: {
          parts: parts
        },
        res: res => {
          this.partsCreated = true
        }
      })

    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios
      .get(`${api.baseUrl}/users/company`, {
        params: {
          companyId: this.$route.query.companyId
        }
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.company = res.data.company
        this.companyLoaded = true
      })
      .catch(() => {
        this.$store.dispatch('complete')
      })

    api.axios
      .get(`${api.baseUrl}/admin/company-material`, {
        params: {
          companyId: this.$route.query.companyId
        }
      })
      .then(res => {
        this.material = res.data.material
      })

    api.request({
      type: 'get',
      endpoint: '/jobs/jobs',
      data: {
        companyId: this.$route.query.companyId
      },
      res: res => {
        this.jobs = res.data.jobs
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
