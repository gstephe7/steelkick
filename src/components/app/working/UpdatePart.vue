<template>
  <div align center modal>
    <div basis card class="modal-box">

      <div between align>
        <h2>{{ partName }}</h2>
        <icon small click icon="times" @click="$emit('close')"></icon>
      </div>

      <hr>

      <div>
        <div col>
          <h3>
            Mark ({{ quantity }}) {{ partName }} {{ action.description.toLowerCase() }}?
          </h3>
        </div>

        <div center>
          <button tiny @click="quantity -= 1">-</button>
          <input tiny id="input" v-model.number="quantity" type="number" @blur="checkNumber">
          <button tiny @click="quantity += 1">+</button>
        </div>
      </div>

      <br>

      <div col>
        <button green @click="submit">
          Mark ({{ quantity }}) {{ action.description }}
        </button>
      </div>

      <br>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['action', 'part'],
  data () {
    return {
      quantity: 1
    }
  },
  computed: {
    partName () {
      if (this.part.minorMark) {
        return this.part.minorMark
      } else {
        return this.part.pieceMark
      }
    }
  },
  methods: {
    checkNumber () {
      if (typeof this.quantity != 'number') {
        this.quantity = 1
      }
    },
    submit () {
      this.$store.dispatch('loading')
      this.$store.dispatch('action', {
        job: this.$store.getters.currentJob._id,
        sequence: this.part.sequence._id,
        part: this.part._id,
        action: 'marked',
        description: this.action.description,
        quantity: this.quantity
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$emit('close')
        this.$store.dispatch('success', `Successfully marked ${this.quantity} more ${this.partName} as ${this.action.description}`)
        .then(() => {
          location.reload(true)
        })
      })
    }
  },
  mounted () {
    document.getElementById('input').select()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .modal-box {
    max-width: 500px;
    max-height: 90%;
    background-color: white;
    margin: 5px;
    img {
      height: 40px;
    }
    h2 {
      margin: 0;
      font-weight: bold;
      font-size: 32px;
    }
    button[tiny] {
      border-radius: 10px;
      width: 75px;
      height: 75px;
      font-size: 50px;
      margin: 15px;
    }
    input[tiny] {
      margin: 15px 10px;
      width: 40px;
      font-size: 24px;
    }
  }
</style>
