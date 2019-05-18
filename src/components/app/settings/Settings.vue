<template>
  <div main>

    <div center wrap>

      <DashboardCard route="/edit-profile">
        <template v-slot:thumbnail>
          <icon class="blue" icon="user-edit"></icon>
        </template>
        <template v-slot:title>
          Edit Profile
        </template>
        <template v-slot:content>
          Edit your user information
        </template>
      </DashboardCard>
      <DashboardCard route="/workflow">
        <template v-slot:thumbnail>
          <icon class="purple" icon="project-diagram"></icon>
        </template>
        <template v-slot:title>
          Edit Workflow
        </template>
        <template v-slot:content>
          Setup company workflow
        </template>
      </DashboardCard>

    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
</style>
