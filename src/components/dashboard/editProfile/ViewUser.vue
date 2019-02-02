<template>
  <div>
    <p>First Name: {{ user.firstName }}</p>
    <p>Last Name: {{ user.lastName }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Password: *******</p>
    <div class="button-div">
      <button @click="$emit('editing')">Edit Profile</button>
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

  .button-div {
    display: flex;
    justify-content: space-around;
  }
</style>
