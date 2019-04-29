<template>
  <div row>
    <p>
      {{ name }}
      {{ action.action }}
      ({{ action.quantity }})
      {{ target }}
      {{ action.description.toLowerCase() }}
      at {{ action.time }}
      on {{ action.date }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['action', 'part'],
  computed: {
    name () {
      if (this.action.user.firstName && this.action.user.lastName) {
        return `${this.action.user.firstName} ${this.action.user.lastName}`
      } else if (this.action.user.firstName) {
        return this.action.user.firstName
      } else {
        return this.action.user.email
      }
    },
    target () {
      if (this.part) {
        return this.part.minorMark
      } else {
        return `${this.action.material.shape} ${this.action.material.dimension}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
