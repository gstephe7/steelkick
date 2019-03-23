<template>
  <div card click @click="viewDetails">

    <div between>

      <!-- Shape and Dimension -->
      <h4>
        {{ item.shape.toUpperCase() }} {{ item.dimension }}
      </h4>

      <!-- Hundred Weight Price -->
      <h4 v-if="item.forSale">${{ item.cwt }} Cwt</h4>
      <h4 v-else>Not For Sale</h4>

    </div>

    <div between>

      <!-- Length -->
      <span>
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
      </span>

      <!-- Quantity -->
      <span>
        {{ item.quantity }} available
      </span>

    </div>

    <br>

    <!-- Specifications -->
    <div between>

      <!-- Item Information -->
      <div col start>

        <!-- Grade and Origin -->
        <div>
          <span>
            {{ item.grade }}
          </span>
          <div>
            <span v-if="item.domestic">Domestic</span>
            <span v-else>Foreign</span>
          </div>
        </div>

        <!-- Galvanized or Painted -->
        <div>
          <div v-if="item.galvanized">
            <span class="check">&#10004;</span> Galvanized
          </div>
          <div v-if="item.primed">
            <span class="check">&#10004;</span> Primed
          </div>
        </div>

      </div>

      <!-- Location or Company Info (if buying) -->
      <div col end>

        <div v-if="inventory">
          <span>Location: {{ item.location }}</span>
        </div>

        <div v-if="buying">
          <strong>
            {{ item.company.name }}
          </strong>
          <address v-if="item.company.city && item.company.state">
            {{ item.company.city }}, {{ item.company.state }}
          </address>
          <div v-if="item.company.delivery.offered">
            <span class="check">&#10004;</span> Offers Delivery
          </div>
          <div v-if="item.company.cut.offered">
            <span class="check">&#10004;</span> Offers Cut to Order
          </div>
        </div>

      </div>

    </div>

    <!-- Remarks -->
    <div col start v-if="item.remarks">
      <br>
      <small>
        Remarks: {{ item.remarks }}
      </small>
    </div>

    <br>

    <!-- Click Message -->
    <div col>
      <em v-if="inventory">Click to edit material</em>
      <em v-if="buying">Click for information/to place order</em>
    </div>

  </div>
</template>

<script>
export default {
  props: ['item', 'buying', 'inventory'],
  methods: {
    viewDetails () {
      if (this.inventory) {
        this.$router.push({
          path: 'edit-material',
          query: {
            edit: true,
            id: this.item._id
          }
        })
      } else if (this.buying) {
        this.$router.push({
          path: '/listing',
          query: {
            buying: true,
            id: this.item._id
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';

  h4 {
    @media screen and (min-width: 500px) {
      font-size: 22px;
    }
  }

  p {
    margin: 0;
  }
</style>
