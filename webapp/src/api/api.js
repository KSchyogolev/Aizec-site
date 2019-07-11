import axios from 'axios'
import JWTDecode from 'jwt-decode'

axios.defaults.baseURL = 'http://innovate-school.com'

axios.interceptors.request.use(reqConfig => {
    reqConfig.headers.Authorization = localStorage.getItem('access_token')
    return reqConfig
  },
  err => Promise.reject(err)
)

let isFetchingToken = false
let tokenSubscribers = []

function subscribeTokenRefresh (cb) {
  tokenSubscribers.push(cb)
}

function forceLogout () {
  isFetchingToken = false
  localStorage.clear()
  window.location = '/login'
}

axios.interceptors.response.use(undefined, err => {
  if (err.response.config.url.includes('/restapi/login'))
    return Promise.reject(err)

  if (err.response.status === 403) return console.log('LOGOUT')
  /*forceLogout()*/
  if (err.response.status !== 401) return Promise.reject(err)

  if (!isFetchingToken) {
    isFetchingToken = true

    const refreshToken = localStorage.getItem('refresh_token')
    if (!refreshToken) return forceLogout()

    try {
      const isRefreshTokenExpired =
        JWTDecode(refreshToken).exp < Date.now() / 1000

      if (isRefreshTokenExpired) return forceLogout()
    } catch (e) {
      return forceLogout()
    }
  }

  return new Promise((resolve, reject) => {
    subscribeTokenRefresh((errRefreshing, newToken) => {
      if (errRefreshing) return reject(errRefreshing)
      err.config.headers.Authorization = newToken
      return resolve(axios(err.config))
    })
  })
})

const API = {main: {}}

API.main.getAllUsers = () => get('restapi/users')
API.main.getUser = (userId) => get('restapi/users/' + userId)
API.main.deleteUser = (userId) => del('restapi/users/' + userId)
API.main.updateUser = (userId, data) => patch('restapi/users/' + userId, data)
API.main.addUser = (data) => post('restapi/users', data)
API.main.signIn = (data) => post('restapi/login', data)
API.main.signOut = () => del('restapi/logout')


function get (url) {
  return new Promise((resolve, reject) =>
    axios.get(url, {headers: {'Accept': 'application/json'}})
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function del (url, data = '') {
  return new Promise((resolve, reject) =>
    axios.delete(url, {data})
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function post (url, data = '', type = 'application/json') {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      url,
      headers: {'Content-Type': type, 'Accept': type},
      data
    })
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  })
}

function patch (url, data = '', type = 'application/json') {
  return new Promise((resolve, reject) => {
    axios({
      method: 'patch',
      url,
      headers: {'Content-Type': type, 'Accept': type},
      data
    })
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  })
}

export default API