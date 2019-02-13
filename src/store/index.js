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
      state.addressValid = false
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
    login ({commit, dispatch}, payload) {
      $cookies.set('token', payload, '14d')
      commit('login', payload)
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
      api.axios.get(`${api.baseUrl}/users/validate-address`, {
        params: {
          id: getters.companyId
        }
      })
      .then(res => {
        if (res.data.valid == true) {
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
