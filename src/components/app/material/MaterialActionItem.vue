<template>
  <Item>

    <template #title>
      <div class="material-action">
        {{ name }} {{ action.action }} ({{ action.quantity }}) {{ action.materialDescription }} {{ action.description }} on {{ action.date }} at {{ action.time }}
      </div>
    </template>

  </Item>
</template>

<script>
export default {
  props: ['action'],
  computed: {
    name () {
      if (this.action.user.firstName && this.action.user.lastName) {
        return `${this.action.user.firstName} ${this.action.user.lastName}`
      } else if (this.action.user.firstName) {
        return this.action.user.firstName
      } else if (this.action.user.lastName) {
        return this.action.user.lastName
      } else {
        return this.action.user.email
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .material-action {
    font-size: 16px;
    font-weight: normal;
  }
</style>
