<template>
  <div main col>

    <h1>Add New User</h1>

    <form col @submit.prevent="submit" autocomplete="off">

      <input big v-model="user.firstName" placeholder="First Name" :highlight="errors.firstName">

      <input big v-model="user.lastName" placeholder="Last Name" :highlight="errors.lastName">

      <input big v-model="user.email" placeholder="Email" :highlight="errors.email" autocomplete="off">

      <input big v-model="user.password" placeholder="Password" type="password" :highlight="errors.password" autocomplete="off">

      <select big v-model="user.admin" :highlight="errors.admin">
        <option :value="null" selected disabled>Admin?</option>
        <option :value="false">No</option>
        <option :value="true">Yes</option>
      </select>

      <br>

      <div around>
        <button small type="button" @click="cancel">
          Cancel
        </button>
        <button small type="submit" green>
          Add User
        </button>
      </div>

      <div errors>
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

    </form>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      user: {
        company: this.$store.getters.companyId,
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        admin: null,
      },
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

      if (!this.user.firstName) {
        this.errors.firstName = true
      } else {
        this.errors.firstName = false
      }

      if (!this.user.lastName) {
        this.errors.lastName = true
      } else {
        this.errors.lastName = false
      }

      if (this.user.email.includes('@') && this.user.email.includes('.')) {
        this.errors.email = false
      } else {
        this.errors.email = true
      }

      if (this.user.password.length < 7) {
        this.errors.password = true
      } else {
        this.errors.password = false
      }

      if (this.user.admin === null) {
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
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/users/new-user`, {
          user: this.user
        })
        .then(res => {
          this.$store.dispatch('complete')
          this.$router.push('new-user-confirmed')
        })
        .catch(err => {
          this.$store.dispatch('complete')
        })
      }
    },
    cancel () {
      this.$router.push('users')
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
