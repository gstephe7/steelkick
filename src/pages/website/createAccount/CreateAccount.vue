<template>
    <form col @submit.prevent="submit">

        <InputText v-model="company" auto big :highlight="errors.company">
          Company Name
        </InputText>

        <InputText v-model="email" auto big :highlight="errors.email">
          Email
        </InputText>

        <InputText v-model="password" auto big type="password" :highlight="errors.password">
          Password
        </InputText>

        <div>
          <Button create>
            Create Account
          </Button>
        </div>

        <div errors>
          <p v-if="errors.company">Please enter your company's name.</p>
          <p v-if="errors.email">Please enter a valid email address</p>
          <p v-if="errors.password">Password must be longer than 7 characters</p>
          <p v-if="errors.server">{{ errors.server }}</p>
        </div>

    </form>
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
        this.$store.dispatch('loading')

        api.axios
          .post(`${api.baseUrl}/users/new-company`, {
            name: this.company,
            email: this.email,
            password: this.password
          })
          .then((res) => {
            this.$store.dispatch('complete')
            if (res.status === 500) {
              this.errors.server = res.data.message
            } else if (res.status === 400) {
              this.errors.server = res.data.message
            } else if (res.status === 200) {
              if (res.data.token) {
                this.$store.dispatch('login', {
                  token: res.data.token,
                  user: {
                    id: res.data.user._id,
                    company: this.company,
                    companyId: res.data.user.companyId,
                    admin: true
                  }
                })
              }
              this.$router.push({
                name: 'EditProfile',
                query: {
                  newAccount: true
                }
              })
            }
          })
          .catch(() => {
            this.$store.dispatch('complete')
            this.errors.server = 'An account for this company has already been created!'
          })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
