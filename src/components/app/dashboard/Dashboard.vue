<template>
  <div main>

    <h1>{{ $store.getters.companyName }} Dashboard</h1>

    <hr>

    <div center wrap>

      <div around wrap>
        <section col center card click @click="$router.push('add-material')">
          <icon icon="plus-circle" class="green"></icon>
          <h3>Add New Material</h3>
        </section>
        <section col center card click @click="$router.push('inventory')">
          <icon icon="list" class="burgundy"></icon>
          <h3>Manage Inventory</h3>
        </section>
      </div>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push('cart')">
          <icon icon="shopping-cart" class="orange"></icon>
          <h3>Checkout Cart</h3>
        </section>
        <section col center card click @click="$router.push('pending-orders')">
          <span class="notify-container">
            <New class="notify" :orders="true"></New>
          </span>
          <icon icon="clock" class="red"></icon>
          <h3>Pending Orders</h3>
        </section>
      </div>

    </div>

    <div center wrap>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push('transactions')">
          <span class="notify-container">
            <New class="notify" :transactions="true"></New>
          </span>
          <icon icon="history" class="gold"></icon>
          <h3>Transaction History</h3>
        </section>
        <section col center card click @click="$router.push('set-prices')">
          <icon icon="chart-line" class="blue-green"></icon>
          <h3>Set Prices</h3>
        </section>
      </div>

      <div around wrap>
        <section col center card click @click="$router.push('manage-users')" v-if="$store.getters.isAdmin">
          <icon icon="users" class="purple"></icon>
          <h3>Manage Company Users</h3>
        </section>
        <section col center card click @click="$router.push('edit-profile')">
          <icon icon="cog" class="blue"></icon>
          <h3>Edit Profile</h3>
        </section>
      </div>

    </div>

  </div>
</template>

<script>
import New from '@/components/app/notifications/New'

export default {
  components: {
    New
  }
}
</script>

<style lang="scss" scoped>

  [main] {
    max-width: 1200px;
  }

  [card] {
    height: 230px;
    width: 230px;
  }

  svg {
    font-size: 75px;
  }

  .notify-container {
    position: relative;
  }

  .notify {
    position: absolute;
    top: -40px;
    right: -140px;
  }
</style>
