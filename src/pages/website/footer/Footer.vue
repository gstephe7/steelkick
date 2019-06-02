<template>
  <footer>

    <div around>

      <section>
        <SiteNav :footer="true"></SiteNav>
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
import Social from '@/pages/website/social/Social'
import SiteNav from '@/components/navigation/SiteNav'

export default {
  components: {
    Social,
    SiteNav
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
  section {
    max-width: 180px;
  }
</style>
