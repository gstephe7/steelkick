<template>
  <Screen @close="$emit('close')">

    <template #title>Add Parts</template>

    <template #tabs>
      <Tabs :tabs="tabs" @newTab="changeTab">
      </Tabs>
    </template>

    <template #actions>
      <span v-if="currentTab === 0">
        <Button text @click="$refs.form.submitForm()">
          SAVE
        </Button>
      </span>
      <span v-else>
        <Button text @click="$refs.import.submit()">
          SAVE
        </Button>
      </span>
    </template>

    <template #content>

      <div v-show="currentTab === 0">
        <PartForm ref="form" @close="updateParts">
        </PartForm>
      </div>

      <div v-show="currentTab === 1">
        <PartImportTab ref="import" @close="updateParts">
        </PartImportTab>
      </div>

    </template>

  </Screen>
</template>

<script>
import PartForm from './PartForm'
import PartImportTab from './PartImportTab'

export default {
  components: {
    PartForm,
    PartImportTab
  },
  data () {
    return {
      tabs: ['Create Part', 'Import File'],
      currentTab: 0
    }
  },
  methods: {
    updateParts (payload) {
      this.$emit('close', payload)
    },
    changeTab (payload) {
      this.currentTab = payload
    }
  }
}
</script>

<style lang="css" scoped>
</style>
