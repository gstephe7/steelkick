<template>
  <div id="set-prices">

    <h3>Set Prices</h3>

    <div class="div">
      <div>
        <div>
          <h3>A36 Angle</h3>
        </div>
        <div class="container">
          <div>
            <h4>Standard</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.l.standard"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Primed</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.l.primed"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Galvanized</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.l.galvanized"> Cwt</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <p v-if="updated.l" class="success">&#10004; Updated</p>
        <button v-else @click="updatePrices({ prices: prices.l, shape: 'l' })">Update Angle Prices</button>
      </div>
    </div>

    <div class="div">
      <div>
        <div>
          <h3>A36 Channel</h3>
        </div>
        <div class="container">
          <div>
            <h4>Standard</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.c.standard"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Primed</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.c.primed"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Galvanized</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.c.galvanized"> Cwt</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <p v-if="updated.c" class="success">&#10004; Updated</p>
        <button v-else @click="updatePrices({ prices: prices.c, shape: 'c' })">Update Channel Prices</button>
      </div>
    </div>

    <div class="div">
      <div>
        <div>
          <h3>A992 Wide Flange Beams</h3>
        </div>
        <div class="container">
          <div>
            <h4>Standard</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.w.standard"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Primed</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.w.primed"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Galvanized</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.w.galvanized"> Cwt</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <p v-if="updated.w" class="success">&#10004; Updated</p>
        <button v-else @click="updatePrices({ prices: prices.w, shape: 'w' })">Update W Beam Prices</button>
      </div>
    </div>

    <div class="div">
      <div>
        <div>
          <h3>A500 Tubes</h3>
        </div>
        <div class="container">
          <div>
            <h4>Standard</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.hss.standard"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Primed</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.hss.primed"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Galvanized</h4>
          </div>
          <div>
            <span>$ <input type="number" v-model="prices.hss.galvanized"> Cwt</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <p v-if="updated.hss" class="success">&#10004; Updated</p>
        <button v-else @click="updatePrices({ prices: prices.hss, shape: 'hss' })">Update Tube Prices</button>
      </div>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      prices: {
        c: {
          standard: null,
          primed: null,
          galvanized: null
        },
        l: {
          standard: null,
          primed: null,
          galvanized: null
        },
        w: {
          standard: null,
          primed: null,
          galvanized: null
        },
        hss: {
          standard: null,
          primed: null,
          galvanized: null
        }
      },
      updated: {
        l: false,
        c: false,
        w: false,
        hss: false
      }
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/material/get-prices`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.prices = res.data.prices
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    updatePrices ({ prices, shape }) {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/material/set-prices`, {
        company: this.$store.getters.companyId,
        shape: shape,
        prices: prices
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.updateComplete(shape)
      })
      .catch(err => {
        this.$store.dispatch('complete')
      })
    },
    updateComplete (shape) {
      this.updated[shape] = true
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #set-prices {
    max-width: 600px;
    padding: 10px;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .div {
    display: flex;
    flex-direction: column;
    margin: 10px;
    min-width: 280px;
    box-shadow: $box-shadow;
    border-radius: 2px;
    padding: 20px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    margin-left: 20%;
  }

  input {
    border: 1px solid $accent;
    width: 75px;
  }

  .warn {
    text-align: center;
    color: $alert;
  }

  .highlight {
    outline: thin solid $alert;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  .success {
    color: $success;
  }
</style>
