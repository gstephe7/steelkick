<template>
  <div id="mobile-menu" @click="closeMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'Home' }">Buy Steel</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Home' }">Sell Steel</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Home' }">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Home' }">Create Account</router-link>
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

  #mobile-menu {
    background-color: $primary;
  }

  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    text-align: right;
  }

  li {
    padding: 15px 15px 0 0;
  }

  a {
    color: $tertiary;
    text-decoration: none;
    font-size: 24px;
  }
</style>
