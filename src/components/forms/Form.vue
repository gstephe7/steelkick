<template>
  <form id="form" @submit.prevent="$emit('submitForm')" @keyup.enter="$emit('submitForm')">

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

    setTimeout(() => {

      let form = document.getElementById('form')

      let inputs = form.querySelectorAll('input, select, textarea')

      Array.prototype.forEach.call(inputs, (item, index) => {

        if (index == 0 && !this.viewFirst) {
          if (item.tagName == 'INPUT') {
            item.focus()
            item.select()
          } else {
            item.focus()
            item.click()
          }
        }

        if (item.tagName == 'INPUT' || item.tagName == 'TEXTAREA') {
          item.addEventListener('input', () => {
            let maxLength = item.getAttribute('maxlength')
            if (item.value.length == maxLength) {
              let next = index + 1
              inputs[next].focus()
              inputs[next].click()
            }
          })
        }

        else if (item.tagName == 'SELECT') {
          item.addEventListener('change', () => {
            let next = index + 1
            inputs[next].focus()
            inputs[next].click()
          })
        }
      })

    }, 500)

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
