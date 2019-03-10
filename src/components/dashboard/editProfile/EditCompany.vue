<template>
  <div>
    <div class="input">
      Name:
      <input v-model="company.name">
    </div>
    <div v-if="addressInvalid" class="address-text">
      <p>Please enter a valid address before listing steel for sale</p>
    </div>
    <div class="input">
      Street:
      <input v-model="company.street" :class="{ address : addressInvalid }">
    </div>
    <div class="input">
      City:
      <input v-model="company.city" :class="{ address : addressInvalid }">
    </div>
    <div class="input">
      State:
      <select v-model="company.state" :class="{ address : addressInvalid }">
        <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
      </select>
    </div>
    <div class="input">
      Zipcode:
      <input v-model="company.zipcode" :class="{ address : addressInvalid }">
    </div>
    <div class="input">
      Contact Person:
      <input v-model="company.contactName">
    </div>
    <div class="input">
      Contact Phone:
      <input v-model="company.phone">
    </div>
    <div class="input">
      Contact Email:
      <input v-model="company.email">
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
          <p>
            Base Delivery Fee:
            <ToolTip>This delivery fee will be charged to the buyer for every delivery, regardless of distance.</ToolTip>
          </p>
        </div>
        <div>
          <input v-model="company.delivery.fee" type="number">
        </div>
      </div>
      <div class="input">
        <div>
          <p>
            Price per mile:
            <ToolTip>This is how much you charge per mile (one-way) for a delivery.</ToolTip>
          </p>
        </div>
        <div>
          <input v-model="company.delivery.price" type="number"> /mile
        </div>
      </div>
      <div class="input">
        <div>
          <p>
            Max Delivery Distance:
            <ToolTip>This is the maximum distance (one way) you are willing to travel to make a delivery.</ToolTip>
          </p>
        </div>
        <div>
          <input v-model="company.delivery.maxDistance" type="number"> miles
        </div>
      </div>
      <div class="input">
        <div>
          <p>
            Max Delivery Length:
            <ToolTip>The maximum length (in feet) that your delivery truck is capable of hauling.</ToolTip>
          </p>
        </div>
        <div>
          <input v-model="company.delivery.maxLength" type="number"> feet
        </div>
      </div>
      <div class="input">
        <div>
          <p>
            Max Delivery Weight:
            <ToolTip>The maximum weight (in pounds) that your delivery truck is capable of hauling.</ToolTip>
          </p>
        </div>
        <div>
          <input v-model="company.delivery.maxWeight" type="number"> lbs
        </div>
      </div>
    </div>
    <div class="input">
      <div>
        <p>Offer Cut to Order:</p>
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
      </div>
    </div>
    <div>
      <p>Company Description</p>
      <div class="sub">
        <textarea v-model="company.description"></textarea>
      </div>
    </div>
    <div>
      <p>
        Remarks
        <ToolTip>Leave additional remarks for buyers. These can include delivery times, expected turnaround, and instructions for pickups.</ToolTip>
      </p>
      <div class="sub">
        <textarea v-model="company.remarks"></textarea>
      </div>
    </div>
    <div class="button-div">
      <button @click="$emit('close')">Cancel</button>
      <button @click="editCompany">Save</button>
    </div>
  </div>
</template>

<script>
import api from '@/api/api'
import states from '@/assets/data/states.js'
import hours from '@/assets/data/hours.js'
import ToolTip from '@/components/popups/ToolTip'

export default {
  props: ['company', 'addressInvalid', 'newAccount'],
  components: {
    ToolTip
  },
  data () {
    return {
      states: states,
      hours: hours
    }
  },
  methods: {
    editCompany () {
      this.$emit('close')
      api.axios.put(`${api.baseUrl}/users/edit-company`, {
        company: this.company
      })
      .then(() => {
        if (this.$route.path != '/admin/company-edit') {
          this.$store.dispatch('validateAddress')
        }
      })
      .catch(() => {
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
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

  .address {
    outline: thin solid $alert;
  }

  .address-text {
    color: $alert;
  }
</style>
