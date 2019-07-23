import axios from 'axios'
import store from '../store'

export default {

  // variables
  axios: axios.create({
    headers: {
      Pragma: 'no-cache'
    }
  }),
  baseUrl: 'https://steelkick-backend.appspot.com',



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

  },



  request ({type, endpoint, load, data, res, err}) {

    let dataModified = () => {
      if (type == 'get' || type == 'delete') {
        return {
          params: data
        }
      } else {
        return data
      }
    }

    let requestSelected = () => {
      if (type == 'get') {
        return this.axios.get(`${this.baseUrl}${endpoint}`, dataModified())
      }

      if (type == 'post') {
        return this.axios.post(`${this.baseUrl}${endpoint}`, dataModified())
      }

      if (type == 'put') {
        return this.axios.put(`${this.baseUrl}${endpoint}`, dataModified())
      }

      if (type == 'delete') {
        return this.axios.delete(`${this.baseUrl}${endpoint}`, dataModified())
      }
    }

    if (load) {
      store.dispatch('loading')
    }

    requestSelected()
      .then(response => {
        if (load) {
          store.dispatch('complete')
        }
        res(response)
      })
      .catch(error => {
        if (load) {
          store.dispatch('complete')
        }
        err(error)
      })

  }

}
