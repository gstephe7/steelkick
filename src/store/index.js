import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loading: false,
    snackbar: {
      show: false,
      message: '',
      error: false
    },
    auth: false,
    token: null,
    user: {},
    currentRole: null,
    currentJob: null,
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
      state.token = null
      state.user = {}
      state.currentJob = null
      state.currentRole = null
      state.notifications = []
      state.addressValid = false
    },
    loading (state) {
      state.loading = true
    },
    complete (state) {
      state.loading = false
    },
    snackbar (state, payload) {
      state.snackbar.show = true
      state.snackbar.message = payload
    },
    snackbarError (state, payload) {
      state.snackbar.show = true
      state.snackbar.message = payload
      state.snackbar.error = true
    },
    hideSnackbar (state) {
      state.snackbar.show = false
      state.snackbar.message = ''
      state.snackbar.error = false
    },
    updateCurrentJob (state, payload) {
      state.currentJob = payload
    },
    updateCurrentRole (state, payload) {
      state.currentRole = payload
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
      $cookies.set('sk-user', payload, '14d')
      commit('login', payload)
    },
    logout ({commit}) {
      $cookies.remove('sk-user')
      commit('logout')
    },
    loading ({commit}) {
      commit('loading')
    },
    complete ({commit}) {
      commit('complete')
    },
    snackbar ({commit, dispatch}, payload) {
      commit('snackbar', payload)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch('hideSnackbar')
          resolve()
        }, 5000)
      })
    },
    snackbarError ({commit, dispatch}, payload) {
      commit('snackbarError', payload)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch('hideSnackbar')
          resolve()
        }, 5000)
      })
    },
    hideSnackbar ({commit}) {
      commit('hideSnackbar')
    },
    updateCurrentRole ({commit}, payload) {
      localStorage.currentRole = JSON.stringify(payload)
      commit('updateCurrentRole', payload)
    },
    updateCurrentJob ({commit}, payload) {
      return new Promise((resolve, reject) => {
        localStorage.currentJob = JSON.stringify(payload)
        commit('updateCurrentJob', payload)
        setTimeout(() => {
          resolve()
        }, 250)
      })
    },
    adminLogin ({commit}, payload) {
      $cookies.set('adminToken', payload, '14d')
      commit('adminLogin', payload)
    },
    adminLogout ({commit}) {
      $cookies.remove('adminToken')
      commit('adminLogout')
    },
    action ({getters}, payload) {
      let date = new Date()
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours()
      let minute = date.getMinutes()

      function time () {
        let newMinute = minute

        if (minute < 10) {
          newMinute = `0${minute}`
        }

        if (hour > 12) {
          return `${hour - 12}:${newMinute}pm`
        } else if (hour == 0) {
          return `12:${newMinute}am`
        } else if (hour == 12) {
          return `12:${newMinute}pm`
        } else {
          return `${hour}:${newMinute}am`
        }
      }

      function nowDate () {
        return `${month}/${day}/${year}`
      }

      return new Promise((resolve, reject) => {
        api.axios.post(`${api.baseUrl}/actions/new-action`, {
          action: {
            company: getters.companyId,
            user: getters.userId,
            job: payload.job || null,
            sequence: payload.sequence || null,
            part: payload.part || null,
            material: payload.material || null,
            materialDescription: payload.materialDescription || null,
            action: payload.action,
            description: payload.description,
            quantity: payload.quantity,
            date: nowDate(),
            time: time(),
            timestamp: date.getTime()
          }
        })
        .then(() => {
          resolve({
            description: payload.description,
            quantity: payload.quantity,
            user: {
              firstName: getters.user.firstName,
              lastName: getters.user.lastName
            },
            time: time(),
            date: nowDate()
          })
        })
        .catch(() => {
          reject()
        })
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
      return state.user._id
    },
    user: (state) => {
      return state.user
    },
    loading: (state) => {
      return state.loading
    },
    snackbarShow: (state) => {
      return state.snackbar.show
    },
    snackbarMessage: (state) => {
      return state.snackbar.message
    },
    snackbarError: (state) => {
      return state.snackbar.error
    },
    currentRole: (state) => {
      return state.currentRole
    },
    currentJob: (state) => {
      return state.currentJob
    },
    isAdmin: (state) => {
      return state.user.admin
    }
  }

})
