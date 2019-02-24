<template>
  <div id="contact">

    <h2>Contact SteelKick</h2>

    <input v-model="email" placeholder="Email" name="email"><br>
    <input v-model="name" placeholder="Name" name="name">
    <textarea v-model="message" placeholder="Message"></textarea><br>
    <button @click="submit">Submit</button>

    <div v-if="error" class="error">
      <p>Failed to send message. Please try again.</p>
    </div>

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
  @import '@/assets/scss/variables.scss';

  #contact {
    max-width: 600px;
    margin: auto;
    padding: 50px 10px;
    text-align: center;
  }

  input {
    border: 1px solid $accent;
    width: 270px;
    margin: 5px;
  }

  textarea {
    margin: 5px;
    height: 100px;
  }

  .error {
    color: $alert;
  }
</style>
