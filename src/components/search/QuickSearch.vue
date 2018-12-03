<template>
  <div id="quick-search">
    <div class="layer">
      <h2>Search For Steel Near You</h2>
      <div class="search">
        <div>
          <select class="input">
            <option disabled selected>Shape</option>
          </select>
          <select class="input">
            <option disabled selected>Dimension</option>
          </select>
        </div>
        <div>
          <input class="input" type="text" placeholder="Length"/>
          <input class="input" type="text" placeholder="Zipcode">
        </div>
        <button class="submit">Search</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #quick-search {
    height: 400px;
    background-image: url('../../assets/img/background.jpg');
    background-position: center;
    background-size: cover;
  }

  .layer {
    background-color: $qs-background;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  h2 {
    color: $secondary;
    text-align: center;
  }

  .search {
    display: flex;
    flex-direction: column;
  }

  .input {
    width: 140px;
    padding: 10px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
  }

  .submit {
    width: 200px;
  }
</style>
