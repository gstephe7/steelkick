<template>
  <div class="main">

    <div class="between article">
      <Chip clickable @click="showRoles = true">
        <template #thumbnail>
          <img v-if="currentRole" :src="require(`@/assets/img/actions/${$store.getters.currentRole.description}.png`)" />
        </template>
        <template #content>
          <span v-if="currentRole">
            {{ $store.getters.currentRole.action }}
          </span>
          <span v-else>
            Select Role
          </span>
        </template>
      </Chip>
      <Chip clickable @click="showJobs = true">
        <template #content>
          <span v-if="currentJob">
            {{ $store.getters.currentJob.number }} - {{ $store.getters.currentJob.name.substring(0, 12) }}
          </span>
          <span v-else>
            Select Job
          </span>
        </template>
      </Chip>
    </div>

    <hr class="desktop">

    <div v-if="ready">
      <PartList :working="true"
        :job="$store.getters.currentJob._id"
        :key="key"
        @updatePart="displayUpdate($event)">
      </PartList>
    </div>

    <div v-if="alertMessage" class="section col">
      <h4>
        {{ alertMessage }}
      </h4>
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
  computed: {
    currentJob () {
      return this.$store.getters.currentJob || null
    },
    currentRole () {
      return this.$store.getters.currentRole || null
    },
    ready () {
      if (this.currentJob && this.currentRole) {
        return true
      } else {
        return false
      }
    },
    alertMessage () {
      if (!this.currentJob && !this.currentRole) {
        return 'Please select the role/task you are performing and the job you will be working on'
      } else if (!this.currentJob && this.currentRole) {
        return 'Please select the job you will be working on'
      } else if (!this.currentRole && this.currentJob) {
        return 'Please select the role/task you will be performing'
      } else {
        return false
      }
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
