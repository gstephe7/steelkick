<template>
  <div main>

    <div center wrap>

      <div around wrap>
        <section col center card click @click="$router.push({name: 'Working'})">
          <icon medium icon="hammer" class="red"></icon>
          <h4>Start Working</h4>
        </section>
        <section col center card click @click="$router.push({name: 'Jobs'})">
          <icon medium icon="briefcase" class="green"></icon>
          <h4>Jobs</h4>
        </section>
      </div>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push({name: 'Schedule'})">
          <icon medium :icon="{ prefix: 'far', iconName: 'calendar-alt' }" class="orange"></icon>
          <h4>Schedule</h4>
        </section>
        <section col center card click @click="$router.push({name: 'Tasks'})">
          <icon medium icon="tasks" class="blue"></icon>
          <h4>Tasks</h4>
        </section>
      </div>

    </div>

    <div center wrap>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push({name: 'Inventory'})">
          <icon medium icon="boxes" class="gold"></icon>
          <h4>Inventory</h4>
        </section>
        <section col center card click @click="$router.push({name: 'Users'})" v-if="$store.getters.isAdmin">
          <icon medium icon="users" class="purple"></icon>
          <h4>Users</h4>
        </section>
      </div>

      <div around wrap>
        <section col center card click @click="$router.push({name: 'Marketplace'})">
          <icon medium icon="dollar-sign" class="blue-green"></icon>
          <h4>Marketplace</h4>
        </section>
        <section col center card click @click="$router.push({name: 'Settings'})">
          <icon medium icon="cog" class="burgundy"></icon>
          <h4>Settings</h4>
        </section>
      </div>

    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>

  [main] {
    max-width: 1200px;
  }

  [card] {
    height: 120px;
    width: 120px;
    h4 {
      margin: 5px;
    }
    svg {
      margin: 5px;
    }
  }
</style>
