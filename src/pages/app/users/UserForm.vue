<template>
  <Form @submitForm="submit" ref="form">

    <template #content>
      <div class="col">

        <InputText v-model="user.firstName" big required>
          First Name
        </InputText>

        <InputText v-model="user.lastName" big required>
          Last Name
        </InputText>

        <InputText v-model="user.email" big required>
          Email
        </InputText>

        <InputText v-model="user.password" big type="password" :required="!edit">
          Password
        </InputText>

        <InputCheckBox v-model="user.admin" big>
          Admin
        </InputCheckBox>

      </div>
    </template>

  </Form>
</template>

<script>
import api from '@/api/api'

export default {
  props: {
    edit: Object
  },
  data () {
    return {
      user: {
        admin: false,
        company: this.$store.getters.companyId
      },
      errors: {}
    }
  },
  methods: {
    submitForm () {
      this.$refs.form.submit()
    },
    submit () {

      this.$emit('close')

      let type = () => {
        if (this.edit) return 'put'
        else return 'post'
      }

      let endpoint = () => {
        if (this.edit) return '/users/edit-user'
        else return '/users/new-user'
      }

      let message = () => {
        if (this.edit) return 'updated'
        else return 'created'
      }

      api.request({
        type: type(),
        endpoint: endpoint(),
        load: true,
        data: {
          user: this.user
        },
        res: res => {
          this.$store.dispatch('snackbar', `User successfully ${message()}!`)
        },
        err: err => {
          this.$store.dispatch('snackbarError', `Failed with status ${err.response.status}. User was not ${message()}.`)
        }
      })
    }
  },
  created () {
    if (this.edit) {
      this.user = this.edit
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
