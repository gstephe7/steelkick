<template>
  <Item>

    <template #title>
      {{ title.toUpperCase() }}
    </template>

    <template #second>
      {{ userName }} {{ action.action }} ({{ action.quantity }}) {{ target }} {{ action.description }} on {{ action.date }} at {{ action.time }}
    </template>

  </Item>
</template>

<script>
export default {
  props: ['action'],
  computed: {
    userName () {
      let firstName = this.action.user.firstName || ''
      let lastName = this.action.user.lastName || ''
      let email = this.action.user.email || ''

      if (firstName || lastName) return `${firstName} ${lastName}`
      else return email
    },
    target () {
      if (this.action.materialDescription) {
        return this.action.materialDescription
      } else if (this.action.material) {
        return `${this.action.material.shape} ${this.action.material.dimension} ${this.action.material.length}"`
      } else {
        return this.action.part.minorMark
      }
    },
    title () {
      if (this.action.materialDescription || this.action.material) {
        return this.action.action
      } else {
        return this.action.description
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
