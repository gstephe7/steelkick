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
      <section col>
        <h2>Create Your Free Account</h2>
        <CreateAccount></CreateAccount>
      </section>
    </div>
  </div>
</template>

<script>
import QuickSearch from '@/components/app/search/QuickSearch'
import SellPreview from '@/components/website/home/SellPreview'
import BuyPreview from '@/components/website/home/BuyPreview'
import CreateAccount from '@/components/website/createAccount/CreateAccount'

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

  section {
    max-width: 400px;
    min-width: 290px;
  }
</style>
