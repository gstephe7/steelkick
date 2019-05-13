<template>
  <div main>

    <Back>Back to job</Back>

    <h1>
      {{ $store.getters.currentJob.name }} <br>
      Parts
    </h1>

    <hr>

    <br>

    <Parts></Parts>

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
