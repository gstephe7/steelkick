import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loading: false,
    auth: false,
    token: null,
    user: {},
    addressValid: false
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
    },
    addressValid (state) {
      state.addressValid = true
    },
    addressInvalid (state) {
      state.addressValid = false
    }
  },

  actions: {
    login ({commit, dispatch}, token) {
      $cookies.set('token', token, '14d')
      commit('login', token)
      dispatch('validateAddress')
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
    },
    validateAddress ({commit, getters}) {
      api.axios.post(`${api.baseUrl}/users/validate-address`, {
        id: getters.companyId
      })
      .then(res => {
        if (res.data.latitude && res.data.longitude) {
          commit('addressValid')
        } else {
          commit('addressInvalid')
        }
      })
      .catch(() => {
        commit('addressInvalid')
      })
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
    userId: (state) => {
      return state.user.id
    },
    loading: (state) => {
      return state.loading
    },
    isAdmin: (state) => {
      return state.user.admin
    },
    addressValid: (state) => {
      return state.addressValid
    }
  }

})
