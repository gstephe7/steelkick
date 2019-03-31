<template>
  <div main>

    <h1>Set Prices</h1>

    <div center wrap>
      <section col card v-for="(price, index) in prices" :key="index">
        <h3>{{ price.name }}</h3>
        <label between align>
          Standard
          <span>$ <input small v-model="prices[index].standard"  type="number" step="0.01"> Cwt</span>
        </label>
        <label between align>
          Primed
          <span>$ <input small v-model="prices[index].primed"  type="number" step="0.01"> Cwt</span>
        </label>
        <label between align>
          Galvanized
          <span>$ <input small v-model="prices[index].galvanized"  type="number" step="0.01"> Cwt</span>
        </label>
        <div col>
          <p v-if="prices[index].updated" class="green">&#10004; Updated</p>
          <button v-else @click="updatePrices(index)">
            Update {{ price.shape }} Prices
          </button>
        </div>
      </section>
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
        name: item.name,
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

  [main] {
    max-width: 1000px;
  }

  input[small] {
    width: 75px;
  }

  [card] {
    padding: 15px;
  }
</style>
