<template>
  <div backdrop>

    <div modal>
      <div header>
        <h4>Select a New Action</h4>
        <icon small click icon="times" @click="$emit('close')">
        </icon>
      </div>
      <div content>
        <div item between align click v-for="item in actions" :key="item.description" @click="submit(item)">
          <img small margin :src="require(`@/assets/img/actions/${item.description}.png`)" :alt="item.action">
          <h5 margin>{{ item.action }}</h5>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: ['actions'],
  methods: {
    submit (item) {
      this.$emit('select', item)
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
