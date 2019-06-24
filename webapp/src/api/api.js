import axios from 'axios'

const API = {main: {}}

API.main.getUsers = () => get('restapi/users')

function get (url) {
  return new Promise((resolve, reject) =>
    axios.get(url)
      .then(response => response.data)
      .then(response => resolve(response.data))
      .catch(error => reject(error.response))
  )
}

export default API