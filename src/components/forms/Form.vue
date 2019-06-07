<template>
  <form @submit.prevent="$emit('submitForm')">

    <div class="form-title">
      <slot name="title"></slot>
    </div>

    <div id="inputs" class="content">
      <slot name="content"></slot>
    </div>

    <div v-if="$slots.action" class="col">
      <Button create
              type="submit">
        <slot name="action"></slot>
      </Button>
    </div>

    <div v-if="$slots.errors" class="errors col">
      <slot name="errors"></slot>
    </div>

  </form>
</template>

<script>
export default {
  props: {
    viewFirst: Boolean
  },
  mounted () {
    if (!this.viewFirst) {
      let inputs = document.querySelectorAll('.input')
      inputs[0].focus()
      inputs[0].click()
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  form {
    max-width: 600px;
    margin: 0 auto;
    @include col;
  }

  .content {
    @include wrap;
    @include center;
    width: 100%;
  }

  .form-title {
    margin: 0 16px 16px 16px;
  }

  .errors {
    padding-top: 16px;
    color: $red;
  }
</style>
