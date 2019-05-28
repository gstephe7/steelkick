<template>
  <div class="card">

    <div class="card-title">
      <slot name="title"></slot>
    </div>

    <div class="card-content">
      <slot name="content"></slot>
    </div>

    <div class="card-actions">
      <slot name="actions"></slot>
    </div>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .card {
    width: 280px;
    border-radius: 5px;
    margin: 5px;
    box-shadow: 0px 2px 2px 1px rgba(0,0,0,.2);
    transition: 250ms all;
  }

  .card-title {
    font-size: 24px;
    padding: 24px 16px 8px 16px;
  }

  .card-content {
    padding: 0px 16px;
    color: $grey;
    max-height: 224px;
    overflow: hidden;
  }

  .card-actions {
    padding: 8px 16px;
  }

  dl {
    @include between;
    margin: 0;
    line-height: 1.5;
  }

  dt, dd {
    width: auto;
  }

  dd {
    text-align: right;
    line-height: normal;
  }
</style>
