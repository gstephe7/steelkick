<template>
  <div id="loading">

    <fa-icon icon="spinner" id="spinner"></fa-icon>

  </div>
</template>

<script>
export default {
  mounted () {
    let spinner = document.getElementById('spinner')

    let deg = 0

    setInterval(() => {
      deg += 5
      spinner.style.transform = `rotate(${deg}deg)`
    }, 20)
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #loading {
    position: fixed;
    height: 100vh;
    width: 100vw;
    background-color: rgba(0,0,0,.8);
    display: flex;
    align-items: center;
    justify-content: center;
    #spinner {
      color: $secondary;
      font-size: 75px;
    }
  }
</style>
