<template>
  <div id="menu" @click="closeMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'AdminHome' }">Admin Home</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  methods: {
    closeMenu () {
      this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #menu {
    background-color: $accent;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }

  li {
    padding: 7.5px 0 0 15px;
  }

  a {
    color: $primary;
    text-decoration: none;
    font-size: 18px;
  }
</style>
