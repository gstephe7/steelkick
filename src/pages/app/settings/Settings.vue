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

      <DashboardCard @click="showSignOut = true">
        <template v-slot:thumbnail>
          <icon class="red" icon="sign-out-alt"></icon>
        </template>
        <template v-slot:title>
          Sign Out
        </template>
        <template v-slot:content>
          Log out of your account
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

    <Modal v-if="showSignOut" @close="showSignOut = false">
      <template #title>Sign Out</template>
      <template #content>
        Are you sure you want to sign out?
      </template>
      <template #actions>
        <Button text @click="showSignOut = false">
          CANCEL
        </Button>
        <Button text @click="signOut">
          SIGN OUT
        </Button>
      </template>
    </Modal>

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
      showEditPrices: false,
      showSignOut: false
    }
  },
  methods: {
    signOut () {
      this.$store.dispatch('logout')
      this.$store.dispatch('snackbar', 'Successfully logged out')
      this.$router.push('/')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
