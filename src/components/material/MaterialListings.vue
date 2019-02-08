<template>
  <div id="results">

    <div id="sidebar">
      <h3 v-if="buying">Refine Your Search</h3>
      <h3 v-if="inventory">Filter Inventory</h3>
      <AdvancedSearch :buying="buying"
                      :inventory="inventory">
      </AdvancedSearch>
    </div>

    <div v-if="$route.query.cart" class="back">
      <span @click="$router.push({ name: 'Cart' })">
        &lt; Back to cart
      </span>
    </div>

    <div id="listings">

      <h2 v-if="buying">Your Search Results</h2>
      <h3 v-if="inventory">Company Inventory</h3>

      <div class="mobile-filter" :class="{ show : showFilter }">
        <h3 v-if="buying">Refine Your Search</h3>
        <h3 v-if="inventory">Filter Inventory</h3>
        <AdvancedSearch :buying="buying"
                        :inventory="inventory">
        </AdvancedSearch>
      </div>

      <div class="filter-toggle">
        <p @click="toggleFilter">
          <span v-if="buying">Filter Results </span>
          <span v-if="inventory">Filter Inventory </span>
          <fa-icon v-if="showFilter" icon="angle-up"></fa-icon>
          <fa-icon v-else icon="angle-down"></fa-icon>
        </p>
      </div>

      <!-- show if listings were found -->
      <div v-if="listings.length > 0" class="listings-div">
        <div v-for="item in listings" :key="item.id" @click="viewDetails(item)" class="item">
          <MaterialPreview :item="item"
                           :inventory="inventory"
                           :buying="buying">
          </MaterialPreview>
        </div>
      </div>

      <!-- show if no listings were found -->
      <div v-else class="results">
        <div v-if="buying" class="results">
          <h3>We're sorry, we couldn't find the material you're looking for. You can try searching again with different settings.</h3>
          <button @click="$router.push('Search')">Back to Search</button>
        </div>
        <div v-if="inventory" class="results">
          <h3>No material found</h3>
          <button @click="$router.push('/dashboard/home')">Back to Dashboard</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import AdvancedSearch from '@/components/search/AdvancedSearch'
import MaterialPreview from '@/components/material/MaterialPreview'

export default {
  props: ['inventory', 'buying', 'listings'],
  components: {
    AdvancedSearch,
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
    },
    viewDetails (item) {
      if (this.inventory) {
        this.$router.push({
          path: 'edit-material',
          query: {
            edit: true,
            id: item._id
          }
        })
      } else if (this.buying) {
        this.$router.push({
          path: '/listing',
          query: {
            buying: true,
            id: item._id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #results {
    @media screen and (min-width: 1000px) {
      display: flex;
    }
    @media screen and (max-width: 999px) {
      display: block;
    }
  }

  #sidebar {
    @media screen and (min-width: 1000px) {
      width: 320px;
      display: block;
      box-shadow: 2px 2px 2px 2px rgba(0,0,0,.1);
      h3 {
        margin-top: 50px;
        text-align: center;
      }
    }
    @media screen and (max-width: 999px) {
      height: 0;
      visibility: hidden;
      opacity: 0;
      transition: 250ms all;
    }
  }

  .mobile-filter {
    @media screen and (min-width: 1000px) {
      display: none;
    }
    @media screen and (max-width: 999px) {
      display: block;
      box-shadow: $box-shadow;
      padding: 5px 0 25px 0;
      height: 0;
      visibility: hidden;
      opacity: 0;
      transition: 250ms all;
    }
  }

  .show {
    height: inherit;
    visibility: visible;
    opacity: 1;
  }

  .back {
    color: royalblue;
    margin-left: 10px;
    span {
      cursor: pointer;
    }
  }

  #listings {
    padding: 10px;
    width: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1;
    h2 {
      margin-left: 10px;
    }
    h3 {
      text-align: center;
      margin-top: 40px;
    }
    select {
      margin-left: 10px;
    }
  }

  .listings-div {
    margin-top: 25px;
    width: 100%;
    max-width: 620px;
  }

  .filter-toggle {
    @media screen and (max-width: 999px) {
      display: flex;
      justify-content: flex-end;
      align-self: flex-end;
      color: royalblue;
      text-decoration: underline;
      p {
        cursor: pointer;
      }
    }
    @media screen and (min-width: 1000px) {
      display: none;
    }
  }

  select {
    border: 1px solid $accent;
  }

  .results {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .item {
    cursor: pointer;
    transition: 250ms all;
  }

  .item:hover {
    transform: scale(1.01);
  }

  .buttons {
    display: flex;
    justify-content: center;
    width: 90%;
    margin: auto;
    margin-top: 50px;
  }
</style>
