<template>
  <div class="backdrop">
    <div class="modal">

      <header>
        <slot name="header"></slot>
        <icon class="close"
              icon="times"
              @click="$emit('close')">
        </icon>
      </header>

      <main>
        <slot name="main"></slot>
      </main>

      <footer>
        <slot name="actions"></slot>
      </footer>

    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(0,0,0,.75);
  }

  .modal {
    width: 90%;
    min-width: 280px;
    max-width: 500px;
    max-height: 80%;
    border-radius: 5px;
    box-shadow: $box-shadow-dark;
    overflow-y: auto;
  }

  header {
    display: flex;
    justify-content: space-between;
    background-color: $blue;
    color: #fff;
    padding: 10px;
    border-radius: 5px 5px 0 0;
  }

  main {
    background-color: #fff;
    padding: 10px;
    min-height: 50px;
  }

  footer {
    background-color: #fff;
    padding: 10px;
    border-radius: 0 0 5px 5px;
  }
</style>
