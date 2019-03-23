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

    <div id="ad">
      <div class="ad-layer">
        <div class="content">
          <h1 class="title-c">
            STEEL<span class="title-b">KICK</span>
          </h1>
          <h2>
            Buy and Sell Steel Online
          </h2>
          <div class="free-box">
            <p>100% FREE</p>
          </div>
        </div>
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
    font-weight: 700;
  }

  .title-b {
    color: $accent;
    font-weight: 700;
  }

  .logo {
    font-size: 200px;
    margin: 100px;
    font-weight: 700;
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
    font-weight: 700;
  }

  .cover {
    height: 600px;
    background-image: url('../../assets/img/background-min.jpg');
    background-position: center;
    background-size: cover;
    width: auto;
    margin: 50px 0;
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

  .free-box {
    display: inline-block;
    padding: 25px;
    background-color: $alert;
    color: white;
    border-radius: 50%;
    box-shadow: $box-shadow;
    p {
      margin: 0;
      font-size: 40px;
      font-weight: 700;
      text-shadow: $text-shadow;
    }
  }

  #ad {
    background-image: url('../../assets/img/welder.jpg');
    background-position: center;
    background-size: cover;
    height: 500px;
    .title-c {
      margin-left: -15px;
      font-size: 100px;
      text-align: left;
      letter-spacing: -9px;
      text-shadow: $text-shadow;
    }
    h2 {
      color: $accent;
      font-size: 40px;
      margin: 0 0 20px 0;
      text-shadow: $text-shadow;
    }
  }

  .ad-layer {
    height: 100%;
    width: 100%;
    background-color: rgba(24, 32, 51, .7);
  }

  .content {
    width: 60%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
</style>
