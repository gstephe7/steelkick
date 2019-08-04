<template>
  <Modal @close="$emit('close')">

    <template #title>
      Import DXF File
    </template>

    <template #content>
      <div>
        Upload your DXF file to import parts automatically
      </div>
      <div class="space col">
        <input type="file" accept=".dxf" @change="processFile($event)"/>
      </div>
    </template>

    <template #actions>
      <Button text @click="$emit('close')">
        CANCEL
      </Button>
      <Button text @click="submit">
        UPLOAD
      </Button>
    </template>

  </Modal>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      file: ''
    }
  },
  methods: {
    processFile (event) {
      this.file = event.target.files[0]
    },
    submit () {
      this.$store.dispatch('loading')
      let formData = new FormData()
      formData.append('file', this.file)
      formData.append('jobId', this.$store.getters.currentJob._id)

      api.axios.post(`${api.baseUrl}/jobs/import-parts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        this.$store.dispatch('complete')
        if (res.data.parts.length > 0) {
          this.$store.dispatch('snackbar', 'Successfully imported parts from file!')
        } else {
          this.$store.dispatch('snackbarError', 'Failed to import parts from file')
        }
        this.$emit('newParts', res.data.parts)
        this.$emit('close')
      }).catch(err => {
        this.$store.dispatch('complete')
        this.$store.dispatch('snackbarError', 'Failed to import parts from file')
        this.$emit('close')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
