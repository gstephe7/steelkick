<template>
  <div row>

    <aside id="desktop">
      <h3 v-if="buying">Refine Your Search</h3>
      <h3 v-if="inventory">Filter Inventory</h3>
      <Search :buying="buying"
              :inventory="inventory">
      </Search>
    </aside>

    <div main>

      <span back v-if="$route.query.cart" @click="$router.back()">
        &lt; Back to cart
      </span>

      <h1 v-if="buying">Your Search Results</h1>
      <h1 v-if="inventory">Company Inventory</h1>

      <div id="mobile">
        <div card class="mobile-filter" :class="{ show : showFilter }">
          <h3 v-if="buying">Refine Your Search</h3>
          <h3 v-if="inventory">Filter Inventory</h3>
          <Search :buying="buying"
                  :inventory="inventory">
          </Search>
        </div>
        <p @click="toggleFilter">
          <span v-if="buying">Filter Results </span>
          <span v-if="inventory">Filter Inventory </span>
          <icon v-if="showFilter" icon="angle-up"></icon>
          <icon v-else icon="angle-down"></icon>
        </p>
      </div>

      <!-- show if listings were found -->
      <div v-if="listings.length > 0">
        <MaterialPreview v-for="item in listings"
                         :key="item._id"
                         :item="item"
                         :inventory="inventory"
                         :buying="buying">
        </MaterialPreview>
      </div>

      <!-- show if no listings were found -->
      <div v-else>
        <div v-if="buying">
          <h3>We're sorry, we couldn't find the material you're looking for. You can try searching again with different settings.</h3>
          <button @click="$router.push('Search')">Back to Search</button>
        </div>
        <div v-if="inventory">
          <h3>No material found</h3>
          <button @click="$router.push('/dashboard/home')">Back to Dashboard</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import Search from '@/components/search/Search'
import MaterialPreview from '@/components/material/MaterialPreview'

export default {
  props: ['inventory', 'buying', 'listings'],
  components: {
    Search,
    MaterialPreview
  },
  data () {
    return {
      perPage: 25,
      showFilter: false
    }
  },
  methods: {
    toggleFilter () {
      this.showFilter = !this.showFilter
    }
  }
}
</script>

<style lang="scss" scoped>

  #mobile {
    @media screen and (max-width: 999px) {
      display: block;
      text-align: center;
      p {
        cursor: pointer;
        text-align: right;
        color: royalblue;
      }
    }
    @media screen and (min-width: 1000px) {
      display: none;
    }
  }

  #desktop {
    text-align: center;
    @media screen and (max-width: 999px) {
      display: none;
    }
    @media screen and (min-width: 1000px) {
      display: block;
    }
  }

  [main] {
    flex-basis: 100%;
    padding: 25px 5px;
    max-width: 600px;
  }

  .mobile-filter {
    padding: 10px 0;
    display: none;
  }

  .show {
    display: block;
  }

  svg {
    color: royalblue;
    text-decoration: underline;
    font-size: 16px;
  }
</style>
