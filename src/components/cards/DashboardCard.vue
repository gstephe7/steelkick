<template>
  <div class="dashboard-card" @click="goTo">

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
  props: ['route'],
  methods: {
    goTo () {
      if (this.route) {
        this.$router.push(this.route)
      } else {
        this.$emit('click')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .dashboard-card {
    @include col;
    height: 112px;
    width: 112px;
    padding: 8px;
    margin: 8px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: $box-shadow-light;
    transition: 250ms all;
    @media screen and (min-width: 1000px) {
      height: 150px;
      width: 150px;
    }
  }

  .dashboard-card:hover {
    background-color: $light;
    cursor: pointer;
  }

  .card-thumbnail {
    @include align;
    font-size: 40px;
    height: 45%;
    margin-bottom: 10px;
    @media screen and (min-width: 1000px) {
      font-size: 60px;
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
    width: 100%;
    font-size: 12px;
    @media screen and (min-width: 1000px) {
      font-size: 14px;
    }
  }
</style>
