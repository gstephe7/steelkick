<template>
  <div card click @click="viewPartDetails">

    <div between>
      <h3>
        {{ part.pieceMark }}
      </h3>

      <span>
        Seq {{ part.sequence.number }}
      </span>
    </div>

    <div between>
      <span>
        {{ part.shape }} {{ part.dimension }}
      </span>

      <div>
        <span>
          {{ feet }}'
        </span>
        <span>
          {{ inches }}"
        </span>
        <span v-if="fraction">
          {{ fraction }}
        </span>
      </div>
    </div>

    <hr>

    <div>

    </div>

  </div>
</template>

<script>
export default {
  props: ['part'],
  computed: {
    feet () {
      return Math.floor(this.part.length / 12)
    },
    inches () {
      return Math.floor(this.part.length % 12)
    },
    fraction () {
      let decimal = (this.part.length % 12) % 1
      let numerator = decimal * 16
      let denominator = 16

      for (let i = 0; i < 3; i++) {
        if (numerator % 2 == 0) {
          numerator /= 2
          denominator /= 2
        } else {
          break;
        }
      }

      if (numerator > 0) return `${numerator}/${denominator}`
      else return null
    }
  },
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
  h3 {
    font-weight: bold;
    font-size: 24px;
    margin: 0;
  }
</style>
