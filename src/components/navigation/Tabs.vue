<template>
  <div class="tab-container">
    <div v-for="(tab, index) in tabs"
         class="tab"
         :class="{ currentTab : index == currentTab }"
         @click="changeTab(index)">
      {{ tab }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array
  },
  data () {
    return {
      currentTab: 0
    }
  },
  methods: {
    changeTab (index) {
      this.currentTab = index
      this.$emit('newTab', index)
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .tab-container {
    @include center;
    height: 48px;
  }

  .tab {
    @include basis;
    @include align;
    @include center;
    max-width: 300px;
    font-size: 14px;
    text-transform: uppercase;
    transition: 250ms all;
  }

  .tab:hover {
    cursor: pointer;
  }

  .currentTab {
    border-bottom: 4px solid $secondary;
    color: $secondary;
  }
</style>
