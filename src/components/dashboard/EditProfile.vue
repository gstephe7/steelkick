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
          <button @click="editProfile">Cancel</button>
          <button @click="editProfile">Save</button>
        </div>
      </div>

      <div v-else>
        <p>First Name: {{ profile.firstName }}</p>
        <p>Last Name: {{ profile.lastName }}</p>
        <p>Email: {{ profile.email }}</p>
        <p>Password: *******</p>
        <div class="button-div">
          <button @click="editProfile">Edit Profile</button>
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
            <div v-for="day in company.hours" :key="day.day" class="input">
              <div class="day">
                <p>{{ day.day }}</p>
              </div>
              <div class="hours">
                <span>
                  <select v-model="day.start">
                    <option :value="null">-</option>
                    <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
                  </select> -
                  <select v-model="day.end">
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
          <button @click="editCompany">Cancel</button>
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
        <div class="sub">
          <p>
            Price per cut: ${{ company.cut.price }}
          </p>
        </div>
        <div>
          <p>Hours</p>
          <div class="sub">
            <div v-for="day in company.hours" :key="day.day" class="input">
              <div>
                <p>{{ day.day }}</p>
              </div>
              <div>
                <p>{{ day.start }} - {{ day.end }}</p>
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
          <button @click="editCompany">Edit Company</button>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import states from '@/assets/data/states.js'
import hours from '@/assets/data/hours.js'

export default {
  data () {
    return {
      profile: {
        firstName: 'Greg',
        lastName: 'Stephens',
        email: 'gstephe7@gmail.com',
        password: 'Tonyhawk21!',
        editing: false
      },
      company: {
        name: 'Benco Welding Inc.',
        street: '1162 Winder Industrial Pkwy',
        city: 'Winder',
        state: 'GA',
        zipcode: '30656',
        contactName: 'Butch Davis',
        contactPhone: '678-233-7110',
        contactEmail: 'butch@bencowelding.com',
        editing: false,
        delivery: {
          offered: true,
          price: 2.25,
          maxDistance: 50,
          maxLength: 22,
          maxWeight: 3000
        },
        cut: {
          offered: true,
          price: 5
        },
        hours: [
          {
            day: 'Monday',
            start: '6:00am',
            end: '4:30pm'
          },
          {
            day: 'Tuesday',
            start: '6:00am',
            end: '4:30pm'
          },
          {
            day: 'Wednesday',
            start: '6:00am',
            end: '4:30pm'
          },
          {
            day: 'Thursday',
            start: '6:00am',
            end: '4:30pm'
          },
          {
            day: 'Friday',
            start: '',
            end: ''
          },
          {
            day: 'Saturday',
            start: '',
            end: ''
          },
          {
            day: 'Sunday',
            start: '',
            end: ''
          }
        ],
        remarks: 'Pickups and delivery between 7:00am and 2:30pm Monday-Thursday. Pickups must report to the office or ask to see Butch before picking up material.'
      },
      states: states,
      hours: hours
    }
  },
  methods: {
    editProfile () {
      this.profile.editing = !this.profile.editing
    },
    editCompany () {
      this.company.editing = !this.company.editing
    }
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
