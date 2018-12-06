<template>
  <div id="register">
    <h2>Create Your Free Account</h2>
    <div class="form">
      <input type="text" placeholder="Company Name">
      <input type="text" placeholder="Email">
      <input type="password" placeholder="Password">
      <button type="button">Create Free Account</button>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #register {
    height: 400px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .icon {
    color: $accent;
    font-size: 50px;
  }

  input {
    border: 1px solid $accent;
    margin: 10px;
    width: 250px;
  }
</style>
