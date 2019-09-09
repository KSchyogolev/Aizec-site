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

  if (err.response.status === 403) return forceLogout()
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

API.main.getAllObjects = (objects) => get('restapi/' + objects)
API.main.deleteObject = (objects, id) => del('restapi/' + objects + '/' + id)
API.main.updateObject = (objects, id, data) => patch('restapi/' + objects + '/' + id, data)
API.main.addObject = (objects, data) => post('restapi/' + objects, data)

API.main.getAllUsers = () => get('restapi/users')
API.main.getUser = (userId) => get('restapi/users/' + userId)
API.main.deleteUser = (userId) => del('restapi/users/' + userId)
API.main.createByEmail = (data) => post('restapi/users/create_by_email', data)
API.main.approveUser = (userId) => get('restapi/users/' + userId + '/approve')

API.main.addMessage = (data) => post('restapi/messages', data)
API.main.getAllMessages = () => get('restapi/messages')
API.main.deleteMessage = (messageId) => del('restapi/messages/' + messageId)
API.main.updateMessage = (messageId, data) => patch('restapi/messages/' + messageId, data)

API.main.addCourse = (data) => post('restapi/courses', data)
API.main.getAllCourses = () => get('restapi/courses')
API.main.deleteCourse = (id) => del('restapi/courses/' + id)
API.main.updateCourse = (id, data) => patch('restapi/courses/' + id, data)
API.main.getCurrentCourses = (userId) => get('restapi/courses/by_user_id/' + userId)

API.main.getAllClubs = () => get('restapi/clubs')
API.main.deleteClub = (id) => del('restapi/clubs' + id)
API.main.updateClub = (id, data) => patch('restapi/clubs' + id, data)
API.main.addClub = (data) => post('restapi/clubs', data)

API.main.activate = (data) => post('restapi/users/activate', data)
API.main.updateUser = (userId, data) => patch('restapi/users/' + userId, data)
API.main.addUser = (data) => post('restapi/users', data)
API.main.signIn = (data) => post('restapi/login', data)
API.main.signOut = () => del('restapi/logout')

API.main.getGroup = (groupId) => get('restapi/groups/' + groupId)
API.main.addUserToGroup = (groupId, userId) => get('restapi/groups/' + groupId + '/add_user/' + userId)
API.main.removeUserFromGroup = (groupId, userId) => get('restapi/groups/' + groupId + '/remove_user/' + userId)

API.main.getCurrentOffers = (userId) => get('restapi/users/' + userId + '/offers')
API.main.getUserLessons = (userId) => get('restapi/lessons/by_user_id/' + userId)
API.main.getUserVisits = (userId) => get('restapi/users/' + userId + '/visits')
// API.main.getUserEvents = (userId) => get('restapi/lessons/by_user_id/' + userId)

API.main.uploadHomework = (data) => post('restapi/messages.json', data, 'multipart/form-data')
API.main.getHomework = (visitId) => get('restapi/visits/' + visitId + '/inbox')
API.main.downloadFile = (url) => get(url)


// API.main.uploadHomework = (data) => put('restapi/messages.json', data, 'multipart/form-data')

API.main.getLessonVisits = (lessonId) => get('restapi/lessons/' + lessonId + '/visits')

function get (url, type = 'application/json') {
  return new Promise((resolve, reject) =>
    axios.get(url, {headers: {'Content-Type': type, 'Accept': type}})
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function del (url, data = '', type = 'application/json') {
  return new Promise((resolve, reject) =>
    axios.delete(url, {data, headers: {'Content-Type': type, 'Accept': type}})
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