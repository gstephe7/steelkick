<template>
  <Modal @close="$emit('close')">

    <template #title>
      Add Action to Part Log
    </template>

    <template #content>
      <Form ref="form" @submitForm="submit">
        <template #content>
          <div class="col">

            <InputSelect v-model="actionIndex" required>
              <template #options>
                <option v-for="(item, index) in workflow" :value="index" :key="index">
                  {{ item.description }}
                </option>
              </template>
            </InputSelect>

            <InputNumber v-model.number="quantity" required>
            </InputNumber>

          </div>
        </template>
      </Form>
    </template>

    <template #actions>
      <Button text @click="$emit('close')">
        CANCEL
      </Button>
      <Button text @click="submitForm">
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
      actionIndex: this.workflow.length - 1,
      quantity: 1
    }
  },
  computed: {
    selectedAction () {
      return this.workflow[this.actionIndex]
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.submit()
    },
    submit () {
      this.$store.dispatch('action', {
        job: this.part.job,
        sequence: this.part.sequence,
        part: this.part._id,
        action: this.selectedAction.action,
        description: this.selectedAction.description,
        quantity: this.quantity
      })
      .then(res => {
        this.$emit('close', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
