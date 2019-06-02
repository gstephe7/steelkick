<template>
  <div>
    <div between>
      Name:
      <input big v-model="company.name">
    </div>
    <div v-if="addressInvalid">
      <p class="red">
        Please enter a valid address before listing steel for sale
      </p>
    </div>
    <div between>
      Street:
      <input big v-model="company.street" :highlight="addressInvalid">
    </div>
    <div between>
      City:
      <input big v-model="company.city" :highlight="addressInvalid">
    </div>
    <div between>
      State:
      <select big v-model="company.state" :highlight="addressInvalid">
        <option v-for="state in states" :value="state" :key="state">{{ state }}</option>
      </select>
    </div>
    <div between>
      Zipcode:
      <input big v-model="company.zipcode" :highlight="addressInvalid">
    </div>
    <div between>
      Contact Person:
      <input big v-model="company.contactName">
    </div>
    <div between>
      Contact Phone:
      <input big v-model="company.phone">
    </div>
    <div between>
      Contact Email:
      <input big v-model="company.email">
    </div>
    <div between>
      Offer Delivery:
      <select big v-model="company.delivery.offered">
        <option :value="true">Yes</option>
        <option :value="false">No</option>
      </select>
    </div>

    <br>

    <div sub v-if="company.delivery.offered">
      <div between>
        <div box>
          <input small v-model="company.delivery.fee" type="number" step="0.01">
        </div>
      </div>
      <div between>
        <div box>
          <input small v-model="company.delivery.price" type="number" step="0.01">/mile
        </div>
      </div>
      <div between>
        <div box>
          <input small v-model="company.delivery.maxDistance" type="number" step="0.01">miles
        </div>
      </div>
      <div between>
        <div box>
          <input small v-model="company.delivery.maxLength" type="number" step="0.01">feet
        </div>
      </div>
      <div between>
        <div box>
          <input small v-model="company.delivery.maxWeight" type="number" step="0.01">lbs
        </div>
      </div>
    </div>

    <br>

    <div between>
      <div>
        <p>Offer Cut to Order:</p>
      </div>
      <div>
        <select big v-model="company.cut.offered">
          <option :value="true">Yes</option>
          <option :value="false">No</option>
        </select>
      </div>
    </div>

    <br>

    <div sub v-if="company.cut.offered">
      <div between>
        <div box>
          <p>Price per cut:</p>
        </div>
        <div box>
          <input small v-model="company.cut.price" type="number" step="0.01">(USD)
        </div>
      </div>
    </div>

    <br>

    <div>
      <p>Hours</p>

      <br>

      <div sub>
        <div between>
          <div>
            <p>Monday</p>
          </div>
          <div>
            <span>
              <select hour v-model="company.hours.monday.start">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select> -
              <select hour v-model="company.hours.monday.end">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </span>
          </div>
        </div>
        <div between>
          <div>
            <p>Tuesday</p>
          </div>
          <div>
            <span>
              <select hour v-model="company.hours.tuesday.start">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select> -
              <select hour v-model="company.hours.tuesday.end">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </span>
          </div>
        </div>
        <div between>
          <div>
            <p>Wednesday</p>
          </div>
          <div>
            <span>
              <select hour v-model="company.hours.wednesday.start">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select> -
              <select hour v-model="company.hours.wednesday.end">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </span>
          </div>
        </div>
        <div between>
          <div>
            <p>Thursday</p>
          </div>
          <div>
            <span>
              <select hour v-model="company.hours.thursday.start">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select> -
              <select hour v-model="company.hours.thursday.end">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </span>
          </div>
        </div>
        <div between>
          <div>
            <p>Friday</p>
          </div>
          <div>
            <span>
              <select hour v-model="company.hours.friday.start">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select> -
              <select hour v-model="company.hours.friday.end">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </span>
          </div>
        </div>
        <div between>
          <div>
            <p>Saturday</p>
          </div>
          <div>
            <span>
              <select hour v-model="company.hours.saturday.start">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select> -
              <select hour v-model="company.hours.saturday.end">
                <option :value="null">-</option>
                <option v-for="hour in hours" :key="hour" :value="hour">{{ hour }}</option>
              </select>
            </span>
          </div>
        </div>
      </div>
    </div>

    <br>

    <div>
      <p>Company Description</p>
      <br>
      <div sub>
        <textarea v-model="company.description"></textarea>
      </div>
    </div>

    <br>

    <div>
      <div sub>
        <textarea v-model="company.remarks"></textarea>
      </div>
    </div>

    <br>

    <div around>
      <button @click="$emit('close')">Cancel</button>
      <button @click="editCompany">Save</button>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import states from '@/assets/data/states.js'
import hours from '@/assets/data/hours.js'

export default {
  props: ['company', 'addressInvalid', 'newAccount'],
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

  [box] {
    flex-basis: 50%;
  }

  input[small] {
    width: 50px;
  }

  select[small] {
    width: 50px;
  }

  select[hour] {
    width: 80px;
    margin: 5px 0;
  }

  p {
    margin: 0;
  }

  textarea {
    width: 90%;
    height: 150px;
  }
</style>
