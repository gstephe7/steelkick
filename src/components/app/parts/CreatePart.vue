<template>
  <div class="main">

    <h1>Create New Part</h1>
    <h2>{{ $store.getters.currentJob.name }}</h2>

    <br>

    <PartForm></PartForm>

  </div>
</template>

<script>
import PartForm from './PartForm'

export default {
  components: {
    PartForm
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    margin-bottom: 0px;
  }

  h3 {
    margin-top: 0px;
  }

  input[tiny] {
    width: 50px;
  }
</style>
