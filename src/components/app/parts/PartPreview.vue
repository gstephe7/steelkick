<template>
  <div card click @click="viewPartDetails">

    <div>
      <b>
        {{ part.pieceMark }}
      </b>
    </div>

    <hr>

    <div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['part'],
  methods: {
    viewPartDetails () {
      this.$router.push({
        name: 'Part',
        query: {
          id: this.part.part._id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
