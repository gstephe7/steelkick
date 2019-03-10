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
    notifications: [],
    addressValid: false,
    admin: {
      auth: false,
      email: '',
      super: false
    }
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
      state.notifications = []
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
    },
    newNotifications (state, payload) {
      state.notifications = payload
    },
    noNotifications (state, payload) {
      state.notifications = []
    },
    adminLogin (state, payload) {
      state.admin.auth = true
      state.admin.email = payload.email
      state.admin.super = payload.super
    },
    adminLogout (state) {
      state.admin.auth = false
      state.admin.email = ''
      state.admin.super = false
    }
  },

  actions: {
    login ({commit, dispatch}, payload) {
      $cookies.set('token', payload, '14d')
      commit('login', payload)
      dispatch('getNotifications')
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
    },
    getNotifications ({commit, dispatch, getters}) {
      api.axios.get(`${api.baseUrl}/users/notifications`, {
        params: {
          companyId: getters.companyId
        }
      })
      .then(res => {
        if (res.data.notifications.length > 0) {
          commit('newNotifications', res.data.notifications)
        } else {
          commit('noNotifications')
        }
      })
      .catch(() => {
        commit('noNotifications')
      })
    },
    notificationViewed ({commit, dispatch, getters}, payload) {
      api.axios.post(`${api.baseUrl}/users/notification-viewed`, {
        companyId: getters.companyId,
        subjectId: payload
      })
      .then(() => {
        dispatch('getNotifications')
      })
      .catch(() => {})
    },
    adminLogin ({commit}, payload) {
      $cookies.set('adminToken', payload, '3d')
      commit('adminLogin', payload)
    },
    adminLogout ({commit}) {
      $cookies.remove('adminToken')
      commit('adminLogout')
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
    },
    notifications: (state) => {
      return state.notifications
    }
  }

})
