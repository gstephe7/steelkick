<template>
  <div>
    <p>Name: {{ company.name }}</p>
    <p>Street: {{ company.street }}</p>
    <p>City: {{ company.city }}</p>
    <p>State: {{ company.state }}</p>
    <p>Zipcode: {{ company.zipcode }}</p>
    <p>Contact Person: {{ company.contactName }}</p>
    <p>Contact Phone: {{ company.phone }}</p>
    <p>Contact Email: {{ company.email }}</p>
    <p>
      Delivery Offered:
      <span v-if="company.delivery.offered">Yes</span>
      <span v-else>No</span>
    </p>
    <div sub col start v-if="company.delivery.offered">
      <span>
        Base Delivery Fee: ${{ company.delivery.fee }}
      </span>
      <span>
        Price per mile: ${{ company.delivery.price }}
      </span>
      <span>
        Max Delivery Distance: {{ company.delivery.maxDistance }} miles
      </span>
      <span>
        Max Delivery Length: {{ company.delivery.maxLength }}'
      </span>
      <span>
        Max Delivery Weight: {{ company.delivery.maxWeight }} lbs
      </span>
    </div>
    <p>
      Cut to Order Offered:
      <span v-if="company.cut.offered">Yes</span>
      <span v-else>No</span>
    </p>
    <div sub v-if="company.cut.offered">
      <p>
        Price per cut: ${{ company.cut.price }}
      </p>
    </div>
    <div>
      <p>Hours</p>
      <dl sub>

        <div row>
          <dt>
            Monday
          </dt>
          <dd>
            {{ company.hours.monday.start }} - {{ company.hours.monday.end }}
          </dd>
        </div>

        <div row>
          <dt>
            Tuesday
          </dt>
          <dd>
            {{ company.hours.tuesday.start }} - {{ company.hours.tuesday.end }}
          </dd>
        </div>

        <div row>
          <dt>
            Wednesday
          </dt>
          <dd>
            {{ company.hours.wednesday.start }} - {{ company.hours.wednesday.end }}
          </dd>
        </div>

        <div row>
          <dt>
            Thursday
          </dt>
          <dd>
            {{ company.hours.thursday.start }} - {{ company.hours.thursday.end }}
          </dd>
        </div>

        <div row>
          <dt>
            Friday
          </dt>
          <dd>
            {{ company.hours.friday.start }} - {{ company.hours.friday.end }}
          </dd>
        </div>

        <div row>
          <dt>
            Saturday
          </dt>
          <dd>
            {{ company.hours.saturday.start }} - {{ company.hours.saturday.end }}
          </dd>
        </div>

      </dl>
    </div>
    <div>
      <p>Company Description</p>
      <div sub>
        <p>{{ company.description }}</p>
      </div>
    </div>
    <div>
      <p>Remarks</p>
      <div sub>
        <p>{{ company.remarks }}</p>
      </div>
    </div>
    <div center>
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

  dt {
    width: 100px;
  }

  dd {
    width: 150px;
  }
</style>
