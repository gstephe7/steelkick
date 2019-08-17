<template>
  <span class="col">
    <label class="file-button">
      Choose File
      <input type="file"
             :accept="accept"
             @change="processFile($event)"
             class="input-file"
      />
    </label>
    <span class="file-name">
      {{ fileName || 'No file chosen' }}
    </span>
  </span>
</template>

<script>
export default {
  props: {
    accept: Array
  },
  data () {
    return {
      fileName: ''
    }
  },
  methods: {
    processFile (event) {
      this.$emit('change', event.target.files[0])
      this.fileName = event.target.files[0].name
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .file-button {
    height: 40px;
    padding: 0 16px;
    margin: 0 8px 8px;
    font-size: 16px;
    background-color: $primary;
    border: none;
    border-radius: 4px;
    color: #fff;
    box-shadow: 0 2px 4px rgba(0,0,0,.5);
    cursor: pointer;
    transition: 250ms all;
    font-family: 'Roboto', sans-serif;
    @include align;
    @include center;

    &:hover {
      filter: brightness(1.1);
      cursor: pointer;
    }
  }

  .input-file {
    display: none;
  }

  .file-name {
    font-size: 12px;
  }
</style>
