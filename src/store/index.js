import Vue from 'vue'
import Vuex from 'vuex'
import api from '@/api/api'

Vue.use(Vuex)

export default new Vuex.Store({

  state: {
    loading: false,
    success: {
      show: false,
      msg: ''
    },
    auth: false,
    token: null,
    user: {},
    currentRole: null,
    currentJob: null,
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
    success (state, payload) {
      state.success.show = true
      state.success.msg = payload
    },
    successComplete (state) {
      state.success.show = false
      state.success.msg = ''
    },
    updateCurrentJob (state, payload) {
      state.currentJob = payload
    },
    updateCurrentRole (state, payload) {
      state.currentRole = payload
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
      $cookies.set('sk-user', payload, '14d')
      commit('login', payload)
      dispatch('getNotifications')
      dispatch('validateAddress')
    },
    logout ({commit}) {
      $cookies.remove('sk-user')
      $cookies.remove('sk-role')
      $cookies.remove('sk-job')
      commit('logout')
    },
    loading ({commit}) {
      commit('loading')
    },
    complete ({commit}) {
      commit('complete')
    },
    success ({commit, dispatch}, payload) {
      commit('success', payload)
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          dispatch('successComplete')
          resolve()
        }, 2000)
      })
    },
    successComplete ({commit}) {
      commit('successComplete')
    },
    updateCurrentRole ({commit}, payload) {
      $cookies.set('sk-role', payload, '14d')
      commit('updateCurrentRole', payload)
    },
    updateCurrentJob ({commit}, payload) {
      $cookies.set('sk-job', payload, '14d')
      commit('updateCurrentJob', payload)
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
            action: payload.action,
            description: payload.description,
            quantity: payload.quantity,
            date: nowDate(),
            time: time(),
            timestamp: date.getTime()
          }
        })
        .then(() => {
          resolve()
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
    loading: (state) => {
      return state.loading
    },
    success: (state) => {
      return state.success
    },
    currentRole: (state) => {
      return state.currentRole
    },
    currentJob: (state) => {
      return state.currentJob
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
