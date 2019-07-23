<template>
  <div class="main">

    <div class="center wrap">

      <DashboardCard @click="showEditProfile = true">
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

      <DashboardCard @click="showEditWorkflow = true">
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

      <DashboardCard @click="showEditPrices = true">
        <template v-slot:thumbnail>
          <icon class="blue-green" icon="dollar-sign"></icon>
        </template>
        <template v-slot:title>
          Set Prices
        </template>
        <template v-slot:content>
          Set prices for your inventory
        </template>
      </DashboardCard>

    </div>

    <EditProfileScreen v-if="showEditProfile"
                       @close="showEditProfile = false">
    </EditProfileScreen>

    <EditWorkflowScreen v-if="showEditWorkflow"
                       @close="showEditWorkflow = false">
    </EditWorkflowScreen>

    <EditPricesScreen v-if="showEditPrices"
                      @close="showEditPrices = false">
    </EditPricesScreen>

  </div>
</template>

<script>
import EditProfileScreen from './profile/EditProfileScreen'
import EditWorkflowScreen from './workflow/EditWorkflowScreen'
import EditPricesScreen from './prices/EditPricesScreen'

export default {
  components: {
    EditProfileScreen,
    EditWorkflowScreen,
    EditPricesScreen
  },
  data () {
    return {
      showEditProfile: false,
      showEditWorkflow: false,
      showEditPrices: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
