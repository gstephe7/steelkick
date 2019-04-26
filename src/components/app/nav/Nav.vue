<template>
  <nav @click="closeMenu" :class="{ desktop : desktop }">
    <ul>
      <li>
        <router-link :to="{ name: 'Dashboard' }">Dashboard</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AddMaterial' }">Start Working</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Jobs' }">Jobs</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'EditProfile' }">Schedule</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Cart' }">Tasks</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'OrderPage' }">Inventory</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Transactions' }">Users</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'SetPrices' }">Marketplace</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Settings' }">Settings</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['desktop'],
  methods: {
    closeMenu () {
      this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  li {
    transition: 250ms all;
  }

  li:hover {
    transform: scale(1.015);
  }

  a {
    color: $accent;
    text-decoration: none;
    font-size: 24px;
    transition: 250ms all;
  }

  a:hover {
    color: $secondary;
  }

  .desktop {
    li {
      justify-content: flex-start;
      padding: 5px 5px;
    }
    li:hover {
      transform: scale(1.05);
    }
    a {
      font-size: 22px;
    }
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
