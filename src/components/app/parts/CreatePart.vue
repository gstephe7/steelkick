<template>
  <div class="main">

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
