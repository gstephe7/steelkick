<template>
  <div>

    <span click @click="$router.back()">
      &lt; <slot></slot>
    </span>

  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
  span {
    color: royalblue;
    text-decoration: underline;
  }
</style>
