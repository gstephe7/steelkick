<template>
      <div id="listing" @click="$router.push({ name: 'Listing', query: item.id })">

        <!-- Shape and Price -->
        <div class="container">
          <h4>{{ item.shape.toUpperCase() }} {{ item.dimension }}</h4>
          <h4>${{ item.cwt }} Cwt</h4>
        </div>

        <!-- Length -->
        <div class="container length-div">
          <div>
            <p>
              {{ item.feet }}' {{ item.inches }}" <span v-if="item.numerator">{{ item.numerator }}/{{ item.denominator }}</span>
            </p>
          </div>
          <div class="quantity">
            <p>{{ item.quantity }} added</p>
          </div>
        </div>

        <div class="info-div">

          <!-- Additional Info on Material -->
          <div class="info-container">

            <div class="box upper-box">
              <div>
                <p>{{ item.grade }}</p>
              </div>
              <div>
                <p v-if="item.domestic">Domestic</p>
                <p v-else>Foreign</p>
              </div>
            </div>

            <div class="box">
              <div>
                <p v-if="item.heat"><span class="check">&#10004;</span>Heat #s included</p>
              </div>
              <div>
                <p v-if="item.painted"><span class="check">&#10004;</span>Painted</p>
              </div>
              <div>
                <p v-if="item.galvanized"><span class="check">&#10004;</span>Galvanized</p>
              </div>
            </div>

          </div>

          <!-- Company Info -->
          <div class="info-container">

            <div class="box upper-box">
              <div>
                <h4>{{ item.company }}</h4>
              </div>
              <div>
                <p>{{ item.city }}, {{ item.state }}</p>
              </div>
            </div>

          </div>

        </div>

        <!-- Order info -->
        <div class="order-div">

          <div class="order-container">
              <div v-if="item.cuts">
                <p>Cut Total: ${{ item.cutCost }}</p>
                <p>{{ item.cuts.length }} cuts</p>
                <div class="cuts-box" v-for="cut in item.cuts">
                  <p>{{ cut.quantity }} @ {{ cut.feet }}' {{ cut.inches }}" {{ cut.numerator }}/{{ cut.denominator }}</p>
                </div>
              </div>
          </div>

          <div class="subtotal-container">
            <h4>Material Subtotal: ${{ item.materialPrice }}</h4>
          </div>

        </div>

      </div>
</template>

<script>
export default {
  props: [ 'item']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #listing {
    width: 95%;
    max-width: 800px;
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

  .order-div {
    display: flex;
    flex-direction: column;
    margin-top: 15px;
  }

  .order-container {
    display: flex;
    flex-direction: column;
  }

  .info-container {
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    align-content: flex-start;
  }

  .subtotal-container {
    align-self: flex-end;
    margin-top: 15px;
  }

  .box {
    flex: 1;
    min-width: 140px;
  }

  .cuts-box {
    display: flex;
    padding-left: 20%;
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
