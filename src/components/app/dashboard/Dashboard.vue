<template>
  <div main>

    <div center wrap>

      <div around wrap>
        <section col center card click @click="$router.push('/working')">
          <div half>
            <icon medium icon="hammer" class="red"></icon>
          </div>
          <div grow col>
            <b>Start Working</b>
            <small>Begin working on a job</small>
          </div>
        </section>
        <section col center card click @click="$router.push('/jobs')">
          <div half>
            <icon medium icon="briefcase" class="green"></icon>
          </div>
          <div grow col>
            <b>Jobs</b>
            <small>View/Manage jobs</small>
          </div>
        </section>
      </div>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push('/schedule')">
          <div half>
            <icon medium :icon="{ prefix: 'far', iconName: 'calendar-alt' }" class="orange"></icon>
          </div>
          <div grow col>
            <b>Schedule</b>
            <small>View upcoming dates</small>
          </div>
        </section>
        <section col center card click @click="$router.push('/tasks')">
          <div half>
            <icon medium icon="tasks" class="blue"></icon>
          </div>
          <div grow col>
            <b>Tasks</b>
            <small>Accept/assign tasks with users</small>
          </div>
        </section>
      </div>

    </div>

    <div center wrap>

      <div around wrap v-if="$store.getters.isAdmin">
        <section col center card click @click="$router.push('/inventory')">
          <div half>
            <icon medium icon="boxes" class="gold"></icon>
          </div>
          <div grow col>
            <b>Inventory</b>
            <small>Manage/Add to inventory</small>
          </div>
        </section>
        <section col center card click @click="$router.push('/users')" v-if="$store.getters.isAdmin">
          <div half>
            <icon medium icon="users" class="purple"></icon>
          </div>
          <div grow col>
            <b>Users</b>
            <small>Add/View users</small>
          </div>
        </section>
      </div>

      <div around wrap>
        <section col center card click @click="$router.push('/marketplace')">
          <div half>
            <icon medium icon="dollar-sign" class="blue-green"></icon>
          </div>
          <div grow col>
            <b>Marketplace</b>
            <small>Buy/Sell excess steel</small>
          </div>
        </section>
        <section col center card click @click="$router.push('/settings')">
          <div half>
            <icon medium icon="cog" class="burgundy"></icon>
          </div>
          <div grow col>
            <b>Settings</b>
            <small>Edit profile and company settings</small>
          </div>
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

  [card] {
    height: 110px;
    width: 110px;
  }
</style>
