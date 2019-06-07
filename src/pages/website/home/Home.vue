<template>
  <div>
    <QuickSearch></QuickSearch>
    <div class="around wrap">
      <section>
        <SellPreview></SellPreview>
      </section>
      <section>
        <BuyPreview></BuyPreview>
      </section>
    </div>
    <div class="around">
      <section>
        <div class="container col">
          <h2>Create Your Free Account</h2>
          <CreateAccount></CreateAccount>
        </div>
      </section>
    </div>
    <div class="spacer">

    </div>
  </div>
</template>

<script>
import QuickSearch from '@/pages/app/search/QuickSearch'
import SellPreview from '@/pages/website/home/SellPreview'
import BuyPreview from '@/pages/website/home/BuyPreview'
import CreateAccount from '@/pages/website/createAccount/CreateAccount'

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

  .spacer {
    height: 200px;
  }
</style>
