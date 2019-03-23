<template>
  <footer>

    <div around>

      <section>
        <Nav :footer="true"></Nav>
      </section>

      <section>
        <Social></Social>
      </section>

    </div>

    <div around>
      <small>&copy; {{ currentYear }} SteelKick, LLC. All Rights Reserved.</small>
    </div>

  </footer>
</template>

<script>
import Social from '@/components/social/Social'
import Nav from '@/components/nav/Nav'

export default {
  components: {
    Social,
    Nav
  },
  computed: {
    currentYear () {
      let date = new Date()
      let year = date.getFullYear()

      return year
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';

  section {
    max-width: 180px;
  }
</style>
