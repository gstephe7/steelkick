<template>
  <div id="user-preview">

    <div class="container">

      <div>
        <h4>{{ user.firstName }} {{ user.lastName }}</h4>
      </div>

      <div>
        <p v-if="user.admin">Admin</p>
        <p v-else>User</p>
      </div>

    </div>

    <div class="container">
      <p>{{ user.email }}</p>
    </div>

    <div class="click-message">
      <p>Click to edit</p>
    </div>

  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #user-preview {
    box-shadow: $box-shadow;
    padding: 10px;
    margin: 5px 0 5px 0;
  }

  .container {
    display: flex;
    justify-content: space-between;
  }

  h4 {
    margin: 0;
    font-weight: bold;
  }

  p {
    margin: 0;
  }

  .click-message {
    margin-top: 15px;
    color: royalblue;
    text-decoration: underline;
    font-style: italic;
    text-align: center;
  }
</style>
