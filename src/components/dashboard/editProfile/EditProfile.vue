<template>
  <div id="edit-profile">

    <div class="container">

      <h3>Edit Profile</h3>

      <hr>

      <div v-if="loaded.user">
        <EditUser v-if="editing.user"
                  :user="user"
                  @close="editing.user = false">
        </EditUser>

        <ViewUser v-else
                  :user="user"
                  @editing="editing.user = true">
        </ViewUser>
      </div>

    </div>

    <div class="container" v-if="$store.getters.isAdmin" id="edit-company">

      <h3>Edit Company</h3>

      <hr>

      <div v-if="loaded.company">
        <EditCompany v-if="editing.company"
                     :company="company"
                     :addressInvalid="addressInvalid"
                     :newAccount="newAccount"
                     @close="completeEditing">
        </EditCompany>

        <ViewCompany v-else
                     :company="company"
                     @editing="editing.company = true">
        </ViewCompany>
      </div>

    </div>

  </div>
</template>

<script>
import ViewCompany from './ViewCompany'
import EditCompany from './EditCompany'
import ViewUser from './ViewUser'
import EditUser from './EditUser'
import api from '@/api/api'

export default {
  components: {
    ViewCompany,
    EditCompany,
    ViewUser,
    EditUser
  },
  data () {
    return {
      user: {},
      company: {},
      editing: {
        company: false,
        user: false
      },
      loaded: {
        company: false,
        user: false
      },
      addressInvalid: false,
      newAccount: false
    }
  },
  created () {

    this.$store.dispatch('loading')
    // retrieve user profile
    api.axios.get(`${api.baseUrl}/users/user`, {
      params: {
        id: this.$store.getters.userId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.user = res.data.user
      this.loaded.user = true
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })

    // retrieve company profile
    api.axios.get(`${api.baseUrl}/users/company`, {
      params: {
        id: this.$store.getters.companyId
      }
    })
    .then(res => {
      this.$store.dispatch('complete')
      this.company = res.data.company
      this.loaded.company = true
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })

    if (this.$route.query.addressInvalid) {
      this.addressInvalid = true
      this.editing.company = true
    }

    if (this.$route.query.newAccount) {
      this.editing.company = true
      this.newAccount = true
    }

  },
  mounted () {
    setTimeout(() => {
      if (this.addressInvalid) {
        document.getElementById('edit-company').scrollIntoView()
      }

      if (this.newAccount) {
        document.getElementById('edit-company').scrollIntoView()
      }
    }, 750)
  },
  methods: {
    completeEditing () {
      this.editing.company = false
      this.addressInvalid = false
      this.newAccount = false
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #edit-profile {
    max-width: 600px;
    margin: auto;
    padding: 10px;
  }

  .container {
    margin-bottom: 50px;
  }

  .button-div {
    display: flex;
    justify-content: space-around;
  }

  .input {
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin: 5px 0;
  }

  input {
    border: 1px solid $accent;
    width: 175px;
  }

  select {
    border: 1px solid $accent;
    width: 197px;
  }

  .sub {
    margin: 25px 0 25px 10%;
    input {
      width: 60px;
    }
    select {
      width: 80px;
    }
    textarea {
      width: 90%;
      height: 150px;
    }
    div {
      flex: 1;
    }
    p {
      margin: 0;
    }
    .hours {
      min-width: 180px;
    }
  }

  .address {
    outline: thin solid $alert;
  }

  .address-text {
    color: $alert;
  }
</style>
