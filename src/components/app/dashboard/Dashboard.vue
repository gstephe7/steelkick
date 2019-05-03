<template>
  <div main>

    <h1>{{ $store.getters.companyName }} Dashboard</h1>

    <hr>

    <div center wrap>

      <div around wrap>
        <section col center card click @click="$router.push({name: 'Working'})">
          <icon big icon="hammer" class="red"></icon>
          <h2>Start Working</h2>
        </section>
        <section col center card click @click="$router.push({name: 'Jobs'})">
          <icon big icon="briefcase" class="green"></icon>
          <h2>Jobs</h2>
        </section>
      </div>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push({name: 'Schedule'})">
          <icon big :icon="{ prefix: 'far', iconName: 'calendar-alt' }" class="orange"></icon>
          <h2>Schedule</h2>
        </section>
        <section col center card click @click="$router.push({name: 'Tasks'})">
          <span class="notify-container">
            <New class="notify" :orders="true"></New>
          </span>
          <icon big icon="tasks" class="blue"></icon>
          <h2>Tasks</h2>
        </section>
      </div>

    </div>

    <div center wrap>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push({name: 'Inventory'})">
          <icon big icon="boxes" class="gold"></icon>
          <h2>Inventory</h2>
        </section>
        <section col center card click @click="$router.push({name: 'Users'})" v-if="$store.getters.isAdmin">
          <icon big icon="users" class="purple"></icon>
          <h2>Users</h2>
        </section>
      </div>

      <div around wrap>
        <section col center card click @click="$router.push({name: 'Marketplace'})">
          <icon big icon="dollar-sign" class="blue-green"></icon>
          <h2>Marketplace</h2>
        </section>
        <section col center card click @click="$router.push({name: 'Settings'})">
          <icon big icon="cog" class="burgundy"></icon>
          <h2>Settings</h2>
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

  .notify-container {
    position: relative;
  }

  .notify {
    position: absolute;
    top: -40px;
    right: -140px;
  }
</style>
