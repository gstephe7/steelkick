import axios from 'axios'

export default {

  // variables
  axios: axios,
  baseUrl: 'http://localhost:8080',



  // functions
  get (endpoint, data, callback) {
    axios.get(`${this.baseUrl}${endpoint}`, {
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
