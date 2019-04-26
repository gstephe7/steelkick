<template>
  <section col center card click :class="{ selected : workflow }">

    <img :src="action.image" draggable="false">

    <h3>{{ action.action }}</h3>

  </section>
</template>

<script>
export default {
  props: ['action', 'workflow']
}
</script>

<style lang="scss" scoped>
  section[card] {
    cursor: grab;
    margin: 10px 5px;
    h3 {
      margin: 0;
    }
  }

  img {
    width: 50px;
  }
</style>
