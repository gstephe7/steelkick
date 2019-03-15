<template>
  <div>
    <h1 class="logo title-a">STEEL<span class="title-b">KICK</span></h1>

    <h1 class="logo title-a">S<span class="title-b">K</span></h1>

    <div class="blue-profilepic">
      <h1 class="title-c">
        STEEL<span class="title-b">KICK</span>
      </h1>
    </div>

    <div class="white-profilepic">
      <h1 class="title-c">
        STEEL<span class="title-b">KICK</span>
      </h1>
    </div>

    <div class="cover">
      <div class="layer">
        <h1 class="title-c">
          STEEL<span class="title-b">KICK</span>
        </h1>
        <h2>
          Online Steel Marketplace for Fabricators
        </h2>
        <h3>
          www.steelkick.com
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';

  .title-a {
    color: $secondary;
    margin: 0;
    padding: 0;
    font-style: italic;
    letter-spacing: -17px;
  }

  .title-b {
    color: $accent;
  }

  .logo {
    font-size: 200px;
    margin: 100px;
  }

  .blue-profilepic {
    height: 1000px;
    width: auto;
    background-color: $primary;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
  }

  .white-profilepic {
    height: 1000px;
    width: auto;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 60px;
  }

  .title-c {
    color: $secondary;
    margin: 0;
    padding: 0;
    font-style: italic;
    letter-spacing: -10px;
  }

  .cover {
    height: 600px;
    background-image: url('../../assets/img/background-min.jpg');
    background-position: center;
    background-size: cover;
    width: auto;
    .title-c {
      font-size: 140px;
      letter-spacing: -12px;
    }
    h2 {
      font-size: 35px;
      margin: -10px 0 0 0;
      padding-left: 30px;
      color: $accent;
    }
    h3 {
      font-size: 26px;
      margin-top: 10px;
      padding-left: 30px;
      color: $secondary;
    }
    menu {
      margin: 40px auto 0 auto;
      width: 75%;
      div {
        width: 280px;
      }
    }
  }

  .layer {
    background-color: $qs-background;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    color: $accent;
    font-size: 50px;
  }
</style>
