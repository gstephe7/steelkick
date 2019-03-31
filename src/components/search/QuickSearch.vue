<template>
  <div id="quick-search">

    <div col center class="layer">

      <h1>Search For Steel Near You</h1>

      <Search :quick="true"
              :searching="true">
      </Search>

    </div>
  </div>
</template>

<script>
import Search from '@/components/search/Search'

export default {
  components: {
    Search
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #quick-search {
    height: 400px;
    background-image: url('../../assets/img/background-min.jpg');
    background-position: center;
    background-size: cover;
  }

  .layer {
    background-color: $qs-background;
    height: 100%;
    width: 100%;
  }

  h1 {
    color: $accent;
    margin: 20px 40px;
  }
</style>
