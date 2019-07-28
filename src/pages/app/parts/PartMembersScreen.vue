<template>
  <div>

    <Screen @close="$emit('close')">

      <template #title>
        Part Members
      </template>

      <template #tabs>
        <Tabs :tabs="['Minor Members', 'Main Members']"
              @newTab="changeTab">
        </Tabs>
      </template>

      <template #content>

        <List>

          <template #content>

            <div v-show="currentTab == 0">
              <div v-if="minorMembers.length > 0">
                <div v-for="member in minorMembers" @click="viewPart(member.part._id)">
                  <Item clickable>
                    <template #title>
                      {{ member.minorMark }}
                    </template>
                    <template #second>
                      <span>
                        Quantity: {{ member.quantity }}
                      </span>
                    </template>
                  </Item>
                </div>
              </div>
              <div v-else>
                No minor members are associated with this part yet
              </div>
            </div>

            <div v-show="currentTab == 1">
              <div v-if="mainMembers.length > 0">
                <div v-for="member in updatedMainMembers" @click="viewPart(member._id)">
                  <Item clickable>
                    <template #title>
                      {{ member.minorMark }}
                    </template>
                    <template #second>
                      Quantity: {{ member.quantity }}
                    </template>
                  </Item>
                </div>
              </div>
              <div v-else>
                No main members are associated with this part yet
              </div>
            </div>

          </template>

        </List>

      </template>

    </Screen>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  props: {
    part: Object
  },
  data () {
    return {
      currentTab: 0,
      minorMembers: [],
      mainMembers: []
    }
  },
  computed: {
    updatedMainMembers () {
      const members = this.mainMembers.map(item => {
        const quantRequired = item.minorMembers.reduce((quant, value) => {
          if (value.minorMark === this.part.minorMark) {
            quant = value.quantity
          }
          return quant
        }, 0)
        item.quantNeeded = quantRequired
        return item
      })
      return members
    }
  },
  methods: {
    changeTab (payload) {
      this.currentTab = payload
    },
    viewPart (id) {
      this.$emit('close')
      const element = document.getElementById(id)
      this.$router.push('/parts')
      element.scrollIntoView()
      window.scrollBy(0, -56)
      element.click()
    }
  },
  created () {
    api.request({
      type: 'get',
      endpoint: `/jobs/part/${this.part._id}/members`,
      load: true,
      res: res => {
        this.minorMembers = res.data.minorMembers
        this.mainMembers = res.data.mainMembers
      }
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
