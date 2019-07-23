<template>
  <Screen @close="$emit('close')">

    <template #title>
      Set Inventory Prices
    </template>

    <template #actions>
      <Button text @click="submit">
        SAVE
      </Button>
    </template>

    <template #content>
      <div class="article">
        <div v-for="shape in prices" :key="shape.shape">
          <Card>
            <template #title>
              {{ shape.shape }} Cwt Prices
            </template>
            <template #actions>
              <div class="center">
                <InputCurrency v-model="shape.standard">
                  Standard
                </InputCurrency>
                <InputCurrency v-model="shape.galvanized">
                  Galv.
                </InputCurrency>
                <InputCurrency v-model="shape.primed">
                  Primed
                </InputCurrency>
              </div>
            </template>
          </Card>
        </div>
      </div>
    </template>

  </Screen>
</template>

<script>
import api from '@/api/api'
import material from '@/assets/data/material.js'

export default {
  data () {
    return {
      prices: []
    }
  },
  methods: {
    submit () {
      api.request({
        type: 'put',
        endpoint: '/material/set-prices',
        load: true,
        data: {
          companyId: this.$store.getters.companyId,
          prices: this.prices
        },
        res: res => {
          this.$store.dispatch('snackbar', 'Successfully updated inventory prices!')
          this.$router.push('dashboard')
          setTimeout(() => {
            this.$router.push('settings')
          }, 10)
        }
      })
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: '/material/get-prices',
      load: true,
      data: {
        companyId: this.$store.getters.companyId
      },
      res: res => {
        const prices = res.data.prices || []
        material.forEach(item => {
          const shapePrice = prices.filter(value => {
            return value.shape === item.shape
          })
          if (shapePrice.length > 0) {
            this.prices.push(shapePrice[0])
          } else {
            this.prices.push({
              shape: item.shape,
              standard: null,
              galvanized: null,
              primed: null
            })
          }
        })
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
