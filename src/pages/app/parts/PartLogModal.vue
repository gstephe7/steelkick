<template>
  <Modal @close="$emit('close')">

    <template #title>
      <span v-if="working">
        Mark {{ $store.getters.currentRole.description }}
      </span>
      <span v-else>
        Add Action to Part Log
      </span>
    </template>

    <template #content>
      <div class="col">

        <div v-if="working">
          <p>
            Mark ({{ quantity }}) {{ part.minorMark }} {{ $store.getters.currentRole.description }}
          </p>
        </div>
        <div v-else>
          <InputSelect v-model="actionIndex">
            <template #options>
              <option v-for="(item, index) in workflow" :value="index" :key="index">
                {{ item.description }}
              </option>
            </template>
          </InputSelect>
        </div>

        <InputNumber v-model.number="quantity">
        </InputNumber>

      </div>
    </template>

    <template #actions>
      <Button text @click="$emit('close')">
        CANCEL
      </Button>
      <Button text @click="submit">
        <span v-if="working">
          MARK
        </span>
        <span v-else>
          ADD
        </span>
      </Button>
    </template>

  </Modal>
</template>

<script>
export default {
  props: {
    working: Boolean,
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
      if (this.working) {
        return this.$store.getters.currentRole
      } else {
        return this.workflow[this.actionIndex]
      }
    },
    finalQuantity () {
      if (typeof this.quantity === 'number') {
        return this.quantity
      } else {
        return 1
      }
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('action', {
        job: this.part.job,
        sequence: this.part.sequence,
        part: this.part._id,
        action: this.selectedAction.action,
        description: this.selectedAction.description,
        quantity: this.finalQuantity
      })
      .then(res => {
        this.$store.dispatch('snackbar', `Marked (${res.quantity}) ${this.part.minorMark} ${res.description}`)
        this.$emit('close', res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
