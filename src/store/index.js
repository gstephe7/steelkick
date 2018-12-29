import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    auth: false,
    token: localStorage.getItem('token') || '',
    user: {}
  },

  mutations: {
    login (state, payload) {
      state.auth = true
      state.token = payload.token
      state.user = payload.user
      console.log(state)
    },
    logout (state) {
      state.auth = false
      state.token = ''
      state.user = {}
    }
  },

  actions: {
    login ({commit}, {token, user}) {
      localStorage.setItem('token', token)
      commit('login', {
        token,
        user
      })
    },
    logout ({commit}) {
      localStorage.removeItem('token')
      commit('logout')
    }
  },

  getters: {
    loggedIn: (state) => {
      return {
        auth: state.auth,
        token: state.token,
        company: state.company,
        user: state.user
      }
    }
  }

})
