<template>
  <div>
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
      <button @click="$emit('editing')">Edit Company</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['company']
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

  .sub {
    margin: 25px 0 25px 10%;
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
