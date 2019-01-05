<template>
  <div id="dashboard-home">

    <div class="div">

      <div class="container">
        <div class="card" @click="$router.push('add-material')">
          <fa-icon icon="plus-circle" class="icon green"></fa-icon>
          <h3>Add New Material</h3>
        </div>
        <div class="card" @click="$router.push('inventory')">
          <fa-icon icon="list" class="icon burgundy"></fa-icon>
          <h3>Manage Inventory</h3>
        </div>
      </div>

      <div class="container">
        <div class="card" @click="$router.push('cart')">
          <fa-icon icon="shopping-cart" class="icon orange"></fa-icon>
          <h3>Checkout Cart</h3>
        </div>
        <div class="card" @click="$router.push('pending-orders')">
          <fa-icon icon="clock" class="icon red"></fa-icon>
          <h3>Pending Orders</h3>
        </div>
      </div>

    </div>

    <div class="div">

      <div class="container">
        <div class="card" @click="$router.push('transactions')">
          <fa-icon icon="history" class="icon gold"></fa-icon>
          <h3>Transaction History</h3>
        </div>
        <div class="card" @click="$router.push('set-prices')">
          <fa-icon icon="chart-line" class="icon blue-green"></fa-icon>
          <h3>Set Prices</h3>
        </div>
      </div>

      <div class="container">
        <div class="card" @click="$router.push('manage-users')">
          <fa-icon icon="users" class="icon purple"></fa-icon>
          <h3>Manage Company Users</h3>
        </div>
        <div class="card" @click="$router.push('edit-profile')">
          <fa-icon icon="cog" class="icon blue"></fa-icon>
          <h3>Edit Profile</h3>
        </div>
      </div>

    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #dashboard-home {
    max-width: 1100px;
    margin: auto;
    padding: 10px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }

  .div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .container {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  .card {
    width: 250px;
    height: 250px;
    margin: 10px;
    box-shadow: $box-shadow;
    border-radius: 2px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: 250ms all;
  }

  .card:hover {
    transform: scale(1.05);
  }

  .icon {
    font-size: 75px;
    color: $accent;
  }

  .green {
    color: $success;
  }

  .gold {
    color: $gold;
  }

  .orange {
    color: $orange;
  }

  .blue {
    color: $blue;
  }

  .red {
    color: $alert;
  }

  .blue-green {
    color: $blue-green;
  }

  .purple {
    color: $purple;
  }

  .burgundy {
    color: $burgundy;
  }
</style>
