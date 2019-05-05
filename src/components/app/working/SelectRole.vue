<template>
  <div align center modal>
    <div basis card class="modal-box">

      <div between align>
        <Back route="Dashboard">Back</Back>
        <icon small click icon="times" @click="$emit('close')"></icon>
      </div>

      <div col>
        <h2>What are you doing?</h2>
      </div>

      <div>
        <div between align card click v-for="action in actions" :key="action.description" @click="selectRole(action)">
          <img :src="require(`@/assets/img/actions/${action.description}.png`)">
          <h3>{{ action.action }}</h3>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      actions: []
    }
  },
  methods: {
    selectRole (action) {
      this.$store.dispatch('updateCurrentRole', {
        action: action.action,
        description: action.description
      })
      this.$emit('close')
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/users/workflow`, {
      params: {
        companyId: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.actions = res.data.workflow
    })
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
    overflow-y: scroll;
    h2 {
      font-weight: bold;
    }
    img {
      height: 40px;
    }
  }
</style>
