<template>
  <main>

    <h3>Set Prices</h3>

    <section>
      <article v-for="(price, index) in prices" :key="index">
        <h3>{{ price.name }}</h3>
        <aside>
          <h4>Standard</h4>
          <span>$ <input type="null" v-model="prices[index].standard"> Cwt</span>
        </aside>
        <aside>
          <h4>Primed</h4>
          <span>$ <input type="null" v-model="prices[index].primed"> Cwt</span>
        </aside>
        <aside>
          <h4>Galvanized</h4>
          <span>$ <input type="null" v-model="prices[index].galvanized"> Cwt</span>
        </aside>
        <div class="buttons">
          <p v-if="prices[index].updated" class="success">&#10004; Updated</p>
          <button v-else @click="updatePrices(index)">
            Update {{ price.shape }} Prices
          </button>
        </div>
      </article>
    </section>


  </main>
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
  @import '@/assets/scss/structure.scss';

  main {
    max-width: 1000px;
  }

  article {
    width: 250px;
    box-shadow: $box-shadow;
    border-radius: 2px;
    padding: 15px;
  }

  h3 {
    text-align: center;
  }

  input {
    width: 75px;
  }

  .buttons {
    display: flex;
    justify-content: center;
  }

  .success {
    color: $success;
  }
</style>
