<template>
  <div id="edit-profile">

    <div class="container">

      <h3>Edit Profile</h3>

      <hr>

      <EditUser v-if="user.editing"
                :user="user"
                @close="user.editing = false">
      </EditUser>

      <ViewUser v-else
                :user="user"
                @editing="user.editing = true">
      </ViewUser>

    </div>

    <div class="container" v-if="$store.getters.isAdmin" id="edit-company">

      <h3>Edit Company</h3>

      <hr>

      <EditCompany v-if="company.editing"
                   :company="company"
                   :addressInvalid="addressInvalid"
                   :newAccount="newAccount"
                   @close="completeEditing">
      </EditCompany>

      <ViewCompany v-else
                   :company="company"
                   @editing="company.editing = true">
      </ViewCompany>

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
      user: {
        id: null,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        editing: false
      },
      company: {
        name: '',
        street: '',
        city: '',
        state: '',
        zipcode: '',
        contactName: '',
        contactPhone: '',
        contactEmail: '',
        editing: false,
        delivery: {
          offered: null,
          price: null,
          maxDistance: null,
          maxLength: null,
          maxWeight: null
        },
        cut: {
          offered: null,
          price: null
        },
        hours: {
          monday: {
            start: '',
            end: ''
          },
          tuesday: {
            start: '',
            end: ''
          },
          wednesday: {
            start: '',
            end: ''
          },
          thursday: {
            start: '',
            end: ''
          },
          friday: {
            start: '',
            end: ''
          },
          saturday: {
            start: '',
            end: ''
          },
          sunday: {
            start: '',
            end: ''
          }
        },
        remarks: ''
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
      this.user.id = res.data.user._id
      this.user.email = res.data.user.email
      this.user.firstName = res.data.user.firstName
      this.user.lastName = res.data.user.lastName
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
      const co = res.data.company
      this.company.name = co.name
      this.company.street = co.street
      this.company.city = co.city
      this.company.state = co.state
      this.company.zipcode = co.zipcode
      this.company.contactName = co.contactName
      this.company.contactPhone = co.phone
      this.company.contactEmail = co.email
      this.company.remarks = co.remarks
      if (co.delivery) {
        this.company.delivery = co.delivery
      }
      if (co.cut) {
        this.company.cut = co.cut
      }
      if (co.hours) {
        this.company.hours = co.hours
      }
    })
    .catch(() => {
      this.$store.dispatch('complete')
    })

    if (this.$route.query.addressInvalid) {
      this.addressInvalid = true
      this.company.editing = true
    }

    if (this.$route.query.newAccount) {
      this.company.editing = true
      this.newAccount = true
    }

  },
  methods: {
    completeEditing () {
      this.company.editing = false
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
