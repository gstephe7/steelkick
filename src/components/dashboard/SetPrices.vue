<template>
  <div id="set-prices">

    <h3>Set Prices</h3>

    <div class="div" v-for="(price, index) in prices" :key="index">
      <div>
        <div>
          <h3>{{ price.shape }}</h3>
        </div>
        <div class="container">
          <div>
            <h4>Standard</h4>
          </div>
          <div>
            <span>$ <input type="null" v-model="prices[index].standard"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Primed</h4>
          </div>
          <div>
            <span>$ <input type="null" v-model="prices[index].primed"> Cwt</span>
          </div>
        </div>
        <div class="container">
          <div>
            <h4>Galvanized</h4>
          </div>
          <div>
            <span>$ <input type="null" v-model="prices[index].galvanized"> Cwt</span>
          </div>
        </div>
      </div>
      <div class="buttons">
        <p v-if="prices[index].updated" class="success">&#10004; Updated</p>
        <button v-else @click="updatePrices(index)">
          Update {{ price.shape }} Prices
        </button>
      </div>
    </div>

  </div>
</template>

<script>
import material from '@/assets/data/material'
import api from '@/api/api'

export default {
  data () {
    return {
      prices: []
    }
  },
  created () {
    material.forEach(item => {
      this.prices.push({
        shape: item.shape,
        standard: null,
        primed: null,
        galvanized: null,
        updated: false
      })
    })
  },
  beforeMount () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/material/get-prices`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      res.data.prices.forEach(item => {
        this.prices.forEach((value, index) => {
          if (item.shape == value.shape) {
            this.prices[index].standard = item.standard
            this.prices[index].primed = item.primed
            this.prices[index].galvanized = item.galvanized
          }
        })
      })
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })
  },
  methods: {
    updatePrices (index) {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/material/set-prices`, {
        company: this.$store.getters.companyId,
        shape: this.prices[index].shape,
        standard: this.prices[index].standard,
        primed: this.prices[index].primed,
        galvanized: this.prices[index].galvanized
      })
      .then(res => {
        this.$store.dispatch('complete')
        this.updateComplete(index)
      })
      .catch(err => {
        this.$store.dispatch('complete')
      })
    },
    updateComplete (index) {
      this.prices[index].updated = true
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
