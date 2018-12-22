<template>
  <div id="inventory">

    <MaterialListings inventory="true"
                      :listings="material">
    </MaterialListings>

  </div>
</template>

<script>
import MaterialListings from '@/components/material/MaterialListings'

export default {
  components: {
    MaterialListings
  },
  data () {
    return {
      material: [
        {
          id: '3251',
          shape: 'w',
          dimension: '8x10',
          feet: 8,
          inches: 7,
          numerator: 5,
          denominator: 16,
          quantity: 1,
          painted: false,
          galvanized: false,
          location: 'D',
          domestic: true,
          condition: 'Good',
          grade: 'A992',
          heat: '271622018',
          forSale: true,
          cwt: 42,
          remarks: ''
        },
        {
          id: '3252',
          shape: 'w',
          dimension: '16x26',
          feet: 13,
          inches: 11,
          numerator: 15,
          denominator: 16,
          quantity: 2,
          painted: false,
          galvanized: false,
          location: 'E',
          domestic: true,
          condition: 'Fair',
          grade: 'A992',
          heat: '271622018',
          forSale: true,
          cwt: 45,
          remarks: ''
        },
        {
          id: '3253',
          shape: 'hss',
          dimension: '4x4x1/4',
          feet: 7,
          inches: 6,
          numerator: 1,
          denominator: 8,
          quantity: 4,
          painted: false,
          galvanized: false,
          location: 'F',
          domestic: true,
          condition: 'Good',
          grade: 'A500',
          heat: '271622018',
          forSale: true,
          cwt: 48,
          remarks: ''
        },
        {
          id: '3255',
          shape: 'hss',
          dimension: '3 1/2 x 3 1/2 x 5/16',
          feet: 11,
          inches: 2,
          numerator: 1,
          denominator: 2,
          quantity: 1,
          painted: true,
          galvanized: false,
          location: 'D',
          domestic: true,
          condition: 'Good',
          grade: 'A500',
          heat: '271622018',
          forSale: false,
          cwt: 42,
          remarks: ''
        },
        {
          id: '3256',
          shape: 'l',
          dimension: '3x3x1/4',
          feet: 20,
          inches: null,
          numerator: null,
          denominator: null,
          quantity: 12,
          painted: true,
          galvanized: false,
          location: 'A',
          domestic: true,
          condition: 'Fair',
          grade: 'A36',
          heat: '271622018',
          forSale: true,
          cwt: 39,
          remarks: ''
        },
        {
          id: '3257',
          shape: 'l',
          dimension: '6x6x3/8',
          feet: 10,
          inches: null,
          numerator: null,
          denominator: null,
          quantity: 5,
          painted: false,
          galvanized: true,
          location: 'A',
          domestic: true,
          condition: 'Excellent',
          grade: 'A36',
          heat: '271622018',
          forSale: true,
          cwt: 50,
          remarks: ''
        },
        {
          id: '3258',
          shape: 'c',
          dimension: '4x5.4',
          feet: 6,
          inches: 4,
          numerator: null,
          denominator: null,
          quantity: 4,
          painted: false,
          galvanized: false,
          location: 'C',
          domestic: true,
          condition: 'Poor',
          grade: 'A36',
          heat: '271622018',
          forSale: true,
          cwt: 35,
          remarks: ''
        },
        {
          id: '3259',
          shape: 'c',
          dimension: '12x20.7',
          feet: 15,
          inches: 10,
          numerator: 1,
          denominator: 16,
          quantity: 3,
          painted: false,
          galvanized: false,
          location: 'C',
          domestic: true,
          condition: 'Good',
          grade: 'A36',
          heat: '271622018',
          forSale: true,
          cwt: 41,
          remarks: 'Holes in left side'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';
</style>
