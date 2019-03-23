<template>
  <main>

    <h2>Contact SteelKick</h2>

    <form>
      <fieldset>
        <input v-model="email" placeholder="Email" name="email">
        <input v-model="name" placeholder="Name" name="name">
        <textarea v-model="message" placeholder="Message"></textarea>
        <button type="button" @click="submit">Submit</button>
        <div v-if="error" class="error">
          <p>Failed to send message. Please try again.</p>
        </div>
      </fieldset>
    </form>

    <p>or</p>
    <hr>

    <p>
      Email
      <a href="mailto:contact@steelkick.com">contact@steelkick.com</a>
    </p>

  </main>
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
  @import '@/assets/scss/structure.scss';

  input {
    width: 270px;
  }

  textarea {
    height: 100px;
  }

  p {
    text-align: center;
  }

  .error {
    color: $alert;
  }
</style>
