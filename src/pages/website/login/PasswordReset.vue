<template>
  <div main col center>

    <h1>Reset Your Password</h1>

    <p>Enter your new password below</p>

    <input v-model="password" type="password" placeholder="New Password" :highlight="errors.password">

    <button @click="resetPassword">Update Password</button>

    <div errors>
      <p v-if="errors.password">Password must be longer than 7 characters</p>
      <p v-if="failed">We failed to verify your account. The link you used to reset your password may be expired. You may need to try again.</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      password: '',
      errors: {
        password: null
      },
      verified: false,
      failed: false
    }
  },
  methods: {
    checkForm () {
      if (this.password.length > 7) {
        this.errors.password = false
        this.verified = true
      } else {
        this.errors.password = true
        this.verified = false
      }
    },
    resetPassword () {
      this.checkForm()

      if (this.verified) {
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/users/reset-password`, {
          token: this.$route.query.token,
          password: this.password
        })
        .then(() => {
          this.$store.dispatch('complete')
          this.$router.push({ name: 'Login' })
        })
        .catch(() => {
          this.$store.dispatch('complete')
          this.failed = true
          this.password = ''
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>

  p {
    text-align: center;
    max-width: 400px;
  }

  input {
    width: 250px;
  }
</style>
