<template>
  <form @submit.prevent="submit">

    <div class="form-title">
      <slot name="title"></slot>
    </div>

    <div class="content">
      <slot name="content"></slot>
    </div>

    <div class="col">
      <button class="green"
              type="submit"
              @click="$emit('submit')">
        <slot name="action"></slot>
      </button>
    </div>

  </form>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  form {
    max-width: 500px;
    margin: auto;
  }

  .content {
    @include wrap;
    @include around;
  }

  .form-title {
    margin: 0 15px 15px 15px;
    text-align: center;
  }
</style>
