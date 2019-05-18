import axios from 'axios'
import store from '../store'

export default {

  // variables
  axios: axios,
  baseUrl: 'http://localhost:8080',



  // functions
  get (endpoint, data, callback, load) {

    if (load == 'load') {
      store.dispatch('loading')
    }

    axios.get(`${this.baseUrl}${endpoint}`, {
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

    axios.post(`${this.baseUrl}${endpoint}`, data)
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

  }

}
