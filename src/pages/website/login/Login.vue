<template>
  <div class="main col center">

    <h1>Sign In</h1>

    <Form @submitForm="submit">

      <template #content>
        <div class="col">
          <InputText big v-model="email" :highlight="errors.email">
            Email
          </InputText>

          <InputText big type="password" v-model="password" :highlight="errors.password">
            Password
          </InputText>
        </div>
      </template>

      <template #action>
        Sign In
      </template>

      <template #errors>
        <div errors>
          <p v-if="errors.email">Please enter your email</p>
          <p v-if="errors.password">Please enter your password</p>
          <p v-if="errors.server">{{ errors.server }}</p>
        </div>
      </template>

    </Form>

    <router-link :to="{ name: 'PasswordRecovery' }">
      Forgot your password?
    </router-link>

    <router-link :to="{ name: 'CreateAccount' }">Create an account</router-link>

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
          .post(`${api.baseUrl}/users/login`, {
            email: this.email,
            password: this.password
          })
          .then((res) => {
            this.$store.dispatch('complete')
            if (res.status === 500) {
              this.errors.server = res.data.message
            } else if (res.status === 400) {
              this.errors.server = res.data.message
            } else if (res.status === 401) {
              this.errors.server = res.data.message
            } else if (res.status === 200) {
              this.$store.dispatch('login', {
                token: res.data.token,
                user: res.data.user
              })
              this.$router.push({
                name: 'Dashboard'
              })
            }
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

  input[big] {
    width: 250px;
  }
</style>
