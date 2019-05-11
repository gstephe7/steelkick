<template>
  <nav @click="$emit('closeMenu')">
    <ul>
      <li>
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Working' }">Start Working</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Jobs' }">Jobs</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Schedule' }">Schedule</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Tasks' }">Tasks</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Inventory' }">Inventory</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Users' }">Users</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Marketplace' }">Marketplace</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Settings' }">Settings</router-link>
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
    color: $primary;
    text-decoration: none;
    font-size: 18px;
    line-height: 1.5;
    transition: 250ms all;
  }

  a:hover {
    color: $secondary;
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
