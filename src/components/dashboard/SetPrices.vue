<template>
  <div id="set-prices">

    <h3>Set Prices</h3>

    <div class="container">
      <div>
        <h3>All Listings</h3>
      </div>
      <div>
        <span>$ <input type="number" v-model="all" @change="warn" :class="{ highlight : allListingsWarn }"> Cwt</span>
      </div>
    </div>

    <!-- Warning for changing price of all listings -->
    <div v-if="allListingsWarn" class="warn">
      <p>Be careful! Updating this price will change the price of ALL your listings!</p>
    </div>

    <div class="container">
      <div>
        <h3>A36 Angle</h3>
      </div>
      <div>
        <span>$ <input type="number" v-model="a36Angle"> Cwt</span>
      </div>
    </div>

    <div class="container">
      <div>
        <h3>A36 Channel</h3>
      </div>
      <div>
        <span>$ <input type="number" v-model="a36Channel"> Cwt</span>
      </div>
    </div>

    <div class="container">
      <div>
        <h3>A992 W Beams</h3>
      </div>
      <div>
        <span>$ <input type="number" v-model="a992Beams"> Cwt</span>
      </div>
    </div>

    <div class="container">
      <div>
        <h3>A500 Tubes</h3>
      </div>
      <div>
        <span>$ <input type="number" v-model="a500Tubes"> Cwt</span>
      </div>
    </div>

    <div class="buttons">
      <button @click="updatePrices">Update Prices</button>
    </div>

  </div>
</template>

<script>
export default {
  data () {
    return {
      all: null,
      a36Channel: 42.53,
      a36Angle: 41.89,
      a992Beams: 45.54,
      a500Tubes: 49.69,
      allListingsWarn: false
    }
  },
  methods: {
    warn () {
      this.allListingsWarn = true
    },
    updatePrices () {
      this.$router.push('/dashboard/home')
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

  .container {
    display: flex;
    justify-content: space-between;
    margin: 10px;
    min-width: 300px;
    box-shadow: $box-shadow;
    border-radius: 2px;
    padding: 20px;
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
</style>
