<template>
  <nav end @click="closeMenu">
    <ul :row="desktop" :class="{ footerNav : footer }">
      <li>
        <router-link :to="'/search'">
          Buy Steel
        </router-link>
      </li>
      <li>
        <router-link :to="'/add-material'">
          Sell Steel
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Dashboard' }">
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link :to="'/contact'">
          Contact
        </router-link>
      </li>
      <li>
        <router-link v-if="$store.getters.loggedIn" :to="'/logout'">
          <span @click="$store.dispatch('logout')">Logout</span>
        </router-link>
        <router-link v-else :to="'/login'">
          Sign In
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: ['desktop', 'footer'],
  methods: {
    closeMenu () {
      this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  nav {
    background-color: $theme;
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

  li {
    justify-content: flex-end;
    line-height: 1.5;
    padding-right: 10px;
  }

  .footerNav {
    li {
      justify-content: center;
      padding: 0;
    }
  }

  a {
    color: $accent;
    text-decoration: none;
    font-size: 18px;
    padding: 5px 10px;
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
