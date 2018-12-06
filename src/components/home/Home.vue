<template>
  <div>
    <QuickSearch></QuickSearch>
    <div class="info">
      <SellPreview></SellPreview>
      <BuyPreview></BuyPreview>
    </div>
    <QuickRegister></QuickRegister>
  </div>
</template>

<script>
import QuickSearch from '@/components/search/QuickSearch'
import SellPreview from '@/components/home/SellPreview'
import BuyPreview from '@/components/home/BuyPreview'
import QuickRegister from '@/components/register/QuickRegister'
import About from '@/components/home/About'

export default {
  components: {
    QuickSearch,
    SellPreview,
    BuyPreview,
    QuickRegister,
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
