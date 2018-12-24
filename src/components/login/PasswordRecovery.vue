<template>
  <div id="password-recovery">

    <h2>Recover Your Password</h2>

    <input placeholder="Email" v-model="email" :class="{ highlight : errors.email }">

    <button @click="submit">Send Password</button>

    <div class="errors">
      <p v-if="errors.email">Please enter your email</p>
    </div>

  </div>
</template>

<script>
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
        this.$router.push('password-recovery-confirmation')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '@/assets/scss/variables.scss';

  #password-recovery {
    height: 400px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
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
</style>
