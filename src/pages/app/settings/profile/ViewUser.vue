<template>
  <div>
    <p>First Name: {{ user.firstName }}</p>
    <p>Last Name: {{ user.lastName }}</p>
    <p>Email: {{ user.email }}</p>
    <p>Password: *******</p>
    <div center>
      <Button @click="$emit('editing')">Edit Profile</Button>
    </div>
  </div>
</template>

<script>
export default {
  props: ['user']
}
</script>

<style lang="scss" scoped>
</style>
