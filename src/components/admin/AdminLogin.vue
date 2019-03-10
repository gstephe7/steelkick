<template>
  <div id="login">

    <h2>Admin Sign In</h2>

    <div class="form">

      <input v-model="email" placeholder="Email" :class="{ highlight : errors.email }" @keyup.enter="submit">

      <input type="password" v-model="password" placeholder="Password" :class="{ highlight : errors.password }" @keyup.enter="submit">

      <button @click="submit">Sign In</button>

      <div class="errors">
        <p v-if="errors.email">Please enter your email</p>
        <p v-if="errors.password">Please enter your password</p>
        <p v-if="errors.server">{{ errors.server }}</p>
      </div>

    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      email: '',
      password: '',
      errors: {
        email: false,
        password: false,
        server: null
      },
      verified: false
    }
  },
  methods: {
    checkForm () {
      if (this.email.includes('@') && this.email.includes('.')) {
        this.errors.email = false
      } else {
        this.errors.email = true
      }

      if (!this.password) {
        this.errors.password = true
      } else {
        this.errors.password = false
      }

      if (!this.errors.email && !this.errors.password) {
        this.verified = true
      }
    },
    submit () {
      this.checkForm()

      if (this.verified) {
        this.$store.dispatch('loading')
        api.axios
          .post(`${api.baseUrl}/admin/login`, {
            email: this.email,
            password: this.password
          })
          .then((res) => {
            this.$store.dispatch('complete')
            this.$store.dispatch('adminLogin', {
              adminToken: res.data.adminToken,
              admin: res.data.admin
            })
            this.$router.push(`${this.$route.query.redirect}`)
          })
          .catch(() => {
            this.$store.dispatch('complete')
            this.errors.server = 'Please try again with different credentials.'
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #login {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  .form {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  input {
    border: 1px solid $accent;
    width: 250px;
    margin: 10px;
  }

  .highlight {
    outline: 1px solid $alert;
  }

  .errors {
    color: $alert;
    text-align: center;
  }

  a {
    margin-bottom: 10px;
  }
</style>
