<template>
  <Item class="click">

    <template v-slot:thumbnail>
      <img :src="require(`@/assets/img/shapes/${part.shape}.png`)"/>
    </template>

    <template v-slot:title>
      <span>
        <b>
          {{ part.minorMark }}
        </b>
      </span>
    </template>

    <template v-slot:second>
       <span>
         {{ part.shape }} {{ part.dimension }}
       </span>
       <span>
         {{ feet }}'
         {{ inches }}"
         {{ fraction }}
       </span>
    </template>

    <template v-slot:metadata>
      Seq
      {{ part.sequence }}
    </template>

  </Item>
</template>

<script>
import method from '@/global/methods.js'

export default {
  props: ['part'],
  computed: {
    feet () {
      return method.getFeet(this.part.length)
    },
    inches () {
      return method.getInches(this.part.length)
    },
    fraction () {
      return method.getFraction(this.part.length)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  b {
    font-weight: bold;
  }

  sup {
    font-size: 12px;
    color: $grey;
  }
</style>
