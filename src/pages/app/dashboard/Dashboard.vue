<template>
  <div class="main">

    <div class="center wrap">

      <div class="around wrap">
        <DashboardCard route="/working">
          <template v-slot:thumbnail>
            <icon class="red" icon="hammer"></icon>
          </template>
          <template v-slot:title>
            Start Working
          </template>
          <template v-slot:content>
            Begin working on a job
          </template>
        </DashboardCard>
        <DashboardCard route="/jobs" v-if="$store.getters.isAdmin">
          <template v-slot:thumbnail>
            <icon class="green" icon="briefcase"></icon>
          </template>
          <template v-slot:title>
            Jobs
          </template>
          <template v-slot:content>
            View/Manage Jobs
          </template>
        </DashboardCard>
      </div>

      <div class="around wrap">
        <DashboardCard route="/schedule">
          <template v-slot:thumbnail>
            <icon class="orange" :icon="{ prefix: 'far', iconName: 'calendar-alt' }"></icon>
          </template>
          <template v-slot:title>
            Schedule
          </template>
          <template v-slot:content>
            View Upcoming Dates
          </template>
        </DashboardCard>
        <DashboardCard route="/tasks">
          <template v-slot:thumbnail>
            <icon class="blue" icon="tasks"></icon>
          </template>
          <template v-slot:title>
            Tasks
          </template>
          <template v-slot:content>
            Accept/Assign Tasks with Users
          </template>
        </DashboardCard>
      </div>

    </div>

    <div class="center wrap">

      <div class="around wrap">
        <DashboardCard route="/inventory">
          <template v-slot:thumbnail>
            <icon class="gold" icon="boxes"></icon>
          </template>
          <template v-slot:title>
            Inventory
          </template>
          <template v-slot:content>
            Manage/Add to Inventory
          </template>
        </DashboardCard>
        <DashboardCard route="/users" v-if="$store.getters.isAdmin">
          <template v-slot:thumbnail>
            <icon class="purple" icon="users"></icon>
          </template>
          <template v-slot:title>
            Users
          </template>
          <template v-slot:content>
            Add/View Users
          </template>
        </DashboardCard>
      </div>

      <div class="around wrap">
        <DashboardCard route="/marketplace" v-if="$store.getters.isAdmin">
          <template v-slot:thumbnail>
            <icon class="blue-green" icon="dollar-sign"></icon>
          </template>
          <template v-slot:title>
            Marketplace
          </template>
          <template v-slot:content>
            Buy/Sell Excess Steel
          </template>
        </DashboardCard>
        <DashboardCard route="/settings">
          <template v-slot:thumbnail>
            <icon class="burgundy" icon="cog"></icon>
          </template>
          <template v-slot:title>
            Settings
          </template>
          <template v-slot:content>
            Edit Profile and Company Settings
          </template>
        </DashboardCard>
      </div>

    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
