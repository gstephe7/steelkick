<template>
  <div main>

    <Back route="JobDetails">Back to job</Back>

    <h1>
      {{ $route.query.jobName }} <br>
      Parts
    </h1>

    <hr>

    <br>

    <Parts :job="$route.query.job"></Parts>

  </div>
</template>

<script>
import api from '@/api/api'
import Parts from './Parts'

export default {
  components: {
    Parts
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  [main] {
    max-width: 1200px;
  }
</style>
