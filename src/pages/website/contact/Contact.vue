<template>
  <div main>

    <h1>Contact SteelKick</h1>

    <form col @submit.prevent="submit">
      <input big v-model="email" placeholder="Email" name="email">
      <input big v-model="name" placeholder="Name" name="name">
      <textarea v-model="message" placeholder="Message"></textarea>
      <button>Submit</button>
      <div errors v-if="error">
        <p>Failed to send message. Please try again.</p>
      </div>
    </form>

    <p>or</p>
    <hr>

    <p>
      Email
      <a href="mailto:contact@steelkick.com">contact@steelkick.com</a>
    </p>

  </div>
</template>

<script>
import api from '@/api/api'

export default {
  data () {
    return {
      email: '',
      name: '',
      message: '',
      error: false
    }
  },
  methods: {
    submit () {
      this.$store.dispatch('loading')
      api.axios.post(`${api.baseUrl}/contact/email`, {
        email: this.email,
        name: this.name,
        message: this.message
      })
      .then(() => {
        this.$store.dispatch('complete')
        this.$router.push('/contact-confirmation')
      })
      .catch(() => {
        this.$store.dispatch('complete')
        this.error = true
      })
    }
  }
}
</script>

<style lang="scss" scoped>

  p {
    text-align: center;
  }

  input[big] {
    width: 268px;
  }

  textarea {
    height: 100px;
  }
</style>
