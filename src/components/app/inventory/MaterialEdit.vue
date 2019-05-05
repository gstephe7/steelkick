<template>
  <div col center modal>
    <div card class="modal-box">

      <div between align>
        <h2>Edit Material</h2>
        <icon click small icon="times" @click="$emit('close')">
        </icon>
      </div>

      <hr>

      <MaterialForm btnText="Update"
                   :edit="material"
                   @close="$emit('close')">
      </MaterialForm>

    </div>
  </div>
</template>

<script>
import MaterialForm from '@/components/app/inventory/MaterialForm'

export default {
  components: {
    MaterialForm
  },
  props: ['material']
}
</script>

<style lang="scss" scoped>
  .modal-box {
    background-color: white;
    margin: 5px;
    max-height: 80%;
    overflow-y: scroll;
    h2 {
      margin: 5px 0;
    }
  }
</style>
