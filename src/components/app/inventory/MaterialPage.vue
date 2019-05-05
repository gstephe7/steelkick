<template>
  <div main v-if="loaded">

    <Back route="Inventory">Back to inventory</Back>

    <br>

    <div col class="title">
      <h1>
        {{ material.shape }} {{ material.dimension }}
      </h1>
      <h2>
        <span v-if="feet">{{ feet }}' </span>
        <span v-if="inches">{{ inches }}" </span>
        <span v-else>0" </span>
        <span v-if="fraction">{{ fraction }}</span>
      </h2>
    </div>

    <hr>

    <div wrap>

      <!-- Material Specs -->
      <section grow box card>
        <div between align>
          <h2>Material</h2>
          <icon small click icon="edit" class="blue" @click="editing = !editing">
          </icon>
        </div>
        <hr>
        <dl>
          <div row>
            <dt>Shape:</dt>
            <dd>{{ material.shape }}</dd>
          </div>
          <div row>
            <dt>Dimension</dt>
            <dd>{{ material.dimension }}</dd>
          </div>
          <div row>
            <dt>Quantity:</dt>
            <dd>{{ material.quantity }}</dd>
          </div>
          <div row>
            <dt>Length:</dt>
            <dd>
              <span v-if="feet">{{ feet }}' </span>
              <span v-if="inches">{{ inches }}" </span>
              <span v-else>0"</span>
              <span v-if="fraction">{{ fraction }}</span>
            </dd>
          </div>
          <div row>
            <dt>Origin:</dt>
            <dd>
              <span v-if="material.domestic">Domestic</span>
              <span v-else>Foreign</span>
            </dd>
          </div>
          <div row>
            <dt>Condition:</dt>
            <dd>{{ material.condition }}</dd>
          </div>
          <div row>
            <dt>Location:</dt>
            <dd>{{ material.location }}</dd>
          </div>
          <div row>
            <dt>Weight:</dt>
            <dd grow>{{ weight.toFixed(0) }} lbs (per unit)</dd>
          </div>
          <div row>
            <dt>Remarks:</dt>
            <dd col start>
              <span v-if="material.galvanized">Galv.</span>
              <span v-if="material.primed">Prime</span>
              <div v-if="material.remarks">
                {{ material.remarks }}
              </div>
            </dd>
          </div>
        </dl>
        <MaterialEdit v-if="editing" :material="material" @close="editing = false"></MaterialEdit>
      </section>

      <!-- Actions -->
      <section grow box card>
        <div between align>
          <h2>Action Feed</h2>
        </div>
        <hr>
        <Action v-for="action in actions"
                :key="action._id"
                :action="action"
                :material="material">
        </Action>
      </section>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import method from '@/global/methods'
import MaterialEdit from './MaterialEdit'
import Action from '@/components/app/actions/Action'

export default {
  components: {
    MaterialEdit,
    Action
  },
  data () {
    return {
      material: {},
      actions: [],
      loaded: false,
      editing: false,
    }
  },
  computed: {
    feet () {
      return method.getFeet(this.material.length)
    },
    inches () {
      return method.getInches(this.material.length)
    },
    fraction () {
      return method.getFraction(this.material.length)
    },
    weight () {
      let lengthInFeet = parseFloat(this.material.length / 12)
      return parseFloat(this.material.weightPerFoot) * lengthInFeet
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/material/item`, {
      params: {
        materialId: this.$route.query.materialId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.material = res.data.material
      this.loaded = true
    })
  },
  created () {
    api.axios.get(`${api.baseUrl}/actions/material-actions`, {
      params: {
        materialId: this.$route.query.materialId
      }
    })
    .then(res => {
      this.actions = res.data.actions.reverse()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  .title {
    h1, h2, h3 {
      margin: 0;
    }
  }

  dd {
    flex: 1;
  }
</style>
