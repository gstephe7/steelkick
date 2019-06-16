<template>
  <span class="chip"
        :class="{ clickable : clickable }"
        @click="$emit('click')">
    <span v-if="$slots.thumbnail" class="thumbnail">
      <slot name="thumbnail"></slot>
    </span>
    <span class="content">
      <slot name="content"></slot>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    clickable: Boolean
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .chip {
    @include align;
    position: relative;
    height: 32px;
    margin: 0;
    padding: 0;
    border-radius: 16px;
    font-size: 14px;
    background-color: $accent;
    transition: 250ms all;
  }

  .clickable:hover {
    cursor: pointer;
    filter: brightness(1.1);
  }

  .thumbnail {
    @include col;
    margin-left: 4px;
    height: 24px;
    width: 24px;
    border-radius: 50%;
    background-color: #fff;
    img {
      width: 100%;
      height: 100%;
    }
  }

  .content {
    margin: 0 8px;
  }
</style>
