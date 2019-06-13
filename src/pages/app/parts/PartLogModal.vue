<template>
  <Modal @close="$emit('close')">

    <template #title>
      Add Action to Part Log
    </template>

    <template #content>
      <div class="col">

        <InputSelect v-model="action" @input="viewAction">
          <template #label>Action</template>
          <template #options>
            <option v-for="item in workflow" :value="item" :key="item.description">
              {{ item.description }}
            </option>
          </template>
        </InputSelect>

        <InputNumber v-model="quantity">
        </InputNumber>

      </div>
    </template>

    <template #actions>
      <Button text @click="$emit('close')">
        CANCEL
      </Button>
      <Button text @click="submit">
        ADD
      </Button>
    </template>

  </Modal>
</template>

<script>
export default {
  props: {
    part: Object,
    workflow: Array
  },
  data () {
    return {
      action: {},
      quantity: 1
    }
  },
  methods: {
    viewAction () {
      console.log(this.action)
    },
    submit () {
      this.$store.dispatch('action', {
        job: this.part.job,
        sequence: this.part.sequence,
        part: this.part._id,
        action: this.action.action,
        description: this.action.description,
        quantity: this.quantity
      })
      .then(() => {
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
