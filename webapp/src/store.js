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
  @observable merches = []
  @observable courses = []
  @observable clubs = []
  @observable lessons = []
  @observable offers = []
  @observable outbox = []
  @observable lesson_infos = []
  @observable messages = []
  @observable visits = []
  @observable payments = []
  @observable lesson_types = []
  @observable currentUser = {}
  @observable currentGroup = {}
  @observable currentEvents = {}
  @observable currentLessons = []
  @observable currentOffers = []
  @observable currentCourses = []
  @observable currentMessages = []
  @observable currentVisits = []
  @observable lessonVisits = []
  @observable loading = {
    currentOffers: false
  }
  @observable tips = {
    users: 0,
    reminders: 0,
    homeworkTeacher: 0
  }

  @observable notification = {
    show: false,
    message: '',
    variant: ''
  }

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
        resolve(res.data)
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
  setTip (field, filterFunc) {
    const countTips = this[field].filter(filterFunc).length
    this.setStore('tips', {...this.tips, [field]: countTips})
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
        this.setTip('users', (user) => user.status === 'not_approved')
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
        resolve(res.data)
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
  getAll (field, tipsCountFunction) {
    return new Promise((resolve, reject) => {
      API.main.getAllObjects(field).then(res => {
        this.setStore(field, res.data)
        if (tipsCountFunction) {
          this.setTip(field, tipsCountFunction)
        }
        resolve()
      }).catch(reject)
    })
  }

  @action
  addTo (field, name, data) {
    return new Promise((resolve, reject) => {
      API.main.addObject(field, {[name]: {...data, status: data.status || 'active'}}).then(res => {
        this.addInStore(field, res.data)
        resolve(res.data)
      }).catch(reject)
    })
  }

  @action
  deleteFrom (field, id) {
    return new Promise((resolve, reject) => {
      API.main.deleteObject(field, id).then((res) => {
        this.removeInStore(field, id)
        resolve(res.data)
      }).catch(reject)
    })
  }

  @action
  updateIn (field, id, data) {
    return new Promise((resolve, reject) => {
      API.main.updateObject(field, id, data).then(res => {
        this.updateInStore(field, id, res.data)
        console.log('RESOLVE')
        resolve(res.data)
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

  @action
  getUserLessons (userId = this.currentUser.id) {
    return new Promise((resolve, reject) => {
      API.main.getUserLessons(userId).then(res => {
        this.setStore('currentLessons', res.data)
        resolve(res)
      }).catch(reject)
    })
  }

  @action
  getUserEvents (userId = this.currentUser.id) {
    return new Promise((resolve, reject) => {
      API.main.getUserEvents(userId).then(res => {
        this.setStore('currentEvents', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getUserMessages (userId = this.currentUser.id) {
    return new Promise((resolve, reject) => {
      API.main.getUserMessages(userId).then(res => {
        this.setStore('currentMessages', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getUserObjects (field, userId = this.currentUser.id) {
    return new Promise((resolve, reject) => {
      API.main.getUserObjects(field, userId).then(res => {
        this.setStore(field, res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getUserVisits (userId = this.currentUser.id) {
    return new Promise((resolve, reject) => {
      API.main.getUserVisits(userId).then(res => {
        this.setStore('currentVisits', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  getLessonVisits (lessonId) {
    return new Promise((resolve, reject) => {
      API.main.getLessonVisits(lessonId).then(res => {
        this.setStore('lessonVisits', res.data)
        resolve(res)
      }).catch(reject)
    })
  }

  @action
  getCurrentOffers () {
    this.setLoading('currentOffers', true)
    return new Promise((resolve, reject) => {
      API.main.getCurrentOffers(this.currentUser.id).then(res => {
        this.setStore('currentOffers', res.data)
        this.setLoading('currentOffers', false)
        resolve()
      }).catch((err) => {
        this.setLoading('currentOffers', false)
        reject(err)
      })
    })
  }

  @action
  uploadHomework (files, visitId) {
    return new Promise((resolve, reject) => {
      const formData = new FormData()

      formData.append('message[kind]', 'homework')
      formData.append('message[to_entity_type]', 'visit')
      formData.append('message[status]', 'active')
      formData.append('message[head_text]', 's')
      formData.append('message[full_text]', 's')
      formData.append('message[to_entity_id]', visitId)
      formData.append('message[user_id]', this.currentUser.id)

      for (let i = 0; i < files.length; i++)
        formData.append('message[photos][]', files[i])

      API.main.uploadHomework(formData).then((res) => {
        const currentVisit = this.currentVisits.find(item => item.id === visitId)
        if (currentVisit.approve_status === 'null') {
          this.updateInStore('currentVisits', visitId, {...currentVisit, approve_status: 'done_not_approved'})
        }
        resolve()
      }).catch(reject)
    })
  }

  @action
  showNotification (variant, message) {
    this.setStore('notification', {variant, message, show: true})
  }

  @action
  closeNotification = () => {
    return this.setStore('notification', {...this.notification, show: false})
  }

  @action
  getHomework = (visitId) => {
    return new Promise((resolve, reject) => {
      API.main.getHomework(visitId).then(res => {
        resolve(res.data)
      }).catch(reject)
    })
  }

  @action
  setLoading = (filed, val) => {
    this.loading[filed] = val
  }

  @action
  initAdmin = () => {
    this.getAll('users', (user) => user.status === 'not_approved')
    this.getAll('payments', (payment) => payment.status === 'ready')
  }

  @action
  initTeacher = () => {
    let notApprovedHomework = 0
    this.getUserLessons().then(res => {
      res.data.forEach(lesson => {
        this.getLessonVisits(lesson.id).then(res => {
          notApprovedHomework += res.data.filter(item => item.approve_status === 'done_not_approved').length
          this.setStore('tips', {...this.tips, homeworkTeacher: notApprovedHomework})
        })
      })
    })
  }

}

export default new Store()
