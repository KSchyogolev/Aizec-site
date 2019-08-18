import { action, observable } from 'mobx'
import { RouterStore } from 'mobx-router'
import API from './api/api'

class Store {

  constructor () {
    this.loadData()
  }

  loadData = () => {
    this.currentUser = JSON.parse(localStorage.getItem('current_user') || '{}')
  }

  @observable router = new RouterStore()

  @observable users = []
  @observable groups = []
  @observable courses = []
  @observable clubs = []
  @observable messages = []
  @observable currentUser = {}

  @action
  signIn (data) {
    return new Promise((resolve, reject) => {
      API.main.signIn(data).then(res => {
        localStorage.setItem('access_token', res.headers.authorization)
        localStorage.setItem('current_user', JSON.stringify(res.data))
        this.currentUser = res.data
        resolve()
      }).catch(reject)
    })
  }

  @action
  signOut () {
    API.main.signOut().then(() => {
      window.location = '/login'
      localStorage.clear()
    }).catch((err) => {
      console.log(err)
      window.location = '/login'
      localStorage.clear()
    })
  }

  @action
  getUsers () {
    return new Promise((resolve, reject) => {
      API.main.getAllUsers().then(res => {
        this.users = res.data
        resolve()
      }).catch(reject)
    })
  }

  @action
  getAllMessages () {
    return new Promise((resolve, reject) => {
      API.main.getAllMessages().then(res => {
        this.messages = res.data
        resolve()
      }).catch(reject)
    })
  }

  @action
  getUser (userId) {
    API.main.getUser(userId).then(res => this.currentUser = res.data)
  }

  @action
  addUser (data) {
    return new Promise((resolve, reject) => {
      API.main.addUser(data).then(res => {
        this.users = [...this.users, res.data]
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateUser (userId, data) {
    return new Promise((resolve, reject) => {
      API.main.updateUser(userId, data).then(res => {
        const currentUsers = [...this.users]
        const index = currentUsers.findIndex(user => user.id === userId)
        currentUsers[index] = res.data
        this.users = currentUsers
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteUser (userId) {
    return new Promise((resolve, reject) => {
      API.main.deleteUser(userId).then(() => {
        const currentUsers = [...this.users]
        const index = currentUsers.findIndex(user => user.id === userId)
        currentUsers.splice(index, 1)
        this.users = currentUsers
        resolve()
      }).catch(reject)
    })
  }

  @action
  activateUser (data) {
    return new Promise((resolve, reject) => {
      API.main.activate(data).then(res => {
        resolve(res.data)
      }).catch(reject)
    })
  }

  @action
  approveUser (userId) {
    return new Promise((resolve, reject) => {
      API.main.approveUser(userId).then(res => {
        const currentUsers = [...this.users]
        const index = currentUsers.findIndex(user => user.id === userId)
        currentUsers[index] = res.data
        this.users = currentUsers
        resolve()
      }).catch(reject)
    })
  }

  @action
  createByEmail (data) {
    return new Promise((resolve, reject) => {
      API.main.createByEmail(data).then(res => {
        this.users = [...this.users, res.data]
        resolve()
      }).catch(reject)
    })
  }

  @action
  addMessage (data) {
    return new Promise((resolve, reject) => {
      API.main.addMessage({message: {...data, status: 'active', user_id: this.currentUser.id}}).then(res => {
        this.messages = [...this.messages, res.data]
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteMessage (messageId) {
    return new Promise((resolve, reject) => {
      API.main.deleteMessage(messageId).then(() => {
        const currentMessages = [...this.messages]
        const index = currentMessages.findIndex(item => item.id === messageId)
        currentMessages.splice(index, 1)
        this.messages = currentMessages
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateMessage (messageId, data) {
    return new Promise((resolve, reject) => {
      API.main.updateMessage(messageId, data).then(res => {
        const currentMessages = [...this.messages]
        const index = currentMessages.findIndex(item => item.id === messageId)
        currentMessages[index] = res.data
        this.messages = currentMessages
        resolve()
      }).catch(reject)
    })
  }

  @action
  setStore (field, value) {
    this[field] = value
  }

}

export default new Store()
