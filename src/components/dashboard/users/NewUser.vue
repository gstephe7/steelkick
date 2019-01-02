<template>
  <div id="new-user">

    <h3>Add New User</h3>

    <div class="form">

      <input v-model="firstName" placeholder="First Name" :class="{ required : errors.firstName }">

      <input v-model="lastName" placeholder="Last Name" :class="{ required : errors.lastName }">

      <input v-model="email" placeholder="Email" :class="{ required : errors.email }">

      <input v-model="password" placeholder="Password" type="password" :class="{ required : errors.password }">

      <select v-model="admin" :class="{ required : errors.admin }">
        <option :value="null" selected disabled>Admin?</option>
        <option :value="false">No</option>
        <option :value="true">Yes</option>
      </select>

      <div class="buttons">
        <button @click="cancel">Cancel</button>
        <button @click="submit" class="success">Add User</button>
      </div>

      <div class="errors">
        <p v-if="errors.firstName">
          Please enter a first name
        </p>
        <p v-if="errors.lastName">
          Please enter a last name
        </p>
        <p v-if="errors.email">
          Please enter a valid email
        </p>
        <p v-if="errors.password">
          Password must be at least 7 characters
        </p>
        <p v-if="errors.admin">
          Please state whether user is admin or not
        </p>
      </div>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      admin: null,
      errors: {
        firstName: false,
        lastName: false,
        email: false,
        password: false,
        admin: false
      },
      verified: false
    }
  },
  methods: {
    checkForm () {

      if (!this.firstName) {
        this.errors.firstName = true
      } else {
        this.errors.firstName = false
      }

      if (!this.lastName) {
        this.errors.lastName = true
      } else {
        this.errors.lastName = false
      }

      if (this.email.includes('@') && this.email.includes('.')) {
        this.errors.email = false
      } else {
        this.errors.email = true
      }

      if (this.password.length < 7) {
        this.errors.password = true
      } else {
        this.errors.password = false
      }

      if (this.admin === null) {
        this.errors.admin = true
      } else {
        this.errors.admin = false
      }

      if (!this.errors.firstName && !this.errors.lastName && !this.errors.email && !this.errors.password && !this.errors.admin) {
        this.verified = true
      }
    },
    submit () {
      this.checkForm()

      if (this.verified) {
        api.axios.post(`${api.baseUrl}/users/new-user`, {
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          password: this.password,
          admin: this.admin,
          company: this.$store.getters.companyName
        })
        .then(res => {
          this.$router.push('new-user-confirmed')
        })
        .catch(err => {
          console.log(err)
        })
      }
    },
    cancel () {
      this.$router.push('manage-users')
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #new-user {
    max-width: 800px;
    margin: auto;
    padding: 10px;
  }

  h3 {
    text-align: center;
  }

  .form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 50px;
  }

  input {
    border: 1px solid $accent;
    margin: 10px;
    width: 200px;
  }

  select {
    border: 1px solid $accent;
    margin: 10px;
    width: 222px;
  }

  .buttons {
    display: flex;
    justify-content: space-around;
    margin-top: 25px;
  }

  button {
    width: 125px;
  }

  .success {
    background-color: $success;
  }

  .required {
    outline: 1px solid $alert;
  }

  .errors {
    text-align: center;
    color: $alert;
    p: {
      margin: 2px;
    };
  }
</style>
