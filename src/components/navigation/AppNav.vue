<template>
  <nav>
    <ul id="menu" @click="$emit('closeMenu')">
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
        <router-link to="/tasks">Tasks</router-link>
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
  mounted () {
    let menu = document.getElementById('menu')
    let items = menu.querySelectorAll('a')
    items.forEach(item => {
      if (item.href == this.$route.path) {
        item.classList.add('currentLink')
      }
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  nav {
    display: flex;
    flex-direction: column;
    ul {
      margin: 0;
      padding: 0;
      list-style-type: none;
    }
    li {
      display: flex;
    }
  }

  a {
    width: 100%;
    color: $theme;
    text-decoration: none;
    font-size: 18px;
    line-height: 1.5;
    transition: 250ms all;
    padding: 8px 16px;
  }

  a:hover {
    background-color: rgba(0,0,0,.1);
  }

  a.router-link-active {
    background-color: $light;
  }
</style>
