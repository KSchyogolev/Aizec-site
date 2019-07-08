import { action, observable } from 'mobx'
import { RouterStore } from 'mobx-router'
import API from './api/api'

const users = [{
  id: '1',
  login: "admin2",
  password: "123456",
  password_confirmation: "123456",
  first_name: "a",
  second_name: "b",
  role: "admin",
  bio: "123",
  phone: "1",
  email: "aa@d.c"
}, {
  id: '2',
  login: "admin2",
  password: "123456",
  password_confirmation: "123456",
  first_name: "a",
  second_name: "b",
  role: "admin",
  bio: "123",
  phone: "1",
  email: "aa@d.c"
}, {
  id: '3',
  login: "admin2",
  password: "123456",
  password_confirmation: "123456",
  first_name: "a",
  second_name: "b",
  role: "admin",
  bio: "123",
  phone: "1",
  email: "aa@d.c"
}, {
  id: '4',
  login: "admin2",
  password: "123456",
  password_confirmation: "123456",
  first_name: "a",
  second_name: "b",
  role: "admin",
  bio: "123",
  phone: "1",
  email: "aa@d.c"
}, {
  id: '5',
  login: "admin2",
  password: "123456",
  password_confirmation: "123456",
  first_name: "a",
  second_name: "b",
  role: "admin",
  bio: "123",
  phone: "1",
  email: "aa@d.c"
}]

const user = {
  id: '6',
  login: "22333",
  password: "123456",
  password_confirmation: "123456",
  first_name: "a",
  second_name: "b",
  role: "admin",
  bio: "123",
  phone: "1",
  email: "aa@d.c"
}

class Store {

  @observable router = new RouterStore()
  @observable users = []
  @observable currentUser = {}

  @action
  signIn (data) {
    API.main.signIn(data).then(res => {
      localStorage.setItem('access_token', res.headers.authorization)
    })
  }

  @action
  getUsers () {
    API.main.getAllUsers().then(res => this.users = res)
  }

  @action
  getUser (userId) {
    API.main.getUser(userId).then(res => this.currentUser = res)
  }

  @action
  addUser (data) {
    return new Promise((resolve, reject) => {
      API.main.addUser(data).then(res => {
        this.users = [...this.users, res]
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateUser (userId, data) {
    return new Promise((resolve, reject) => {
      API.main.updateUser(userId, data).then(res => {
        const currentUsers = this.users
        const index = currentUsers.findIndex(user => user.id === userId)
        currentUsers[index] = res
        this.users = currentUsers
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteUser (userId) {
    return new Promise((resolve, reject) => {
      API.main.deleteUser(userId).then(res => {
        const currentUsers = this.users
        const index = currentUsers.findIndex(user => user.id === userId)
        currentUsers.splice(index, 1)
        this.users = currentUsers
        resolve()
      }).catch(reject)
    })
  }
}

export default new Store()
