import axios from 'axios'
import store from '../store'

export default {

  // variables
  axios: axios.create({
    headers: {
      Pragma: 'no-cache'
    }
  }),
  baseUrl: 'http://localhost:8080',



  // functions
  get (endpoint, data, callback, load) {

    if (load == 'load') {
      store.dispatch('loading')
    }

    this.axios.get(`${this.baseUrl}${endpoint}`, {
      params: data
    })
    .then(res => {
      if (load == 'load') {
        store.dispatch('complete')
      }
      callback(res)
    })
    .catch(err => {
      if (load == 'load') {
        store.dispatch('complete')
      }
      callback(err)
    })

  },



  post (endpoint, data, callback, load) {

    if (load == 'load') {
      store.dispatch('loading')
    }

    this.axios.post(`${this.baseUrl}${endpoint}`, data)
    .then(res => {
      if (load == 'load') {
        store.dispatch('complete')
      }
      callback(res)
    })
    .catch(err => {
      if (load == 'load') {
        store.dispatch('complete')
      }
      callback(err)
    })

  },



  delete (endpoint, data, callback) {

    this.axios.delete(`${this.baseUrl}${endpoint}`, {
      params: data
    })
    .then(res => {
      callback(res)
    })
    .catch(err => {
      callback(err)
    })

  }

}
