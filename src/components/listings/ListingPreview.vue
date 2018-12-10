<template>
      <div id="listing" @click="$router.push({ name: 'Listing', query: id })">

        <!-- Shape and Price -->
        <div class="container">
          <h4>{{ shape.toUpperCase() }} {{ dimension }}</h4>
          <h4>${{ cwt }} Cwt</h4>
        </div>

        <!-- Length -->
        <div class="container length-div">
          <div>
            <p>
              {{ feet }}' {{ inches }}" <span v-if="numerator">{{ numerator }}/{{ denominator }}</span>
            </p>
          </div>
          <div class="quantity">
            <p>{{ quantity }} available</p>
          </div>
        </div>

        <div class="info-div">

          <!-- Additional Info on Material -->
          <div class="info-container">

            <div class="box upper-box">
              <div>
                <p>{{ grade }}</p>
              </div>
              <div>
                <p v-if="domestic">Domestic</p>
                <p v-else>Foreign</p>
              </div>
            </div>

            <div class="box">
              <div>
                <p v-if="heat"><span class="check">&#10004;</span>Heat #s included</p>
              </div>
              <div>
                <p v-if="painted"><span class="check">&#10004;</span>Painted</p>
              </div>
              <div>
                <p v-if="galvanized"><span class="check">&#10004;</span>Galvanized</p>
              </div>
            </div>

          </div>

          <!-- Company Info -->
          <div class="info-container">

            <div class="box upper-box">
              <div>
                <h4>{{ company }}</h4>
              </div>
              <div>
                <p>{{ city }}, {{ state }}</p>
              </div>
            </div>

            <div class="box">
              <div>
                <p v-if="cut"><span class="check">&#10004;</span>Offers cut to order</p>
              </div>
              <div>
                <p v-if="delivery"><span class="check">&#10004;</span>Offers delivery</p>
              </div>
            </div>

          </div>

        </div>

        <!-- click message -->
        <div class="click-message">
          <em>Click for information/to place order</em>
        </div>

      </div>
</template>

<script>
export default {
  props: [ 'id', 'shape', 'dimension', 'feet', 'inches', 'numerator', 'denominator', 'cwt', 'grade', 'heat', 'quantity', 'domestic', 'painted', 'galvanized', 'company', 'city', 'state', 'cut', 'delivery']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #listing {
    width: 95%;
    max-width: 800px;
    height: 200px;
    position: relative;
    padding: 10px;
    margin: 10px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,.1);
    cursor: pointer;
    border-radius: 2px;
  }

  .container {
    display: flex;
    justify-content: space-between;
    flex: 1;
  }

  .info-div {
    display: flex;
    justify-content: space-between;
    margin-top: 15px;
  }

  .info-container {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-content: flex-start;
  }

  .box {
    flex: 1;
    min-width: 140px;
  }

  .upper-box {
    height: 50px;
  }

  h4 {
    margin: 0;
    font-weight: bold;
  }

  p {
    margin: 0;
  }

  .click-message {
    text-align: center;
    position: absolute;
    bottom: 0;
    right: 0;
    left: 0;
    margin: auto;
    width: 90%;
    padding: 10px;
    color: $secondary;
    text-decoration: underline;
  }
</style>
