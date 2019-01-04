import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loading: false,
    auth: false,
    token: null,
    user: {}
  },

  mutations: {
    login (state, payload) {
      state.auth = true
      state.token = payload.token
      state.user = payload.user
    },
    logout (state) {
      state.auth = false
      state.token = ''
      state.user = {}
    },
    loading (state) {
      state.loading = true
    },
    complete (state) {
      state.loading = false
    }
  },

  actions: {
    login ({commit}, token) {
      $cookies.set('token', token, '14d')
      commit('login', token)
    },
    logout ({commit}) {
      $cookies.remove('token')
      commit('logout')
    },
    loading ({commit}) {
      commit('loading')
    },
    complete ({commit}) {
      commit('complete')
    }
  },

  getters: {
    loggedIn: (state) => {
      return state.auth
    },
    companyName: (state) => {
      return state.user.company
    },
    companyId: (state) => {
      return state.user.companyId
    },
    userEmail: (state) => {
      return state.user.email
    },
    loading: (state) => {
      return state.loading
    }
  }

})
