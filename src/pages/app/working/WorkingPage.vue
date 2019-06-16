<template>
  <div class="main">

    <div>
      <PartList :working="true"
        :job="$store.getters.currentJob._id"
        :key="key"
        @updatePart="displayUpdate($event)"
        @selectRole="showRoles = true"
        @selectJob="showJobs = true">
      </PartList>
    </div>

    <Modal v-if="showRoles" @close="showRoles = false">
      <template #title>
        Select Role
      </template>
      <template #content>
        <div v-for="role in roles" @click="updateRole(role)">
          <Item class="click">
            <template #thumbnail>
              <img :src="require(`@/assets/img/actions/${role.description}.png`)" />
            </template>
            <template #title>
              {{ role.action }}
            </template>
          </Item>
        </div>
      </template>
    </Modal>

    <Modal v-if="showJobs" @close="showJobs = false">
      <template #title>
        Select Job
      </template>
      <template #content>
        <div v-for="job in jobs" @click="updateJob(job)">
          <Item class="click">
            <template #title>
              {{ job.name }}
            </template>
            <template #second>
              {{ job.number }}
            </template>
          </Item>
        </div>
      </template>
    </Modal>

  </div>
</template>

<script>
import api from '@/api/api'
import PartList from '@/pages/app/parts/PartList'

export default {
  components: {
    PartList,
  },
  data () {
    return {
      jobs: [],
      roles: [],
      showRoles: false,
      showJobs: false,
      key: 0
    }
  },
  methods: {
    updateRole (role) {
      this.$store.dispatch('updateCurrentRole', role)
      this.showRoles = false
    },
    updateJob (job) {
      this.$store.dispatch('updateCurrentJob', job)
      this.key += 1
      this.showJobs = false
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/jobs/jobs',
      data: {
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.jobs = res.data.jobs
      }
    })

    api.request({
      type: 'get',
      endpoint: '/users/workflow',
      data: {
        companyId: this.$store.getters.companyId
      },
      res: res => {
        this.roles = res.data.workflow
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
