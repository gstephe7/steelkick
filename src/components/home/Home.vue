<template>
  <div>
    <QuickSearch></QuickSearch>
    <div class="info">
      <SellPreview></SellPreview>
      <About></About>
    </div>
  </div>
</template>

<script>
import QuickSearch from '@/components/search/QuickSearch'
import SellPreview from '@/components/home/SellPreview'
import About from '@/components/home/About'

export default {
  components: {
    QuickSearch,
    SellPreview,
    About
  }
}
</script>

<style lang="scss">
  @import '@/assets/scss/variables.scss';

  .info {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
  }
</style>
