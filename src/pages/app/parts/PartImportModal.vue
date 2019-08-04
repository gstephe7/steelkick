<template>
  <Modal @close="$emit('close')">

    <template #title>
      Import DXF File
    </template>

    <template #content>
      <div>
        Upload your DXF file to import parts automatically
      </div>
      <div class="space center">
        <input type="file" @change="processFile($event)"/>
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
      let formData = new FormData()
      formData.append('file', this.file)

      this.$emit('close')

      api.axios.post(`${api.baseUrl}/jobs/import-parts`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
      ).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
