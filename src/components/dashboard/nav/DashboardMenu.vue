<template>
  <div id="menu" @click="closeMenu">
    <ul>
      <li>
        <router-link :to="{ name: 'DashboardHome' }">Dashboard Home</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AddMaterial' }">Add New Material</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Inventory' }">Manage Inventory</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Cart' }">Cart</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DashboardHome' }">Pending Orders</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DashboardHome' }">Transaction History</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DashboardHome' }">Set Prices</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DashboardHome' }">Manage Company Users</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'DashboardHome' }">Edit Company Profile</router-link>
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
