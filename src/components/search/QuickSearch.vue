<template>
  <div id="quick-search">
    <div class="layer">
      <h2>Search For Steel Near You</h2>
      <div class="search">
        <div class="search-section">
          <select class="input">
            <option disabled selected>Shape</option>
          </select>
          <select class="input">
            <option disabled selected>Dimension</option>
          </select>
        </div>
        <div class="search-section">
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
    font-weight: 300;
    margin-top: 0;
  }

  .search {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .search-section {
    display: flex;
    justify-content: space-around;
  }

  .input {
    width: 140px;
    padding: 10px;
    margin: 5px;
    border-radius: 5px;
    border: none;
    font-size: 18px;
    font-family: 'Roboto', sans-serif;
    font-weight: 300;
  }

  .submit {
    width: 200px;
    margin: 10px;
    padding: 5px;
    background-color: $secondary;
    border-radius: 10px;
    border: none;
    color: #fff;
    font-family: 'Roboto', sans-serif;
    font-size: 18px;
    cursor: pointer;
  }
</style>
