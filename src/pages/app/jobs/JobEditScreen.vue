<template>
  <div>
    <Screen @close="$emit('close')">

      <template #title>Edit Job</template>

      <template #actions>
        <Button text @click="$refs.form.submitForm()">
          SAVE
        </Button>
      </template>

      <template #content>

        <JobForm @close="$emit('close')"
                 :edit="job"
                 ref="form">
        </JobForm>

        <div class="div center">
          <Button outline delete @click="showDelete = true">
            DELETE JOB
          </Button>
        </div>

      </template>

    </Screen>

    <Modal v-if="showDelete" @close="showDelete = false">
      <template #title>Delete Job</template>
      <template #content>
        Are you sure you want to delete this job?
      </template>
      <template #actions>
        <Button text @click="showDelete = false">
          CANCEL
        </Button>
        <Button text delete @click="deleteJob">
          DELETE
        </Button>
      </template>
    </Modal>
  </div>
</template>

<script>
import api from '@/api/api'
import JobForm from './JobForm'

export default {
  components: {
    JobForm
  },
  props: {
    job: Object
  },
  data () {
    return {
      showDelete: false
    }
  },
  methods: {
    deleteJob () {
      api.request({
        type: 'delete',
        endpoint: '/jobs/delete-job',
        load: true,
        data: {
          jobId: this.job._id
        },
        res: res => {
          this.$store.dispatch('snackbar', 'Job successfully removed!')
          this.$router.push('/jobs')
        },
        err: err => {
          console.log(err)
        }
      })
    }
  }
}
</script>

<style lang="css" scoped>
</style>
