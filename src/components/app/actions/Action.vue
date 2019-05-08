<template>
  <div row align>
    <img v-if="action.part" :src="require(`@/assets/img/actions/${action.description}.png`)">
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
import method from '@/global/methods'

export default {
  props: ['action'],
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
      if (this.action.part) {
        return this.action.part.minorMark
      } else if (this.action.material) {
        return `${this.action.material.shape} ${this.action.material.dimension} ${this.length}`
      } else if (this.action.materialDescription) {
        return this.action.materialDescription
      }
    },
    length () {
      if (this.action.material) {
        let feet = method.getFeet(this.action.material.length) || '0'
        let inches = method.getInches(this.action.material.length) || '0'
        let fraction = method.getFraction(this.action.material.length) || ''

        return `${feet}'-${inches}" ${fraction}`
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  img {
    height: 20px;
    margin-right: 10px;
  }
</style>
