<template>
  <div class="dashboard-card click" @click="$router.push(route)">

    <!-- Thumbnail -->
    <div class="card-thumbnail">
      <slot name="thumbnail"></slot>
    </div>

    <!-- Title -->
    <div class="card-title">
      <slot name="title"></slot>
    </div>

    <!-- Content -->
    <div class="card-content">
      <slot name="content"></slot>
    </div>

  </div>
</template>

<script>
export default {
  props: ['route']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .dashboard-card {
    @include col;
    height: 100px;
    width: 100px;
    padding: 15px;
    margin: 10px;
    border-radius: 5px;
    box-shadow: $box-shadow-light;
    @media screen and (min-width: 1000px) {
      height: 150px;
      width: 150px;
    }
  }

  .card-thumbnail {
    @include align;
    font-size: 44px;
    height: 45%;
    margin-bottom: 10px;
    @media screen and (min-width: 1000px) {
      font-size: 65px;
    }
  }

  .card-title {
    font-size: 16px;
    font-weight: bold;
    @media screen and (min-width: 1000px) {
      font-size: 20px;
    }
  }

  .card-content {
    font-size: 12px;
    @media screen and (min-width: 1000px) {
      font-size: 14px;
    }
  }
</style>
