<template>
  <div main v-if="loaded">

    <div header col>
      <h1>
        {{ material.shape }} {{ material.dimension }}
      </h1>
      <h2>
        <span v-if="feet">{{ feet }}' </span>
        <span v-if="inches">{{ inches }}" </span>
        <span v-else>0" </span>
        <span v-if="fraction">{{ fraction }}</span>
      </h2>
    </div>

    <hr>

    <div wrap>

      <!-- Use Material 'quick pick' -->
      <section grow box card>
        <div header>
          <h4>Use Material</h4>
        </div>
        <div content>
          <div center>
            <button tiny @click="updateQuantityUsed(-1)">-</button>
            <input tiny id="input" v-model.number="quantityUsed" type="number" @blur="checkNumber">
            <button tiny @click="updateQuantityUsed(+1)">+</button>
          </div>
          <div col>
            <button green @click="useMaterial">
              Use {{ quantityUsed }}
              <span v-if="quantityUsed == 1">Piece</span>
              <span v-else>Pieces</span>
            </button>
          </div>
        </div>
      </section>

      <!-- Material Specs -->
      <section grow box card>
        <div header between>
          <h4>Material</h4>
          <icon small click icon="edit" @click="editing = !editing">
          </icon>
        </div>
        <div content>
          <dl>
            <div row>
              <dt>Shape:</dt>
              <dd>{{ material.shape }}</dd>
            </div>
            <div row>
              <dt>Dimension</dt>
              <dd>{{ material.dimension }}</dd>
            </div>
            <div row>
              <dt>Quantity:</dt>
              <dd>{{ material.quantity }}</dd>
            </div>
            <div row>
              <dt>Length:</dt>
              <dd>
                <span v-if="feet">{{ feet }}' </span>
                <span v-if="inches">{{ inches }}" </span>
                <span v-else>0"</span>
                <span v-if="fraction">{{ fraction }}</span>
              </dd>
            </div>
            <div row>
              <dt>Origin:</dt>
              <dd>
                <span v-if="material.domestic">Domestic</span>
                <span v-else>Foreign</span>
              </dd>
            </div>
            <div row>
              <dt>Condition:</dt>
              <dd>{{ material.condition }}</dd>
            </div>
            <div row>
              <dt>Location:</dt>
              <dd>{{ material.location }}</dd>
            </div>
            <div row>
              <dt>Weight:</dt>
              <dd grow>{{ weight.toFixed(0) }} lbs (per unit)</dd>
            </div>
            <div row>
              <dt>Remarks:</dt>
              <dd col start>
                <span v-if="material.galvanized">Galv.</span>
                <span v-if="material.primed">Prime</span>
                <div v-if="material.remarks">
                  {{ material.remarks }}
                </div>
              </dd>
            </div>
          </dl>
        </div>
        <MaterialEdit v-if="editing" :material="material" @close="editing = false"></MaterialEdit>
      </section>

    </div>

    <div>

      <!-- Actions -->
      <section grow box card>
        <div header>
          <h4>Action Feed</h4>
        </div>
        <div content v-if="actions.length > 0">
          <Action v-for="action in actions"
                  :key="action._id"
                  :action="action">
          </Action>
        </div>
        <div v-else>
          <p col>No actions associated with this part yet</p>
        </div>
      </section>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import method from '@/global/methods'
import MaterialEdit from './MaterialEdit'
import Action from '@/components/app/actions/Action'

export default {
  components: {
    MaterialEdit,
    Action
  },
  data () {
    return {
      material: {},
      actions: [],
      quantityUsed: 1,
      loaded: false,
      editing: false,
    }
  },
  computed: {
    feet () {
      return method.getFeet(this.material.length)
    },
    inches () {
      return method.getInches(this.material.length)
    },
    fraction () {
      return method.getFraction(this.material.length)
    },
    weight () {
      let lengthInFeet = parseFloat(this.material.length / 12)
      return parseFloat(this.material.weightPerFoot) * lengthInFeet
    }
  },
  methods: {
    updateQuantityUsed (number) {
      this.quantityUsed += number
      if (this.quantityUsed > this.material.quantity) {
        this.quantityUsed = this.material.quantity
      }
      if (this.quantityUsed == 0) {
        this.quantityUsed = 1
      }
    },
    checkNumber () {
      if (typeof this.quantityUsed != 'number') {
        this.quantityUsed = 1
      }
    },
    useMaterial () {
      api.post('/material/use-material', {
        materialId: this.material._id,
        quantityUsed: this.quantityUsed
      }, (res) => {
        this.$store.dispatch('action', {
          material: this.material._id,
          materialDescription: `${this.material.shape} ${this.material.dimension} ${this.material.length}"`,
          action: 'picked',
          description: 'from the inventory',
          quantity: this.quantityUsed
        })
        this.$store.dispatch('success', `You have successfully removed ${this.quantityUsed} piece(s) out of your inventory!`)
        .then(() => {
          this.$router.push({
            name: 'Inventory'
          })
        })
      }, 'load')
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/material/item`, {
      params: {
        materialId: this.$route.query.materialId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.material = res.data.material
      this.loaded = true
    })
  },
  created () {
    api.axios.get(`${api.baseUrl}/actions/material-actions`, {
      params: {
        materialId: this.$route.query.materialId
      }
    })
    .then(res => {
      this.actions = res.data.actions
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  section[box] {
    max-width: 260px;
  }

  dd {
    flex: 1;
  }

  button[tiny] {
  }

  input[tiny] {
    width: 40px;
    font-size: 24px;
  }
</style>
