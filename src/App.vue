<template>
  <div>
    <Loading v-if="$store.getters.loading"></Loading>
    <router-view></router-view>
  </div>
</template>

<script>
import Loading from '@/components/progress/Loading'

export default {
  components: {
    Loading
  },
  methods: {
    // handles autotab on forms. Use class "autotab" to make an input element autotab on change or when maxlength is met
    autotab () {
      let fields = document.querySelectorAll('.autotab')

      Array.prototype.forEach.call(fields, (item, index) => {
        if (item.tagName == 'INPUT') {
          item.addEventListener('input', () => {
            let maxLength = item.getAttribute('maxlength')
            if (item.value.length == maxLength) {
              let next = index + 1
              fields[next].focus()
              fields[next].click()
            }
          })
        } else if (item.tagName == 'SELECT') {
          item.addEventListener('change', () => {
            let next = index + 1
            fields[next].focus()
            fields[next].click()
          })
        }
      })
    },
  },
  beforeCreate () {
    if (this.$store.getters.loggedIn == false) {
      const token = this.$cookies.get('sk-user')
      if (token) {
        this.$store.dispatch('login', {
          user: token.user,
          token: token.token
        })
      } else {
        this.$store.dispatch('logout')
      }
    }
  },
  mounted () {
    this.autotab()
  },
  updated () {
    this.autotab()
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/style.scss';
</style>
