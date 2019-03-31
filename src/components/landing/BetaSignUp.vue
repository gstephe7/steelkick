<template>
  <div id="landing">

    <nav>
      <router-link :to="{ name: 'Home' }">
        <Logo></Logo>
      </router-link>
    </nav>

    <div jumbotron>

      <header>

        <h1>
          Sell your excess steel to local fabricators.
        </h1>

      </header>

    </div>

  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #landing {
    position: fixed;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    z-index: 99;
    background-color: white;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  [jumbotron] {
    height: 600px;
    width: 100%;
    background-image: url('../../assets/img/background-min.jpg');
    background-position: center;
    background-size: cover;
  }

  header {
    height: 100%;
    background-color: $qs-background;
  }
</style>
