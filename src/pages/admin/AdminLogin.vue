<template>
  <div class="main">

    <Form @submitForm="submit">

      <template #title>
        Admin Sign In
      </template>

      <template #content>
        <div class="col">

          <InputText v-model="email" big>
            Email
          </InputText>

          <InputText type="password" v-model="password" big>
            Password
          </InputText>

        </div>
      </template>

      <template #action>
        Sign In
      </template>

    </Form>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    submit () {
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
        .catch(err => {
          this.$store.dispatch('complete')
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
