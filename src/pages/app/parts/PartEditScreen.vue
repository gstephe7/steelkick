<template>
  <div>

    <Screen @close="$emit('close')">

      <template #title>Edit Part</template>

      <template #actions>
        <Button text @click="$refs.form.submitForm()">
          SAVE
        </Button>
      </template>

      <template #content>
        <PartForm :edit="part" ref="form" @close="$emit('close')">
        </PartForm>
        <div class="section col">
          <Button outline delete @click="showDelete = true">
            DELETE PART
          </Button>
        </div>
      </template>

    </Screen>

    <Modal v-if="showDelete" @close="showDelete = false">
      <template #title>
        Delete Part
      </template>
      <template #content>
        Delete {{ part.minorMark }}?
      </template>
      <template #actions>
        <Button text @click="showDelete = false">
          CANCEL
        </Button>
        <Button text delete @click="deletePart">
          DELETE
        </Button>
      </template>
    </Modal>

  </div>
</template>

<script>
import api from '@/api/api'
import PartForm from './PartForm'

export default {
  props: {
    part: Object
  },
  components: {
    PartForm
  },
  data () {
    return {
      showDelete: false
    }
  },
  methods: {
    deletePart () {
      api.request({
        type: 'delete',
        endpoint: '/jobs/delete-part',
        data: {
          partId: this.part._id
        },
        res: res => {
          this.$emit('delete', this.part._id)
          this.$emit('close')
          this.$store.dispatch('snackbar', `You have successfully deleted part ${this.part.minorMark}!`)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
