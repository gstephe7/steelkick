<template>
      <div id="listing">

        <!-- Shape and Price -->
        <div class="container">
          <h4>{{ material.shape.toUpperCase() }} {{ material.dimension }}</h4>
          <h4>${{ material.cwt }} Cwt</h4>
        </div>

        <!-- Length -->
        <div class="container length-div">
          <div>
            <p>
              {{ material.feet }}' {{ material.inches }}" <span v-if="material.numerator">{{ material.numerator }}/{{ material.denominator }}</span>
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
                <p>{{ material.grade }}</p>
              </div>
              <div>
                <p v-if="material.domestic">Domestic</p>
                <p v-else>Foreign</p>
              </div>
            </div>

            <div class="box">
              <div>
                <p v-if="material.heat"><span class="check">&#10004;</span>Heat #s included</p>
              </div>
              <div>
                <p v-if="material.painted"><span class="check">&#10004;</span>Painted</p>
              </div>
              <div>
                <p v-if="material.galvanized"><span class="check">&#10004;</span>Galvanized</p>
              </div>
            </div>

          </div>

        </div>

        <!-- Order info -->
        <div class="order-div">

          <div class="order-container">
              <div v-if="item.cuts">
                <p>Cut Total</p>
                <p>{{ item.cuts.length }}</p>
                <div class="cuts-box" v-for="cut in item.cuts">
                  <p>
                    {{ cut.quantity }} @
                    <span v-if="cut.feet">
                      {{ cut.feet }}'
                    </span>
                    <span v-if="cut.inches">
                      {{ cut.inches }}"
                    </span>
                    <span v-if="cut.numerator">
                      {{ cut.numerator }}/{{ cut.denominator }}
                    </span>
                  </p>
                </div>
              </div>
          </div>

          <div class="subtotal-container">
            <div class="subtotal-box">
              <div class="item">
                <p>Material: </p>
              </div>
              <div class="price">
                <p>{{ item.subtotalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
              </div>
            </div>
            <div class="subtotal-box">
              <div class="item">
                <p>Cuts: </p>
              </div>
              <div class="price">
                <p>{{ item.cutPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</p>
              </div>
            </div>
            <div class="subtotal-box">
              <div class="item">
                <h4>Subtotal: </h4>
              </div>
              <div class="price">
                <h4>{{ item.subtotalPrice.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }}</h4>
              </div>
            </div>
          </div>

        </div>

        <!-- Click message -->
        <div class="click-message">
          <p>Click to edit this item/remove item from cart</p>
        </div>

      </div>
</template>

<script>
export default {
  props: [ 'item'],
  data () {
    return {
      material: this.item.material
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #listing {
    width: 100%;
    max-width: 800px;
    position: relative;
    padding: 10px;
    margin: 10px 5px 10px 5px;
    box-shadow: 2px 2px 2px 2px rgba(0,0,0,.1);
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

  .subtotal-box {
    display: flex;
    justify-content: space-between;
    width: 200px;
  }

  .item {
    width: 100px;
    text-align: right;
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
    margin-top: 25px;
    color: $secondary;
    text-decoration: underline;
    font-style: italic;
  }
</style>
