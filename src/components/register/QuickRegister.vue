<template>
  <div id="register">

    <h2>Create Your Free Account</h2>

    <div class="form">

      <input v-model="company" placeholder="Company Name" :class="{ highlight : errors.company }">

      <input v-model="email" placeholder="Email" :class="{ highlight : errors.email }">

      <input v-model="password" type="password" placeholder="Password" :class="{ highlight : errors.password }">

      <button @click="submit">Create Account</button>

    </div>

    <div class="errors">
      <p v-if="errors.company">Please enter your company's name.</p>
      <p v-if="errors.email">Please enter a valid email address</p>
      <p v-if="errors.password">Password must be longer than 7 characters</p>
      <p v-if="errors.server">{{ errors.server }}</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      company: '',
      email: '',
      password: '',
      errors: {
        company: false,
        email: false,
        password: false,
        server: null
      },
      verified: false
    }
  },
  methods: {
    checkForm () {
      if (!this.company) {
        this.errors.company = true
      } else {
        this.errors.company = false
      }

      if (this.email.includes('@') && this.email.includes('.')) {
        this.errors.email = false
      } else {
        this.errors.email = true
      }

      if (this.password.length > 7) {
        this.errors.password = false
      } else {
        this.errors.password = true
      }

      if (!this.errors.company && !this.errors.email && !this.errors.password) {
        this.verified = true
      }
    },
    submit () {
      this.checkForm()

      if (this.verified) {
        api.axios.post(`${api.baseUrl}/users/new-company`, {
          name: this.company,
          email: this.email,
          password: this.password
        })
          .then((res) => {
            if (res.status === 500) {
              this.errors.server = res.data.message
            } else if (res.status === 400) {
              console.log('success, but no')
              this.errors.server = res.data.message
            } else if (res.status === 200) {
              console.log(res)
              if (res.data.token) {
                this.$store.dispatch('login', {
                  token: res.data.token,
                  user: {
                    company: this.company,
                    email: this.email,
                    admin: true
                  }
                })
              }
              this.$router.push('dashboard/edit-profile')
            }
          })
          .catch((err) => {
            this.errors.server = 'An account for this company has already been created!'
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #register {
    height: 500px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .form {
    height: 300px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input {
    border: 1px solid $accent;
    margin: 10px;
    width: 250px;
  }

  .highlight {
    outline: 1px solid $alert;
  }

  .errors {
    color: $alert;
    text-align: center;
  }
</style>
