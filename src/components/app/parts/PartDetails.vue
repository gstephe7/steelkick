<template>
  <div main v-if="loaded">

    <Back route="Parts">Back to parts</Back>

    <br>

    <div col class="title">
      <h1>
        <span v-if="part.minorMark">{{ part.minorMark }}</span>
        <span v-else>{{ part.pieceMark }}</span>
      </h1>
      <h2>
        {{ part.job.name }}
      </h2>
      <h3>
        Sequence {{ part.sequence.number }}
      </h3>
    </div>

    <hr>

    <div wrap>

      <!-- Part Specs -->
      <section grow box card>
        <div between align>
          <h2>Part</h2>
          <icon small click icon="edit" class="blue" @click="editingPart = !editingPart">
          </icon>
        </div>
        <hr>
        <dl>
          <div row>
            <dt>Piece Mark:</dt>
            <dd>{{ part.pieceMark }}</dd>
          </div>
          <div row>
            <dt>Minor Mark:</dt>
            <dd>{{ part.minorMark }}</dd>
          </div>
          <div row>
            <dt>Quantity:</dt>
            <dd>{{ part.quantity }}</dd>
          </div>
          <div row>
            <dt>Material:</dt>
            <dd>{{ part.shape }} {{ part.dimension }}</dd>
          </div>
          <div row>
            <dt>Length:</dt>
            <dd>{{ feet }}' {{ inches }}" <span v-if="fraction">{{ fraction }}</span></dd>
          </div>
          <div row>
            <dt>Weight:</dt>
            <dd grow>{{ part.weight.toFixed(0) }} lbs (per unit)</dd>
          </div>
          <div row>
            <dt>Remarks:</dt>
            <dd col start>
              <span v-if="part.galvanized">Galv.</span>
              <span v-if="part.primed">Prime</span>
            </dd>
          </div>
        </dl>
        <EditPart v-if="editingPart" :part="part" @close="editingPart = false"></EditPart>
      </section>

      <!-- Minor Members -->
      <section grow box card>
        <div between align>
          <h2>Minor Members</h2>
          <icon click small icon="edit" class="blue" @click="editingMembers = !editingMembers">
          </icon>
        </div>
        <hr>
        <div v-if="part.minorMembers.length > 0">
          <div row click v-for="member in part.minorMembers" @click="viewMinorMember(member.part)" class="minor-member">
            <span>
              ({{ member.quantity }})
            </span>
            &nbsp;
            <span>
              {{ member.minorMark }}
            </span>
          </div>
        </div>
        <div v-else>
          <p>None associated with this part</p>
        </div>
        <br>
        <EditMembers v-if="editingMembers" :part="part" @close="editingMembers = false">
        </EditMembers>
      </section>

    </div>

    <!-- Progress -->
    <div row>
      <section grow card>
        <div between align>
          <h2>Part Progress</h2>
          <icon click small icon="edit" class="blue" @click="editingProgress = !editingProgress">
          </icon>
        </div>
        <hr>
        <div wrap center>
          <PartProgress v-for="action in progress"
                        :key="action.action"
                        :action="action"
                        :details="true">
          </PartProgress>
        </div>
      </section>
      <EditProgress v-if="editingProgress" :progress="progress" :part="part" @close="editingProgress = false">
      </EditProgress>
    </div>

    <!-- Actions -->
    <div row>
      <section grow card>
        <h2>Action Feed</h2>
        <hr>
        <Action v-for="action in actions"
                :key="action._id"
                :action="action"
                :part="part">
        </Action>
      </section>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'
import method from '@/global/methods'
import PartProgress from './PartProgress'
import EditPart from './EditPart'
import EditMembers from './EditMembers'
import EditProgress from './EditProgress'
import Action from '@/components/app/actions/Action'

export default {
  components: {
    PartProgress,
    EditPart,
    EditMembers,
    EditProgress,
    Action
  },
  data () {
    return {
      part: {},
      workflow: [],
      actions: [],
      loaded: false,
      editingPart: false,
      editingMembers: false,
      editingProgress: false
    }
  },
  computed: {
    feet () {
      return method.getFeet(this.part.length)
    },
    inches () {
      return method.getInches(this.part.length)
    },
    fraction () {
      return method.getFraction(this.part.length)
    },
    progress () {
      let progress = this.workflow
      progress.forEach(item => {
        item.total = this.part.quantity
        item.completed = 0
      })
      if (this.part.progress) {
        this.part.progress.forEach(item => {
          progress.forEach(value => {
            if (item.description == value.description) {
              value.completed += item.quantity
            }
          })
        })
      }
      return progress
    }
  },
  beforeCreate () {
    this.$store.dispatch('loading')
    api.axios.get(`${api.baseUrl}/jobs/part-details`, {
      params: {
        partId: this.$route.query.partId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.part = res.data.part
      this.loaded = true
    })
  },
  created () {
    api.axios.get(`${api.baseUrl}/users/workflow`, {
      params: {
        companyId: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.workflow = res.data.workflow
    })

    api.axios.get(`${api.baseUrl}/actions/part-actions`, {
      params: {
        partId: this.$route.query.partId
      }
    })
    .then(res => {
      this.actions = res.data.actions.reverse()
    })
  },
  methods: {
    viewMinorMember (id) {
      this.$router.push({
        name: 'PartDetails',
        query: {
          partId: id
        }
      })
      location.reload(true)
    }
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

  .minor-member {
    color: royalblue;
  }
</style>
