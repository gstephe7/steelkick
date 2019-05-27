<template>
  <div class="main">
    <SelectRole v-if="select.role" @close="nextOption">
    </SelectRole>
    <SelectJob v-if="select.job" @close="nextOption">
    </SelectJob>
    <UpdatePart v-if="displayPart"
                :part="part"
                :action="$store.getters.currentRole"
                @close="displayPart = false">
    </UpdatePart>

    <div v-if="loaded">

      <div between>
        <span click @click="select.role = true">
          Change Role
        </span>
        <span click @click="select.job = true">
          Change Job
        </span>
      </div>

      <br>

      <div col>
        <img :src="require(`@/assets/img/actions/${$store.getters.currentRole.description}.png`)">
        <h1>
          {{ $store.getters.currentRole.action }}
        </h1>
        <h2>
          {{ $store.getters.currentJob.name }}
        </h2>
      </div>

      <hr>

      <PartList :working="true"
             :job="$store.getters.currentJob._id"
             @updatePart="displayUpdate($event)">
      </PartList>

    </div>

  </div>
</template>

<script>
import SelectRole from './SelectRole'
import SelectJob from './SelectJob'
import PartList from '@/components/app/parts/PartList'
import UpdatePart from './UpdatePart'

export default {
  components: {
    SelectRole,
    SelectJob,
    PartList,
    UpdatePart
  },
  data () {
    return {
      part: null,
      select: {
        role: false,
        job: false
      },
      displayPart: false
    }
  },
  computed: {
    loaded () {
      if (this.$store.getters.currentJob && this.$store.getters.currentRole) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    nextOption () {
      this.select.role = false
      this.select.job = false
      if (!this.$store.getters.currentRole) {
        this.select.role = true
      } else if (!this.$store.getters.currentJob) {
        this.select.job = true
      }
    },
    displayUpdate (part) {
      this.part = part
      this.displayPart = true
    }
  },
  created () {
    this.nextOption()
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  [main] {
    max-width: 1200px;
  }

  h1 {
    margin-top: 0;
    margin-bottom: 0;
  }

  h2 {
    margin-top: 0;
  }

  span[click] {
    color: royalblue;
    text-decoration: underline;
  }

  img {
    width: 40px;
  }
</style>
