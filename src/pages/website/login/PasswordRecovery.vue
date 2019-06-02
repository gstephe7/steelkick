<template>
  <div main col>

    <h1>Reset Your Password</h1>

    <p>Enter your email address below and follow the link sent to your email to reset your password.</p>

    <input placeholder="Email" v-model="email" :highlight="errors.email">

    <button @click="submit">Send Link</button>

    <div errors>
      <p v-if="errors.email">Please enter your email</p>
    </div>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      email: '',
      errors: {
        email: false
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

      if (!this.errors.email) {
        this.verified = true
      }
    },
    submit () {
      this.checkForm()

      if (this.verified) {
        this.$store.dispatch('loading')
        api.axios.post(`${api.baseUrl}/users/recover-password`, {
          email: this.email
        })
        .then(() => {
          this.$store.dispatch('complete')
          this.$router.push('password-recovery-confirmation')
        })
        .catch(() => {
          this.$store.dispatch('complete')
          this.$router.push('password-recovery-confirmation')
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
