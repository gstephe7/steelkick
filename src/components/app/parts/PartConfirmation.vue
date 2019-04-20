<template>
  <div main col center>

    <icon confirm icon="check-circle"></icon>

    <p v-if="$route.query.new">You have successfully added a new part!</p>
    <p v-if="$route.query.edit">You have successfully updated your part!</p>

    <router-link v-if="$route.query.new" :to="{ name: 'CreatePart', query: { job: $route.query.job, jobName: $route.query.jobName, sequence: $route.query.sequence } }" id="create">
      Create another part
    </router-link>

    <router-link :to="{ name: 'Parts', query: { job: $route.query.job, jobName: $route.query.jobName } }">
      View all parts
    </router-link>

    <router-link :to="{ name: 'Dashboard' }">
      Return to the dashboard
    </router-link>

  </div>
</template>

<script>
export default {
  mounted () {
    document.getElementById('create').focus()
  }
}
</script>

<style lang="scss" scoped>
</style>
