<template>
  <div class="dashboard-card">

    <!-- Thumbnail -->
    <div class="thumbnail">
      <slot name="thumbnail"></slot>
    </div>

    <!-- Title -->
    <div class="title">
      <slot name="title"></slot>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .dashboard-card {

  }
</style>
