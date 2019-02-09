<template>
  <div id="entry">

    <div class="heading-div">

      <!-- Shape and Dimension -->
      <div>
        <h4 class="heading">
          {{ item.shape.toUpperCase() }} {{ item.dimension }}
        </h4>
      </div>

      <!-- Hundred Weight Price -->
      <div class="heading">
        <h4 v-if="item.forSale">${{ item.cwt }} Cwt</h4>
        <h4 v-else>Not For Sale</h4>
      </div>

    </div>

    <div class="heading-div">

      <!-- Length -->
      <div>
        <p>
          <span v-if="item.feet">
            {{ item.feet }}'
          </span>
          <span v-if="item.inches">
            {{ item.inches }}"
          </span>
          <span v-else>
            0"
          </span>
          <span v-if="item.numerator">
            {{ item.numerator }}/{{ item.denominator }}
          </span>
        </p>
      </div>

      <!-- Quantity -->
      <div>
        <p>{{ item.quantity }} available</p>
      </div>

    </div>

    <!-- Specifications -->
    <div class="spec-div">

      <!-- Item Information -->
      <div class="material-info">

        <!-- Grade and Origin -->
        <div>
          <p>{{ item.grade }}</p>
          <div>
            <p v-if="item.domestic">Domestic</p>
            <p v-else>Foreign</p>
          </div>
        </div>

        <!-- Galvanized or Painted -->
        <div>
          <p v-if="item.galvanized">
            <span class="check">&#10004;</span> Galvanized
          </p>
          <p v-if="item.primed">
            <span class="check">&#10004;</span> Primed
          </p>
        </div>

      </div>

      <!-- Location or Company Info (if buying) -->
      <div>

        <div v-if="inventory">
          <p>Location: {{ item.location }}</p>
        </div>

        <div v-if="buying" class="company-info">
          <p class="company-name">
            {{ item.company.name }}
          </p>
          <p v-if="item.company.city && item.company.state">
            {{ item.company.city }}, {{ item.company.state }}
          </p>
          <p v-if="item.company.delivery.offered">
            <span class="check">&#10004;</span> Offers Delivery
          </p>
          <p v-if="item.company.cut.offered">
            <span class="check">&#10004;</span> Offers Cut to Order
          </p>
        </div>

      </div>

    </div>

    <!-- Remarks -->
    <div v-if="item.remarks" class="remarks">
      <p>Remarks: {{ item.remarks }}</p>
    </div>

    <!-- Click Message -->
    <div class="click-message">
      <em v-if="inventory">Click to edit material</em>
      <em v-if="buying">Click for information/to place order</em>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'buying', 'inventory']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #entry {
    padding: 10px;
    max-width: 600px;
    margin: auto;
    border-radius: 2px;
    box-shadow: $box-shadow;
  }

  .heading-div {
    display: flex;
    justify-content: space-between;
  }

  .heading {
    @media screen and (min-width: 500px) {
      font-size: 22px;
    }
  }

  .spec-div {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }

  .material-info {
    max-width: 50%;
  }

  .company-info {
    text-align: right;
  }

  .company-name {
    text-decoration: underline;
  }

  .remarks {
    margin-top: 10px;
    font-size: 12px;
  }

  .click-message {
    margin-top: 10px;
    text-align: center;
    color: $secondary;
    text-decoration: underline;
  }

  h4 {
    font-weight: bold;
    margin: 0;
  }

  p {
    margin: 0;
  }
</style>
