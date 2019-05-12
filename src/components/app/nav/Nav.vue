<template>
  <nav @click="$emit('closeMenu')">
    <ul>
      <li>
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      </li>
      <li>
        <router-link to="/working">Start Working</router-link>
      </li>
      <li>
        <router-link to="/jobs">Jobs</router-link>
      </li>
      <li>
        <router-link to="/schedule">Schedule</router-link>
      </li>
      <li>
        <router-link to="tasks">Tasks</router-link>
      </li>
      <li>
        <router-link to="/inventory">Inventory</router-link>
      </li>
      <li>
        <router-link to="/users">Users</router-link>
      </li>
      <li>
        <router-link to="/marketplace">Marketplace</router-link>
      </li>
      <li>
        <router-link to="/settings">Settings</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  nav {
    margin: 10px;
  }

  li {
    transition: 250ms all;
  }

  li:hover {
    transform: scale(1.015);
  }

  a {
    width: 100%;
    color: $primary;
    text-decoration: none;
    font-size: 18px;
    line-height: 1.5;
    transition: 250ms all;
    padding: 5px 10px;
  }

  a:hover {
    background-color: rgba(0,0,0,.1);
  }

  .notify-container {
    width: 0;
    height: 0;
    position: relative;
  }

  .notify {
    position: absolute;
    left: -15px;
    top: -5px;
  }
</style>
