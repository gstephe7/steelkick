<template>
    <div id="listing">

      <p class="back" @click="$router.back()">
        < Back to results
      </p>

      <div class="listing-details">

        <!-- Heading with shape, length, and cwt -->
        <div class="heading">
          <div>
            <h2>
              {{ listing.shape.toUpperCase() }} {{ listing.dimension }}
            </h2>
          </div>
          <div>
            <h2>${{ listing.cwt }} cwt</h2>
          </div>
        </div>

        <div class="heading">
          <div>
            <p>
              {{ listing.feet }}' {{ listing.inches }}" <span v-if="listing.numerator">{{ listing.numerator }}/{{ listing.denominator }}</span>
            </p>
          </div>
          <div>
            <p>{{ listing.quantity }} available</p>
          </div>
        </div>

        <!-- Additional details on material -->
        <div class="info-container">
          <div>
            <p>{{ listing.grade }}</p>
          </div>
          <div>
            <p v-if="listing.domestic">Domestic</p>
            <p v-else>Foreign</p>
          </div>
          <div>
            <p v-if="listing.heat"><span class="check">&#10004;</span>Heat #s included</p>
          </div>
          <div>
            <p v-if="listing.painted"><span class="check">&#10004;</span>Painted</p>
          </div>
          <div>
            <p v-if="listing.galvanized"><span class="check">&#10004;</span>Galvanized</p>
          </div>
        </div>

        <!-- Preferences for order -->
        <div class="preferences">
          <div>
            Order Quantity: <input class="quantity-input" type="number" @change="maxQuantity" v-model="order.quantity">
          </div>
        </div>

        <!-- Material price -->
        <div class="sub-total">

        </div>

      </div>
    </div>
</template>

<script>
export default {
  data () {
    return {
      listing: {
        id: 'gsh27dh7263',
        shape: 'w',
        dimension: '8x10',
        weight: 10,
        feet: 10,
        inches: 7,
        numerator: 7,
        denominator: 8,
        cwt: 42,
        grade: 'A992',
        heat: '593726718',
        quantity: 1,
        domestic: true,
        painted: true,
        galvanized: true
      },
      company: {
        company: 'Benco Welding Inc.',
        city: 'Winder',
        state: 'GA',
        cut: true,
        cutPrice: 5,
        delivery: true,
        deliveryMaxWeight: 2000,
        deliveryMaxLength: 20,
        deliveryPrice: 2,
        deliveryMaxDistance: 25
      },
      order: {
        quantity: 1
      }
    }
  },
  methods: {
    maxQuantity (e) {
      if (e.target.value > this.listing.quantity) {
        e.target.value = this.listing.quantity
      }
    }
  },
  computed: {
    totalWeight () {

    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #listing {
    padding: 10px;
    max-width: 600px;
    margin: auto;
  }

  .back {
    color: royalblue;
    cursor: pointer;
    margin: 25px 0 25px 0;
  }

  .heading {
    display: flex;
    justify-content: space-between;
  }

  .info-container {
    margin-top: 25px;
  }

  .preferences {
    margin-top: 25px;
  }

  .quantity-input {
    width: 50px;
  }

  input {
    border: 1px solid $accent;
  }

  h2 {
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
  }
</style>
