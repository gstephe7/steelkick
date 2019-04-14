<template>
  <nav @click="closeMenu">
    <ul :row="desktop" :class="{ desktopNav : desktop, footerNav : footer }">
      <li>
        <router-link :to="{ name: 'Search' }">
          Buy Steel
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'AddMaterial' }">
          Sell Steel
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Dashboard' }">
          Dashboard
        </router-link>
      </li>
      <li>
        <router-link :to="{ name: 'Contact' }">
          Contact
        </router-link>
      </li>
      <li>
        <router-link v-if="$store.getters.loggedIn" :to="{ name: 'Logout' }">
          <span @click="$store.dispatch('logout')">Logout</span>
        </router-link>
        <router-link v-else :to="{ name: 'Login' }">
          Sign In
        </router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
import Notify from '@/components/app/notifications/Notify'

export default {
  props: ['desktop', 'footer'],
  components: {
    Notify
  },
  methods: {
    closeMenu () {
      this.$emit('closeMenu')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .desktopNav {
    a {
      font-size: 18px;
    }
  }

  .footerNav {
    li {
      justify-content: center;
    }
    a {
      font-size: 18px;
    }
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
