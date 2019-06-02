<template>
  <div main v-if="company">

    <span back @click="$router.back()">
      &lt; Back
    </span>

    <!-- Basic Company Information -->
    <div>
      <h2>{{ company.name }}</h2>
      <address v-if="company.city">
        {{ company.street }} <br>
        {{ company.city }}, {{ company.state }} {{ company.zipcode }}
      </address>
      <p col start>
        <span>
          Phone: <a :href="`tel:${company.phone}`">{{ company.phone }}</a>
        </span>
        <span>
          Email: <a :href="`mailto:${company.email}`">{{ company.email }}</a>
        </span>
        <span>
          Contact Name: {{ company.contactName }}
        </span>
      </p>
    </div>

    <hr>

    <!-- Commpany Details -->
    <div>

      <!-- Company description -->
      <div>
        <p>{{ company.description }}</p>
      </div>

      <div between wrap>

        <!-- Hours -->
        <div box>
          <h3>Office Hours</h3>
          <div sub>
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
        <div box>
          <h3>Remarks</h3>
          <div sub>
            <p>{{ company.remarks }}</p>
          </div>
        </div>

      </div>

      <!-- Delivery and Cutting -->
      <div between wrap>

        <!-- Delivery -->
        <div box v-if="company.delivery">
          <h3>Delivery Services</h3>
          <div sub>
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
        <div box v-if="company.cut">
          <h3>Cutting Services</h3>
          <div sub>
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

        </div>
      </div>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
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
  }
}
</script>

<style lang="scss" scoped>

  [main] {
    max-width: 700px;
  }

  h2 {
    text-decoration: underline;
    margin-bottom: 0;
  }
</style>
