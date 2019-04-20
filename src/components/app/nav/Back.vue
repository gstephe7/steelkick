<template>
  <div>

    <span click @click="navigate">
      &lt; <slot></slot>
    </span>

  </div>
</template>

<script>
export default {
  props: ['route'],
  methods: {
    navigate () {
      if (this.route) {
        this.$router.push({
          name: this.route,
          query: {
            job: this.$route.query.job,
            jobName: this.$route.query.jobName
          }
        })
      } else {
        this.$router.back()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  span {
    color: royalblue;
    text-decoration: underline;
  }
</style>
