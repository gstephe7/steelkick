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

  </form>
</template>

<script>
export default {
  mounted () {
    let firstElement = document.getElementById('inputs').firstChild
    let firstInput = firstElement.lastChild
    firstInput.focus()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  form {
    max-width: 400px;
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
</style>
