<template>
  <div align center modal>
    <div col center card class="modal-box">

      <icon big class="green" icon="check-circle"></icon>

      <p v-if="$store.getters.success.msg">
        {{ $store.getters.success.msg }}
      </p>
      <p v-else>
        Success!
      </p>

    </div>
  </div>
</template>

<script>

export default {
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .modal-box {
    width: 300px;
    height: 300px;
    background-color: white;
    margin: 5px;
  }
</style>
