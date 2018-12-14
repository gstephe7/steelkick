<template>
  <div id="listings">

    <h2>Your Search Results</h2>

    <!-- show if listings were found -->
    <div v-if="listings.length > 0">

      <div>
        <select v-model="perPage">
          <option selected value="25">show 25</option>
          <option value="50">show 50</option>
          <option value="75">show 75</option>
          <option value="100">show 100</option>
        </select>
      </div>

      <div class="results">
        <ListingPreview v-for="listing in listings"
                        :key="listing.id"
                        :listing="listing">
        </ListingPreview>
      </div>

      <div class="buttons">
        <button>PREV</button>
        <button>NEXT</button>
      </div>

    </div>

    <!-- show if no listings were found -->
    <div v-else class="results">
      <h3>We're sorry, we couldn't find the material you're looking for. You can try searching again with different settings.</h3>
      <button @click="$router.push('Search')">Back to Search</button>
    </div>

  </div>
</template>

<script>
import ListingPreview from '@/components/listings/ListingPreview'

export default {
  components: {
    ListingPreview
  },
  data () {
    return {
      perPage: 25,
      listings: [
        {
          id: 'gsh27dh7263',
          shape: 'w',
          dimension: '8x10',
          feet: 10,
          inches: 7,
          numerator: 7,
          denominator: 8,
          cwt: 42,
          grade: 'A992',
          heat: '593726718',
          quantity: 1,
          domestic: true,
          painted: false,
          galvanized: false,
          company: 'Benco Welding Inc.',
          city: 'Winder',
          state: 'GA',
          cut: true,
          delivery: true
        },
        {
          id: 'gsh27dh7262',
          shape: 'w',
          dimension: '8x10',
          feet: 14,
          inches: 4,
          numerator: 3,
          denominator: 16,
          cwt: 36,
          grade: 'A992',
          heat: '',
          quantity: 3,
          domestic: true,
          painted: false,
          galvanized: false,
          company: 'AMD Welding',
          city: 'Winder',
          state: 'GA',
          cut: false,
          delivery: false
        },
        {
          id: 'gsh27dh7264',
          shape: 'hss',
          dimension: '3x3x1/4',
          feet: 8,
          inches: 6,
          numerator: null,
          denominator: null,
          cwt: 48,
          grade: 'A500',
          heat: '593726718',
          quantity: 5,
          domestic: true,
          painted: true,
          galvanized: false,
          company: 'RAI',
          city: 'Athens',
          state: 'GA',
          cut: true,
          delivery: true
        },
        {
          id: 'gsh27dh7265',
          shape: 'hss',
          dimension: '3 1/2 x 3 1/2 x 5/16',
          feet: 16,
          inches: 10,
          numerator: 15,
          denominator: 16,
          cwt: 39,
          grade: 'A36',
          heat: '593726718',
          quantity: 10,
          domestic: false,
          painted: false,
          galvanized: true,
          company: 'King Steel',
          city: 'Lawrenceville',
          state: 'GA',
          cut: true,
          delivery: true
        },
        {
          id: 'gsh27dh7266',
          shape: 'c',
          dimension: '3x4.1',
          feet: 10,
          inches: 11,
          numerator: 7,
          denominator: 8,
          cwt: 45,
          grade: 'A36',
          heat: '593726718',
          quantity: 1,
          domestic: true,
          painted: true,
          galvanized: true,
          company: 'Benco Welding Inc.',
          city: 'Winder',
          state: 'GA',
          cut: true,
          delivery: true
        },
        {
          id: 'gsh27dh7273',
          shape: 'w',
          dimension: '8x10',
          feet: 10,
          inches: 7,
          numerator: 7,
          denominator: 8,
          cwt: 42,
          grade: 'A992',
          heat: '593726718',
          quantity: 1,
          domestic: true,
          painted: false,
          galvanized: false,
          company: 'Benco Welding Inc.',
          city: 'Winder',
          state: 'GA',
          cut: true,
          delivery: true
        },
        {
          id: 'gsh27dh7267',
          shape: 'w',
          dimension: '8x10',
          feet: 10,
          inches: 7,
          numerator: 7,
          denominator: 8,
          cwt: 42,
          grade: 'A992',
          heat: '593726718',
          quantity: 1,
          domestic: true,
          painted: false,
          galvanized: false,
          company: 'Benco Welding Inc.',
          city: 'Winder',
          state: 'GA',
          cut: true,
          delivery: true
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #listings {
    padding: 10px;
    max-width: 840px;
    margin: auto;
  }

  .results {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50px;
  }

  select {
    border: 1px solid $accent;
  }

  .buttons {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: auto;
    margin-top: 50px;
  }
</style>
