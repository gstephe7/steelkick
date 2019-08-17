<template>
  <Form ref="import">

    <template #title>
      Import DXF File
    </template>

    <template #content>
      <div class="space col">
        <InputFile :accept="['.dxf']"
                   @change="updateFile">
        </InputFile>
      </div>
    </template>

  </Form>
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
    updateFile (payload) {
      this.file = payload
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
        this.$emit('close', res.data.parts)
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
