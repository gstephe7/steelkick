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

    </div>

    <EditProfileScreen v-if="showEditProfile"
                       @close="showEditProfile = false">
    </EditProfileScreen>

    <EditWorkflowScreen v-if="showEditWorkflow"
                       @close="showEditWorkflow = false">
    </EditWorkflowScreen>

  </div>
</template>

<script>
import EditProfileScreen from './profile/EditProfileScreen'
import EditWorkflowScreen from './workflow/EditWorkflowScreen'

export default {
  components: {
    EditProfileScreen,
    EditWorkflowScreen
  },
  data () {
    return {
      showEditProfile: false,
      showEditWorkflow: false
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
