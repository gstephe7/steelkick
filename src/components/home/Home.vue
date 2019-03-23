<template>
  <div>
    <QuickSearch></QuickSearch>
    <div around wrap>
      <section>
        <SellPreview></SellPreview>
      </section>
      <section>
        <BuyPreview></BuyPreview>
      </section>
    </div>
    <div around wrap>
      <section>
        <h2>Create Your Free Account</h2>
        <CreateAccount></CreateAccount>
      </section>
    </div>
  </div>
</template>

<script>
import QuickSearch from '@/components/search/QuickSearch'
import SellPreview from '@/components/home/SellPreview'
import BuyPreview from '@/components/home/BuyPreview'
import CreateAccount from '@/components/createAccount/CreateAccount'

export default {
  components: {
    QuickSearch,
    SellPreview,
    BuyPreview,
    CreateAccount
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/structure.scss';

  section {
    max-width: 400px;
    min-width: 290px;
  }
</style>
