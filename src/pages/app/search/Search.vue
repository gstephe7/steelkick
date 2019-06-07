<template>
  <form @submit.prevent="search">

    <!-- If used in the quick search -->
    <div center wrap v-if="quick">
      <div row>
        <InputSelect v-model="shape" auto>
          <template #label>Shape</template>
          <template #options>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape }}
            </option>
          </template>
        </InputSelect>
        <InputSelect v-model="dimension" auto>
          <template #label>Dimension</template>
          <template #options>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">
              {{ dimension }}
            </option>
          </template>
        </InputSelect>
      </div>
      <div row>
        <InputLength v-model="length" auto></InputLength>
        <InputSelect v-model="state" auto>
          <template #label>State</template>
          <template #options>
            <option v-for="state in states" :value="state" :key="state">
              {{ state }}
            </option>
          </template>
        </InputSelect>
      </div>
    </div>

    <!-- If used in the advanced search or inventory search -->
    <div center wrap v-else>

      <div fieldset>
        <div row>
          <select v-model="shape" class="autotab">
            <option disabled selected :value="null">
              Shape
            </option>
            <option v-for="shape in shapes" :value="shape" :key="shape">
              {{ shape }}
            </option>
          </select>
          <select v-model="dimension" class="autotab">
            <option disabled selected :value="null">Dimension</option>
            <option v-for="dimension in dimensions" :value="dimension" :key="dimension">{{ dimension }}</option>
          </select>
        </div>
        <div row>
          <span length>
            <legend>
              <input length class="autotab" type="number" placeholder="11" maxlength="2" v-model="feet">'
            </legend>
            <legend>
              <input length class="autotab" type="number" placeholder="9" maxlength="2" v-model="inches">"
            </legend>
            <legend>
              <input length class="autotab" type="number" maxlength="2" v-model="numerator"> /
              <input length denominator class="autotab" type="number" maxlength="2" v-model="denominator">
            </legend>
          </span>
          <select v-model="domestic" class="autotab">
            <option disabled selected :value="null">Steel Origin</option>
            <option :value="true">Domestic Only</option>
            <option :value="false">Any</option>
          </select>
        </div>
        <div row>
          <select v-model="primed" class="autotab">
            <option :value="null">Primed?</option>
            <option :value="false">Not Primed</option>
            <option :value="true">Primed</option>
          </select>
          <select v-model="galvanized" class="autotab">
            <option :value="null">Galvanized?</option>
            <option :value="false">Not Galvanized</option>
            <option :value="true">Galvanized</option>
          </select>
        </div>
      </div>

      <div fieldset v-if="!inventory">
        <div row>
          <select v-model="state" class="autotab" @change="pushCompanies">
            <option :value="null" selected disabled>State</option>
            <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
          </select>
          <select v-if="companiesLoading">
            <option disabled selected>Loading...</option>
          </select>
          <select v-else v-model="company" class="autotab">
            <option :value="null" selected disabled>Company</option>
            <option v-for="company in companies" :value="company._id" :key="company._id">{{ company.name }}</option>
          </select>
        </div>
        <div row>
          <select v-model="cut" class="autotab">
            <option disabled selected :value="null">Cut to Length?</option>
            <option :value="true">Offers Cut to Length</option>
            <option :value="false">Doesn't matter</option>
          </select>
          <select v-model="delivery" class="autotab">
            <option disabled selected :value="null">Delivery?</option>
            <option :value="true">Offers Delivery</option>
            <option :value="false">Doesn't matter</option>
          </select>
        </div>
      </div>

    </div>

    <div col center>
      <Button>
        <span v-if="searching">Search</span>
        <span v-if="buying">Update Search</span>
        <span v-if="inventory">Filter</span>
      </Button>
      <router-link v-if="quick" :to="{ name: 'Search'}">
        Advanced Search
      </router-link>
    </div>

  </form>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'
import states from '@/assets/data/states.js'

export default {
  props: ['inventory', 'buying', 'searching', 'quick'],
  data () {
    return {
      shape: null,
      dimension: null,
      length: null,
      domestic: null,
      primed: null,
      galvanized: null,
      cut: null,
      delivery: null,
      state: null,
      company: null,
      states: states,
      companies: [],
      companiesLoading: false
    }
  },
  computed: {
    shapes () {
      let allShapes = []
      material.forEach(item => {
        allShapes.push(item.shape)
      })
      return allShapes
    },
    dimensions () {
      let newDimensions = []
      material.forEach(item => {
        if (item.shape == this.shape) {
          item.dimensions.forEach(value => {
            newDimensions.push(value.dimension)
          })
        }
      })
      return newDimensions
    }
  },
  methods: {
    pushCompanies () {
      this.companiesLoading = true
      api.axios.get(`${api.baseUrl}/users/state-companies`, {
        params: {
          state: this.state
        }
      })
      .then(res => {
        this.companiesLoading = false
        this.companies = res.data.companies
      })
      .catch(() => {
        this.companiesLoading = false
      })
    },
    search () {
      let buying = () => {
        if (!this.inventory) return true
        else return false
      }

      // push search query when updating search
      if (this.$route.name === 'Listings') {
        this.$router.push({
          query: {
            update: true,
            forSale: buying(),
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
            domestic: this.domestic,
            primed: this.primed,
            galvanized: this.galvanized,
            radius: this.radius,
            zipcode: this.zipcode,
            cut: this.cut,
            delivery: this.delivery,
            state: this.state,
            company: this.company
          }
        })
        location.reload(true)
      }

      // push search query when filtering through inventory
      else if (this.$route.name === 'Inventory') {
        this.$router.push({
          query: {
            update: true,
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
            domestic: this.domestic,
            primed: this.primed,
            galvanized: this.galvanized
          }
        })
        location.reload(true)
      }

      // Push search query when searching for steel
      else {
        this.$router.push({
          name: 'Listings',
          query: {
            update: true,
            forSale: buying(),
            shape: this.shape,
            dimension: this.dimension,
            feet: this.feet,
            inches: this.inches,
            numerator: this.numerator,
            denominator: this.denominator,
            domestic: this.domestic,
            primed: this.primed,
            galvanized: this.galvanized,
            radius: this.radius,
            zipcode: this.zipcode,
            cut: this.cut,
            delivery: this.delivery,
            state: this.state,
            company: this.company
          }
        })
      }
    }
  },
  created () {
    // fills in the search form to reflect the current search
    if (this.$route.query.update) {

      this.shape = this.$route.query.shape
      this.dimension = this.$route.query.dimension
      this.feet = this.$route.query.feet
      this.inches = this.$route.query.inches
      this.numerator = this.$route.query.numerator
      this.denominator = this.$route.query.denominator
      this.domestic = this.$route.query.domestic
      this.primed = this.$route.query.primed
      this.galvanized = this.$route.query.galvanized
      this.radius = this.$route.query.radius
      this.zipcode = this.$route.query.zipcode
      this.cut = this.$route.query.cut
      this.delivery = this.$route.query.delivery
      this.state = this.$route.query.state
      this.company = this.$route.query.company
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  form {
    width: 100%;
  }

  a {
    color: $accent;
  }
</style>
