import axios from 'axios'

const API = {main: {}}

API.main.getAllUsers = () => get('users')
API.main.getUser = (userId) => get('users/' + userId)
API.main.deleteUser = (userId) => del('users/' + userId)
API.main.updateUser = (userId, data) => patch('users/' + userId, data)
API.main.addUser = (data) => post('users', data)


function get (url) {
  return new Promise((resolve, reject) =>
    axios.get(url)
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function del (url) {
  return new Promise((resolve, reject) =>
    axios.delete(url)
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function post (url, data = '', type = 'text/plain') {
  return new Promise((resolve, reject) => {
    axios({
      method: 'post',
      headers: {'Content-Type': type},
      url,
      data
    })
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  })
}

function patch (url, data = '', type = 'text/plain') {
  return new Promise((resolve, reject) => {
    axios({
      method: 'patch',
      headers: {'Content-Type': type},
      url,
      data
    })
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  })
}

export default API