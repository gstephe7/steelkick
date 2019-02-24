<template>
  <div id="footer">

    <div class="container">
      <ul>
        <li>
          <router-link :to="{ name: 'Home' }">Home</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Search' }">Buy Steel</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'AddMaterial' }">Sell Steel</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'DashboardHome' }">Dashboard</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Inventory' }">Manage Inventory</router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Contact' }">Contact</router-link>
        </li>
        <li>
          <router-link v-if="$store.getters.loggedIn" :to="{ name: 'Logout' }">
            <span @click="$store.dispatch('logout')">Logout</span>
          </router-link>
          <router-link v-else :to="{ name: 'Register' }">
            Create Account
          </router-link>
        </li>
      </ul>
    </div>

    <div class="logo">
      <Logo :footer="true"></Logo>
    </div>

  </div>
</template>

<script>
import Logo from '@/components/logo/Logo'

export default {
  components: {
    Logo
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #footer {
    display: flex;
    justify-content: space-around;
    height: 200px;
    padding: 50px 0 50px 0;
    margin-top: 100px;
    background-color: $primary;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 10px 0 10px 0;
  }

  a {
    color: $accent;
    text-decoration: none;
    opacity: .75;
  }
</style>
