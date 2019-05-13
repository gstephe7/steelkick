<template>
  <div col center backdrop>
    <div card class="modal-box">

      <div between align>
        <h2>Edit Part</h2>
        <icon click small icon="times" @click="$emit('close')">
        </icon>
      </div>

      <hr>

      <PartForm :edit="part" @close="$emit('close')"></PartForm>

    </div>
  </div>
</template>

<script>
import PartForm from './PartForm'

export default {
  components: { PartForm },
  props: ['part']
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .modal-box {
    background-color: white;
    margin: 5px;
    h2 {
      margin: 5px 0;
    }
  }
</style>
