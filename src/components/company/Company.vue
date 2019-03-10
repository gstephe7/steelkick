<template>
  <div>

    <div v-if="company" id="company">

      <span class="back" @click="$router.back()">
        &lt; Back
      </span>

      <!-- Basic Company Information -->
      <div class="header">
        <h2>{{ company.name }}</h2>
        <p v-if="company.city">
          {{ company.street }} <br>
          {{ company.city }}, {{ company.state }} {{ company.zipcode }}
        </p>
        <p>
          Phone: <a :href="`tel:${company.phone}`">{{ company.phone }}</a> <br>
          Email: <a :href="`mailto:${company.email}`">{{ company.email }}</a> <br>
          Contact Name: {{ company.contactName }}
        </p>
      </div>

      <hr>

      <!-- Commpany Details -->
      <div>

        <!-- Company description -->
        <div class="conatiner">
          <div class="box">
            <p>{{ company.description }}</p>
          </div>
        </div>

        <div class="container">

          <!-- Hours -->
          <div class="box">
            <h3>Office Hours</h3>
            <div class="sub">
              <div v-if="company.hours">
                <p>
                  Monday {{ company.hours.monday.start }} - {{ company.hours.monday.end }} <br>
                  Tuesday {{ company.hours.tuesday.start }} - {{ company.hours.tuesday.end }} <br>
                  Wednesday {{ company.hours.wednesday.start }} - {{ company.hours.wednesday.end }} <br>
                  Thursday {{ company.hours.thursday.start }} - {{ company.hours.thursday.end }} <br>
                  Friday {{ company.hours.friday.start }} - {{ company.hours.friday.end }} <br>
                  Saturday {{ company.hours.saturday.start }} - {{ company.hours.saturday.end }} <br>
                </p>
              </div>
            </div>
          </div>

          <!-- Remarks -->
          <div class="box">
            <h3>Remarks</h3>
            <div class="sub">
              <p>{{ company.remarks }}</p>
            </div>
          </div>

        </div>

        <!-- Delivery and Cutting -->
        <div class="container">

          <!-- Delivery -->
          <div class="box" v-if="company.delivery">
            <h3>Delivery Services</h3>
            <div class="sub">
              <p v-if="company.delivery.offered">
                Base Delivery Fee: ${{ company.delivery.fee }} <br>
                Price per mile: ${{ company.delivery.price }} <br>
                Max Delivery Distance: {{ company.delivery.maxDistance }} miles <br>
                Max Delivery Length: {{ company.delivery.maxLength }}' <br>
                Max Delivery Weigth: {{ company.delivery.maxWeight }} lbs
              </p>
              <p v-else>Does not offer delivery</p>
            </div>
          </div>

          <!-- Cutting -->
          <div class="box" v-if="company.cut">
            <h3>Cutting Services</h3>
            <div class="sub">
              <p v-if="company.cut.offered">
                Price per cut: ${{ company.cut.price }}
              </p>
              <p v-else>Does not offer cutting services</p>
            </div>
          </div>

        </div>

        <hr>

        <!-- Material -->
        <div>
          <h3>Listings</h3>
          <div v-for="item in listings" @click="viewDetails(item)">
            <MaterialPreview :item="item"
                             :buying="true"
                             class="item">
            </MaterialPreview>
          </div>
        </div>

      </div>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import MaterialPreview from '@/components/material/MaterialPreview'

export default {
  components: {
    MaterialPreview
  },
  data () {
    return {
      company: {},
      listings: []
    }
  },
  created () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/users/company`, {
      params: {
        id: this.$route.query.id
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.company = res.data.company
    })
    .catch(() => {
      this.$store.dispatch('complete')
      this.$router.back()
    })

    api.axios.get(`${api.baseUrl}/material/search-material`, {
      params: {
        company: this.$route.query.id,
        forSale: true
      }
    })
    .then(res => {
      this.listings = res.data.material
    })
    .catch(() => {
    })
  },
  methods: {
    viewDetails (item) {
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
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #company {
    padding: 10px;
    max-width: 800px;
    margin: auto;
  }

  .back {
    cursor: pointer;
    color: royalblue;
  }

  h2 {
    font-style: italic;
    text-decoration: underline;
    margin-bottom: 0;

  }

  p {
    margin-top: 5px;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
  }

  .box {
    min-width: 300px;
    flex: 1;
  }

  .sub {
    margin-left: 10%;
  }

  .item {
    cursor: pointer;
  }
</style>
