<template>
  <form @submit.prevent="$emit('submitForm')">

    <div class="form-title">
      <slot name="title"></slot>
    </div>

    <div id="inputs" class="content">
      <slot name="content"></slot>
    </div>

    <div class="col">
      <button class="green"
              type="submit">
        <slot name="action"></slot>
      </button>
    </div>

    <div class="errors col">
      <slot name="errors"></slot>
    </div>

  </form>
</template>

<script>
export default {
  mounted () {
    let inputs = document.querySelectorAll('.input')
    inputs[0].focus()
    inputs[0].click()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  form {
    max-width: 600px;
    margin: auto;
    @include col;
  }

  .content {
    @include wrap;
    @include center;
  }

  .form-title {
    margin: 0 15px 15px 15px;
  }

  .errors {
    color: $red;
  }
</style>
