import { fetch } from "./common"

const API = {main: {}}

API.main.getAllUsers = () => get('restapi/users')
API.main.getUser = (userId) => get('restapi/users/' + userId)
API.main.deleteUser = (userId) => del('restapi/users/' + userId)
API.main.updateUser = (userId, data) => patch('restapi/users/' + userId, data)
API.main.addUser = (data) => post('restapi/users', data)


function get (url) {
  return new Promise((resolve, reject) =>
    fetch(url, {method: 'GET'})
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function del (url) {
  return new Promise((resolve, reject) =>
    fetch(url, {method: "DELETE"})
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  )
}

function post (url, data = '', type = 'application/json') {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'POST',
      headers: {'Content-Type': type, 'Accept': type},
      body: JSON.stringify(data)
    })
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  })
}

function patch (url, data = '', type = 'application/json') {
  return new Promise((resolve, reject) => {
    fetch(url, {
      method: 'PATCH',
      headers: {'Content-Type': type, 'Accept': type},
      body: JSON.stringify(data)
    })
      .then(response => resolve(response))
      .catch(error => reject(error.response))
  })
}

export default API