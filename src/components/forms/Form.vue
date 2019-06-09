<template>
  <form id="form" @submit.prevent="submit" @keyup.enter="submit">

    <div class="form-title">
      <slot name="title"></slot>
    </div>

    <div id="inputs" class="form-content">
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
  data () {
    return {
      errors: []
    }
  },
  methods: {
    handleErrors () {
      this.errors = []
      let formChildren = this.$children

      formChildren.forEach((item, index) => {
        if (item.$props.required && !item.value) {
          item.$el.classList.add('error')
          item.$watch('value', (value) => {
            if (value) {
              item.$el.classList.remove('error')
            } else {
              item.$el.classList.add('error')
            }
          })
          this.errors.push(index)
        } else {
          item.$el.classList.remove('error')
        }
      })
    },
    submit () {
      this.handleErrors()

      if (this.errors.length == 0) {
        this.$emit('submitForm')
      }
    }
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

  #form {
    max-width: 600px;
    margin: 0 auto;
    @include col;
  }

  .form-content {
    @include wrap;
    @include center;
    width: 100%;
  }

  .form-title {
    margin: 0 16px 16px 16px;
  }

  .error /deep/ {
    select.input, select.input:focus, input.input, input.input:focus, textarea.input, textarea.input:focus, .length-span {
      border: 2px solid $alert !important;
    }
  }

  .error:after {
    content: "Required";
    transition: 250ms all;
    position: absolute;
    background-color: #fff;
    color: $alert;
    font-size: 12px;
    bottom: -8px;
    right: 16px;
    top: auto;
    display: inline;
    padding: 4px;
  }
</style>
