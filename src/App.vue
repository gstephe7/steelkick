<template>
  <div>
    <Loading v-if="$store.getters.loading"></Loading>
    <Nav></Nav>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Nav from '@/components/nav/Nav'
import Footer from '@/components/footer/Footer'
import Loading from '@/components/popups/Loading'

export default {
  components: {
    Nav,
    Footer,
    Loading
  },
  methods: {
    // handles autotab on forms. Use class "autotab" to make an input element autotab on change or when maxlength is met
    autotab () {
      let fields = document.querySelectorAll('.autotab')

      fields.forEach((item, index) => {
        if (item.tagName == 'INPUT') {
          item.addEventListener('keyup', () => {
            let maxLength = item.getAttribute('maxlength')
            if (item.value.length == maxLength) {
              let next = index + 1
              fields[next].focus()
            }
          })
        } else if (item.tagName == 'SELECT') {
          item.addEventListener('change', () => {
            let next = index + 1
            fields[next].focus()
          })
        }
      })
    }
  },
  beforeCreate () {
    const token = this.$cookies.get('token')
    if (token) {
      this.$store.dispatch('login', {
        user: token.user,
        token: token.token
      })
    } else {
      this.$store.dispatch('logout')
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
