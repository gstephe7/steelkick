<template>
  <div id="edit-profile">

    <div class="container">

      <h3>Edit Profile</h3>

      <hr>

      <div v-if="profile.editing">
        <div class="input">
          First Name:
          <input v-model="profile.firstName">
        </div>
        <div class="input">
          Last Name:
          <input v-model="profile.lastName">
        </div>
        <div class="input">
          Email:
          <input v-model="profile.email">
        </div>
        <div class="input">
          Password:
          <input v-model="profile.password" type="password">
        </div>
        <div class="button-div">
          <button @click="profile.editing = false">Cancel</button>
          <button @click="editProfile">Save</button>
        </div>
      </div>

      <div v-else>
        <p>First Name: {{ profile.firstName }}</p>
        <p>Last Name: {{ profile.lastName }}</p>
        <p>Email: {{ profile.email }}</p>
        <p>Password: *******</p>
        <div class="button-div">
          <button @click="profile.editing = true">Edit Profile</button>
        </div>
      </div>

    </div>

    <div class="container">

      <h3>Edit Company</h3>

      <hr>

      <div v-if="company.editing">
        <div class="input">
          Name:
          <input v-model="company.name">
        </div>
        <div class="input">
          Street:
          <input v-model="company.street">
        </div>
        <div class="input">
          City:
          <input v-model="company.city">
        </div>
        <div class="input">
          State:
          <select v-model="company.state">
            <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
          </select>
        </div>
        <div class="input">
          Zipcode:
          <input v-model="company.zipcode">
        </div>
        <div class="input">
          Contact Person:
          <input v-model="company.contactName">
        </div>
        <div class="input">
          Contact Phone:
          <input v-model="company.contactPhone">
        </div>
        <div class="input">
          Contact Email:
          <input v-model="company.contactEmail">
        </div>
        <div class="input">
          Offer Delivery:
          <select v-model="company.delivery.offered">
            <option :value="true">Yes</option>
            <option :value="false">No</option>
          </select>
        </div>
        <div v-if="company.delivery.offered" class="sub">
          <div class="input">
            <div>
              <p>Price per mile:</p>
            </div>
            <div>
              <input v-model="company.delivery.price" type="number"> /mile
            </div>
          </div>
          <div class="input">
            <div>
              <p>Max Delivery Distance:</p>
            </div>
            <div>
              <input v-model="company.delivery.maxDistance" type="number"> miles
            </div>
          </div>
          <div class="input">
            <div>
              <p>Max Delivery Length:</p>
            </div>
            <div>
              <input v-model="company.delivery.maxLength" type="number"> feet
            </div>
          </div>
          <div class="input">
            <div>
              <p>Max Delivery Weight:</p>
            </div>
            <div>
              <input v-model="company.delivery.maxWeight" type="number"> lbs
            </div>
          </div>
        </div>
        <div class="input">
          <div>
            <p>Offer Cut to order:</p>
          </div>
          <div>
            <select v-model="company.cut.offered">
              <option :value="true">Yes</option>
              <option :value="false">No</option>
            </select>
          </div>
        </div>
        <div v-if="company.cut.offered" class="sub">
          <div class="input">
            <div>
              <p>Price per cut:</p>
            </div>
            <div>
              <input v-model="company.cut.price" type="number"> (USD)
            </div>
          </div>
        </div>
        <div>
          <p>Hours</p>
          <div class="sub">
            <div class="input">
              <div class="day">
                <p>Monday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.monday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.monday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="input">
              <div class="day">
                <p>Tuesday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.tuesday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.tuesday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="input">
              <div class="day">
                <p>Wednesday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.wednesday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.wednesday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="input">
              <div class="day">
                <p>Thursday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.thursday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.thursday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="input">
              <div class="day">
                <p>Friday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.friday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.friday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="input">
              <div class="day">
                <p>Saturday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.saturday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.saturday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
            <div class="input">
              <div class="day">
                <p>Sunday</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="company.hours.sunday.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="company.hours.sunday.end">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Remarks</p>
          <div class="sub">
            <textarea v-model="company.remarks"></textarea>
          </div>
        </div>
        <div class="button-div">
          <button @click="company.editing = false">Cancel</button>
          <button @click="editCompany">Save</button>
        </div>
      </div>

      <div v-else>
        <p>Name: {{ company.name }}</p>
        <p>Street: {{ company.street }}</p>
        <p>City: {{ company.city }}</p>
        <p>State: {{ company.state }}</p>
        <p>Zipcode: {{ company.zipcode }}</p>
        <p>Contact Person: {{ company.contactName }}</p>
        <p>Contact Phone: {{ company.contactPhone }}</p>
        <p>Contact Email: {{ company.contactEmail }}</p>
        <p>
          Delivery Offered:
          <span v-if="company.delivery.offered">Yes</span>
          <span v-else>No</span>
        </p>
        <div class="sub" v-if="company.delivery.offered">
          <p>
            Price per mile: ${{ company.delivery.price }}
          </p>
          <p>
            Max Delivery Distance: {{ company.delivery.maxDistance }} miles
          </p>
          <p>
            Max Delivery Length: {{ company.delivery.maxLength }}'
          </p>
          <p>
            Max Delivery Weight: {{ company.delivery.maxWeight }} lbs
          </p>
        </div>
        <p>
          Cut to order offered:
          <span v-if="company.cut.offered">Yes</span>
          <span v-else>No</span>
        </p>
        <div class="sub" v-if="company.cut.offered">
          <p>
            Price per cut: ${{ company.cut.price }}
          </p>
        </div>
        <div>
          <p>Hours</p>
          <div class="sub">
            <div class="input">
              <div>
                <p>Monday</p>
              </div>
              <div>
                <p>{{ company.hours.monday.start }} - {{ company.hours.monday.end }}</p>
              </div>
            </div>
            <div class="input">
              <div>
                <p>Tuesday</p>
              </div>
              <div>
                <p>{{ company.hours.tuesday.start }} - {{ company.hours.tuesday.end }}</p>
              </div>
            </div>
            <div class="input">
              <div>
                <p>Wednesday</p>
              </div>
              <div>
                <p>{{ company.hours.wednesday.start }} - {{ company.hours.wednesday.end }}</p>
              </div>
            </div>
            <div class="input">
              <div>
                <p>Thursday</p>
              </div>
              <div>
                <p>{{ company.hours.thursday.start }} - {{ company.hours.thursday.end }}</p>
              </div>
            </div>
            <div class="input">
              <div>
                <p>Friday</p>
              </div>
              <div>
                <p>{{ company.hours.friday.start }} - {{ company.hours.friday.end }}</p>
              </div>
            </div>
            <div class="input">
              <div>
                <p>Saturday</p>
              </div>
              <div>
                <p>{{ company.hours.saturday.start }} - {{ company.hours.saturday.end }}</p>
              </div>
            </div>
            <div class="input">
              <div>
                <p>Sunday</p>
              </div>
              <div>
                <p>{{ company.hours.sunday.start }} - {{ company.hours.sunday.end }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <p>Remarks</p>
          <div class="sub">
            <p>{{ company.remarks }}</p>
          </div>
        </div>
        <div class="button-div">
          <button @click="company.editing = true">Edit Company</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import states from '@/assets/data/states.js'
import hours from '@/assets/data/hours.js'
import api from '@/api/api'

export default {
  data () {
    return {
      profile: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        editing: false
      },
      company: {
        name: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        editing: false,
        delivery: {
          offered: null,
          price: null,
          maxDistance: null,
          maxLength: null,
          maxWeight: null
        },
        cut: {
          offered: null,
          price: null
        },
        hours: {
          monday: {
            start: '',
            end: ''
          },
          tuesday: {
            start: '',
            end: ''
          },
          wednesday: {
            start: '',
            end: ''
          },
          thursday: {
            start: '',
            end: ''
          },
          friday: {
            start: '',
            end: ''
          },
          saturday: {
            start: '',
            end: ''
          },
          sunday: {
            start: '',
            end: ''
          }
        },
        remarks: ''
      },
      states: states,
      hours: hours
    }
  },
  methods: {
    editProfile () {
      this.profile.editing = !this.profile.editing

      api.axios.put(`${api.baseUrl}/users/edit-user`, {
        email: this.profile.email,
        firstName: this.profile.firstName,
        lastName: this.profile.lastName,
        password: this.profile.password
      })
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })

    },
    editCompany () {
      this.company.editing = !this.company.editing

      api.axios.put(`${api.baseUrl}/users/edit-company`, {
        name: this.company.name,
        street: this.company.street,
        city: this.company.city,
        state: this.company.state,
        zipcode: this.company.zipcode,
        contactName: this.company.contactName,
        phone: this.company.contactPhone,
        email: this.company.contactEmail,
        delivery: this.company.delivery,
        cut: this.company.cut,
        hours: this.company.hours,
        remarks: this.company.remarks
      })
      .then((res) => {
        console.log(res)
        //location.reload()
      })
      .catch(err => {
        console.log(err)
      })

    }
  },
  created () {

    this.$store.dispatch('loading')
    // retrieve user profile
    api.axios.get(`${api.baseUrl}/users/user`, {
      params: {
        email: this.$store.getters.userEmail
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.profile.email = res.data.user.email
      this.profile.firstName = res.data.user.firstName
      this.profile.lastName = res.data.user.lastName
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })

    // retrieve company profile
    api.axios.get(`${api.baseUrl}/users/company`, {
      params: {
        name: this.$store.getters.companyName
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      const co = res.data.company
      this.company.name = co.name
      this.company.street = co.street
      this.company.city = co.city
      this.company.state = co.state
      this.company.zipcode = co.zipcode
      this.company.contactName = co.contactName
      this.company.contactPhone = co.phone
      this.company.contactEmail = co.email
      this.company.remarks = co.remarks
      if (co.delivery) {
        this.company.delivery = co.delivery
      }
      if (co.cut) {
        this.company.cut = co.cut
      }
      if (co.hours) {
        this.company.hours = co.hours
      }
    })
    .catch(err => {
      this.$store.dispatch('complete')
    })

  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #edit-profile {
    max-width: 600px;
    margin: auto;
    padding: 10px;
  }

  .container {
    margin-bottom: 50px;
  }

  .button-div {
    display: flex;
    justify-content: space-around;
  }

  .input {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  input {
    border: 1px solid $accent;
    width: 175px;
  }

  select {
    border: 1px solid $accent;
    width: 197px;
  }

  .sub {
    margin: 25px 0 25px 10%;
    input {
      width: 60px;
    }
    select {
      width: 80px;
    }
    textarea {
      width: 90%;
      height: 150px;
    }
    div {
      flex: 1;
    }
    p {
      margin: 0;
    }
    .hours {
      min-width: 180px;
    }
  }
</style>
