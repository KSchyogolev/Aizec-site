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
  @observable currentGroup = {}

  @action
  setStore (field, value) {
    this[field] = value
  }

  @action
  removeInStore (field, id) {
    const currentArray = [...this[field]]
    const index = currentArray.findIndex(item => item.id === id)
    currentArray.splice(index, 1)
    this[field] = currentArray
  }

  @action
  updateInStore (field, id, data) {
    const currentArray = [...this[field]]
    const index = currentArray.findIndex(item => item.id === id)
    currentArray[index] = data
    this[field] = currentArray
  }

  @action
  addInStore (field, value) {
    this[field] = [...this[field], value]
  }

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
        this.setStore('users', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getAllMessages () {
    return new Promise((resolve, reject) => {
      API.main.getAllMessages().then(res => {
        this.setStore('messages', res.data)
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
        this.addInStore('users', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateUser (userId, data) {
    return new Promise((resolve, reject) => {
      API.main.updateUser(userId, data).then(res => {
        this.updateInStore('users', userId, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteUser (userId) {
    return new Promise((resolve, reject) => {
      API.main.deleteUser(userId).then(() => {
        this.removeInStore('users', userId)
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
        this.updateInStore('users', userId, res.data)
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
        this.addInStore('messages', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteMessage (messageId) {
    return new Promise((resolve, reject) => {
      API.main.deleteMessage(messageId).then(() => {
        this.removeInStore('messages', messageId)
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateMessage (messageId, data) {
    return new Promise((resolve, reject) => {
      API.main.updateMessage(messageId, data).then(res => {
        this.updateInStore('messages', messageId, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  addCourse (data) {
    return new Promise((resolve, reject) => {
      API.main.addCourse({course: {...data, status: 'active', user_id: this.currentUser.id}}).then(res => {
        this.addInStore('courses', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteCourse (courseId) {
    return new Promise((resolve, reject) => {
      API.main.deleteCourse(courseId).then(() => {
        this.removeInStore('courses', courseId)
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateCourse (courseId, data) {
    return new Promise((resolve, reject) => {
      API.main.updateCourse(courseId, data).then(res => {
        this.updateInStore('courses', courseId, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getAllCourses () {
    return new Promise((resolve, reject) => {
      API.main.getAllCourses().then(res => {
        this.setStore('courses', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getCurrentCourses () {
    return new Promise((resolve, reject) => {
      API.main.getCurrentCourses(this.currentUser.id).then(res => {
        this.setStore('currentCourses', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getAllClubs () {
    return new Promise((resolve, reject) => {
      API.main.getAllClubs().then(res => {
        this.setStore('clubs', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  addClub (data) {
    return new Promise((resolve, reject) => {
      API.main.addClub({club: data}).then(res => {
        this.addInStore('clubs', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteClub (id) {
    return new Promise((resolve, reject) => {
      API.main.deleteClub(id).then(() => {
        this.removeInStore('clubs', id)
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateClub (id, data) {
    return new Promise((resolve, reject) => {
      API.main.updateClub(id, data).then(res => {
        this.updateInStore('clubs', id, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getAll (field) {
    return new Promise((resolve, reject) => {
      API.main.getAllObjects(field).then(res => {
        this.setStore(field, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  addTo (field, name, data) {
    return new Promise((resolve, reject) => {
      API.main.addObject(field, {[name]: data}).then(res => {
        this.addInStore(field, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  deleteFrom (field, id) {
    return new Promise((resolve, reject) => {
      API.main.deleteObject(field, id).then(() => {
        this.removeInStore(field, id)
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateIn (field, id, data) {
    return new Promise((resolve, reject) => {
      API.main.updateObject(field, id, data).then(res => {
        this.updateInStore(field, id, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getGroup (groupId) {
    return new Promise((resolve, reject) => {
      API.main.getGroup(groupId).then(res => {
        this.setStore('currentGroup', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  addUserToGroup (groupId, userId) {
    return new Promise((resolve, reject) => {
      API.main.addUserToGroup(groupId, userId).then(res => {
        const group = this.groups.find(item => item.id === groupId)
        const user = this.users.find(item => item.id === userId)
        group.users = [...group.users, user]
        this.updateInStore('groups', groupId, group)
        resolve(res.data)
      }).catch(reject)
    })
  }

  @action
  removeUserFromGroup (groupId, userId) {
    return new Promise((resolve, reject) => {
      API.main.removeUserFromGroup(groupId, userId).then(res => {
        const group = this.groups.find(item => item.id === groupId)
        const userIndex = group.users.findIndex(item => item.id === userId)
        group.users.splice(userIndex, 1)
        this.updateInStore('groups', groupId, group)
        resolve(res.data)
      }).catch(reject)
    })
  }

}

export default new Store()
