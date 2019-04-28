<template>
  <div align center modal>
    <div basis card class="modal-box">

      <div between align>
        <h2>Edit Minor Members</h2>
        <icon click small icon="times" @click="$emit('close')">
        </icon>
      </div>

      <hr>

      <div col>
        <button @click="addMinorMember">
          + Add Minor Member
        </button>
      </div>

      <div align center v-for="(member, index) in minorMembers">
        <br>
        <icon small click class="red" icon="trash-alt" @click="removeMinorMember(index)"></icon>
        <input tiny v-model.number="member.quantity" placeholder="Quant">
        <input small v-model="member.minorMark" placeholder="Minor Mark">
      </div>

      <br>
      <br>

      <div around>
        <button small @click="$emit('close')">Cancel</button>
        <button small green @click="submit">Save</button>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  props: ['part'],
  data () {
    return {
      minorMembers: [],
    }
  },
  methods: {
    addMinorMember () {
      this.minorMembers.push({
        quantity: null,
        minorMark: ''
      })
    },
    removeMinorMember (index) {
      this.minorMembers.splice(index, 1)
    },
    submit () {
      this.$store.dispatch('loading')
      api.axios.put(`${api.baseUrl}/jobs/edit-members`, {
        part: this.part,
        minorMembers: this.minorMembers
      })
      .then(() => {
        this.$store.dispatch('complete')
        location.reload(true)
      })
    }
  },
  created () {
    if (this.part.minorMembers.length > 0) {
      this.minorMembers = this.part.minorMembers
    } else {
      this.minorMembers.push({
        quantity: null,
        minorMark: ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .modal-box {
    min-width: 290px;
    max-width: 500px;
    max-height: 500px;
    background-color: white;
    margin: 5px;
    overflow-y: scroll;
    h2 {
      margin: 5px 0;
    }
    input[tiny] {
      width: 50px;
    }
  }
</style>
