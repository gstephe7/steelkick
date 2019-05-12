<template>
  <div row>

    <aside id="desktop">
      <div v-if="buying">
        <h3>Refine Your Search</h3>
        <Search :buying="buying"
        :inventory="filter">
      </Search>
      </div>
      <div v-if="inventory">
        <h3 v-if="inventory">Filter Inventory</h3>
        <FilterMaterial :filter="filter"
                        @reset="filter = {}"
                        @autoScroll="autoScroll">
        </FilterMaterial>
      </div>
    </aside>

    <div main basis>

      <div col v-if="inventory">
        <button green @click="$router.push('/add-material')">+ Add New Material</button>
      </div>

      <br>

      <div id="mobile">
        <div card class="mobile-filter" :class="{ show : showFilter }">
          <div v-if="buying">
            <h3>Refine Your Search</h3>
            <Search :buying="buying"
            :inventory="filter">
          </Search>
          </div>
          <div v-if="inventory">
            <h3 v-if="inventory" id="filter">Filter Inventory</h3>
            <FilterMaterial :filter="filter"
                            @reset="filter = {}"
                            @autoScroll="autoScroll">
            </FilterMaterial>
          </div>
        </div>
        <p @click="toggleFilter">
          <span v-if="buying">Filter Results </span>
          <span v-if="inventory">Filter Inventory </span>
          <icon v-if="showFilter" icon="angle-up"></icon>
          <icon v-else icon="angle-down"></icon>
        </p>
      </div>

      <div>
        <!-- show if listings were found -->
        <div v-if="listings.length > 0">
          <MaterialPreview v-for="item in filtered"
                           :key="item._id"
                           :item="item"
                           :inventory="inventory"
                           :buying="buying">
          </MaterialPreview>
        </div>

        <!-- show if no listings were found -->
        <div v-else>
          <div col v-if="buying">
            <h3>We're sorry, we couldn't find the material you're looking for. You can try searching again with different settings.</h3>
            <button @click="$router.push('Search')">Back to Search</button>
          </div>
          <div col v-if="inventory">
            <h3>No material found</h3>
            <button @click="$router.push({name: 'Dashboard'})">Back to Dashboard</button>
          </div>
        </div>
      </div>


    </div>

  </div>
</template>

<script>
import Search from '@/components/app/search/Search'
import FilterMaterial from '@/components/app/inventory/FilterMaterial'
import MaterialPreview from '@/components/app/material/MaterialPreview'

export default {
  props: ['inventory', 'buying', 'listings'],
  components: {
    Search,
    FilterMaterial,
    MaterialPreview
  },
  data () {
    return {
      filter: {},
      perPage: 25,
      showFilter: false
    }
  },
  computed: {
    filtered () {
      return this.listings.filter(this.filterItems)
    }
  },
  methods: {
    filterItems (item) {
      let _ = this.filter
      if (_.shape && _.shape != item.shape) {
        return false
      }
      if (_.dimension && _.dimension != item.dimension) {
        return false
      }
      if (_.length && _.length > item.length) {
        return false
      }
      if (_.domestic && _.domestic != item.domestic) {
        return false
      }
      if (_.primed && _.primed != item.primed) {
        return false
      }
      if (_.galvanized && _.galvanized != item.galvanized) {
        return false
      }
      return true
    },
    toggleFilter () {
      this.showFilter = !this.showFilter
    },
    autoScroll () {
      let filter = document.getElementById('filter')
      filter.scrollIntoView()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #mobile {
    @media screen and (max-width: 1199px) {
      display: block;
      text-align: center;
      p {
        cursor: pointer;
        text-align: right;
        color: royalblue;
      }
    }
    @media screen and (min-width: 1200px) {
      display: none;
    }
  }

  #desktop {
    text-align: center;
    box-shadow: $box-shadow;
    padding-top: 120px;
    @media screen and (max-width: 1199px) {
      display: none;
    }
    @media screen and (min-width: 1200px) {
      display: block;
    }
  }

  [main] {
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
