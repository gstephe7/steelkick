<template>
  <div>

    <div class="div center">
      <Button outline delete @click="showDelete = true">
        DELETE NEST
      </Button>
    </div>

    <Modal v-if="showDelete">
      <template #title>
        Delete Job Nest
      </template>
      <template #content>
        Are you sure you want to delete the nest for this entire job?
      </template>
      <template #actions>
        <Button text @click="showDelete = false">
          CANCEL
        </Button>
        <Button text delete @click="deleteNest">
          DELETE
        </Button>
      </template>
    </Modal>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      showDelete: false
    }
  },
  methods: {
    deleteNest () {
      api.request({
        type: 'delete',
        endpoint: '/nest/',
        load: true,
        data: {
          jobId: this.$store.getters.currentJob._id
        },
        res: res => {
          this.showDelete = false
          this.$store.dispatch('snackbar', 'Deleted nest for this job')
          this.$router.push('job-details')
          setTimeout(() => {
            this.$router.push('nesting')
          }, 10)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
