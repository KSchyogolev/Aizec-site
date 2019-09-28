import { action, observable } from 'mobx'
import { RouterStore } from 'mobx-router'
import API from './api/api'
import moment from 'moment'

const _ = require('lodash')

const getLessonsVisits = async (lessons) => {
  const pArray = lessons.map(async lesson => {
    const res = await API.main.getLessonVisits(lesson.id)
    return {lesson_id: lesson.id, data: res.data}
  })
  return Promise.all(pArray)
}

const findClosestItem = (items, dateField, today = moment()) => {
  const nextDays = items.filter(item => moment(item[dateField]).diff(today) > 0)
  let resItem = nextDays[0] || null
  nextDays.forEach(item => {
    const currentDate = moment(item[dateField])
    const resultDate = moment(resItem[dateField])
    if (currentDate.diff(resultDate) <= 0) {
      resItem = item
    }
  })
  return resItem
}

const getNotification = (priority, text) => ({full_text: text, head_text: priority})

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
  @observable inbox = []
  @observable payments = []
  @observable lesson_types = []
  @observable currentUser = {}
  @observable currentGroup = {}
  @observable currentEvents = {}
  @observable currentLessons = []
  @observable currentOffers = []
  @observable currentCourses = []
  @observable currentMessages = []
  @observable journalLessons = []
  @observable currentVisits = []
  @observable lessonVisits = []
  @observable currentGroups = []
  @observable currentClubs = []
  @observable currentVisitsMap = {}
  @observable currentPayments = []
  @observable currentCourseId = {}
  @observable autoNotifications = []

  @observable archivedUsers = []

  @observable loading = {
    currentOffers: false
  }
  @observable tips = {
    users: 0,
    reminders: 0,
    homeworkUser: 0,
    currentVisits: 0
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
      this.getAll('groups').then(resG => {
        const groups = resG.data
        API.main.getAllUsers().then(res => {
          const users = res.data.map(user => {
            return {
              ...user,
              isNew: !groups.some(grp => grp.users.some(item => item.id === user.id))
            }
          })
          this.setStore('users', users)
          resolve()
        }).catch(reject)
      })
    })
  }

  @action
  setTip (field, filterFunc, page) {
    const countTips = this[field].filter(filterFunc).length
    this.setStore('tips', {...this.tips, [page || field]: countTips})
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
  deleteUser (userId, data) {
    return new Promise((resolve, reject) => {
      API.main.deleteUser(userId, data).then(() => {
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
  getAll (field, tipsCountFunction, page, withArchived) {
    return new Promise((resolve, reject) => {
      API.main.getAllObjects(field, withArchived).then(res => {
        this.setStore(field, res.data)
        if (tipsCountFunction) {
          this.setTip(field, tipsCountFunction, page)
        }
        resolve(res)
      }).catch(reject)
    })
  }

  @action
  getArchived (field, storeField) {
    return new Promise((resolve, reject) => {
      API.main.getAllArchived(field).then(res => {
        this.setStore(storeField, res.data)
        resolve(res)
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
        resolve(res.data)
      }).catch(reject)
    })
  }

  @action
  updateUserVisit (id, data) {
    return new Promise((resolve, reject) => {
      API.main.updateObject('visits', id, data).then(res => {
        this.updateInStore('currentVisits', id, res.data)
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
  getUserObjects (field, storeField, userId = this.currentUser.id, withArchivated) {
    return new Promise((resolve, reject) => {
      API.main.getUserObjects(field, userId, withArchivated).then(res => {
        this.setStore(storeField || field, res.data)
        resolve(res)
      }).catch(reject)
    })
  }

  @action
  getUserVisits (userId = this.currentUser.id, filterFunc) {
    return new Promise((resolve, reject) => {
      API.main.getUserVisits(userId).then(res => {
        this.setStore('currentVisits', res.data)
        if (filterFunc)
          this.setTip('currentVisits', filterFunc, 'homeworkUser')
        resolve(res)
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
      this.getUserObjects('payments', 'currentPayments').then(resP => {
        const payments = resP.data
        this.setStore('currentPayments', payments)
        API.main.getCurrentOffers(this.currentUser.id).then(res => {
          const offers = res.data.map(offer => {
            const a = moment()
            const b = moment(offer.created_at)

            let payIndex = payments.findIndex(payment => payment.merch_id === offer.id || payment.message_id === offer.id || payment.course_id === offer.id)

            return {
              ...offer,
              isNew: a.diff(b, 'days') < 7,
              status: payIndex === -1 ? 'null' : payments[payIndex].status
            }
          })
          console.log(offers)
          this.setStore('currentOffers', offers)
          this.setLoading('currentOffers', false)
          resolve()
        }).catch((err) => {
          this.setLoading('currentOffers', false)
          reject(err)
        })
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
  uploadImages (files, messageId, field = 'message', requestField = 'messages', type = 'photos') {
    return new Promise((resolve, reject) => {
      const formData = new FormData()

      for (let i = 0; i < files.length; i++)
        formData.append(field + `[${type}][]`, files[i])

      API.main.uploadFile(formData, messageId, requestField).then(res => {
        if (field === 'message') this.updateInStore('outbox', messageId, res.data)
        resolve(res)
      })
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
  getCourseGroups = (courseId) => {
    return new Promise((resolve, reject) => {
      API.main.getCourseGroups(courseId).then(res => {
        resolve(res)
      }).catch(reject)
    })
  }

  @action
  getCourseLessons = (courseId) => {
    return new Promise((resolve, reject) => {
      API.main.getCourseLessons(courseId).then(res => {
        resolve(res)
      }).catch(reject)
    })
  }

  @action
  setLoading = (filed, val) => {
    this.loading[filed] = val
  }

  @action
  initAdmin = () => {
    this.getAll('users', (user) => user.status === 'not_approved', 'users')
    // this.getAll('payments', (payment) => payment.status === 'ready', 'reminders')
    this.getAll('messages', message => message.kind === 'report', 'reports')
  }

  @action
  initUser = () => {
    let notifications = []

    Promise.all([this.getUserVisits(), this.getUserLessons()]).then(res => {
      const visits = res[0].data,
        lessons = res[1].data

      const mapLessons = lessons.reduce((res, item) => ({...res, [item.id]: {...item}}), {})

      const mapVisitOnLesson = visits.reduce((res, item) => ({...res, [item.lesson_id]: {...item}}), {})

      const homeworkNotSend = visits.filter(item => item.status !== 'null' && item.approve_status === 'null').map(item => mapLessons[item.lesson_id] && mapLessons[item.lesson_id].short_description)

      const closestLesson = findClosestItem(lessons, 'start_time')

      let hasTwoMiss = false
      const beforeVisit = {}
      visits.forEach(visit => {
        if (visit.status === 'skip_without_reason') {
          const nextLesson = findClosestItem(lessons, 'start_time', moment(mapLessons[visit.lesson_id] && mapLessons[visit.lesson_id].start_time))
          if (nextLesson) {
            hasTwoMiss = mapVisitOnLesson[nextLesson.id].status === 'skip_without_reason'
          }
        }
      })

      if (homeworkNotSend.length > 0) {
        notifications.push(getNotification(2, 'Не отправлена домашня работа по урокам: ' + homeworkNotSend.join(', ')))
      }
      if (closestLesson) {
        notifications.push(getNotification(3, 'Ближайшее занятие - ' + closestLesson.short_description + ' (' + moment(closestLesson.start_time).format('DD.MM.YYYY HH:mm') + ')'))
      }
      if (hasTwoMiss) {
        notifications.push(getNotification(1, 'Внимание! У вас пропущено 2 или более уроков подряд, рекомендуем записаться на индивидуальное занятие!'))
      }

      this.setStore('autoNotifications', notifications)
    })
  }

  @action
  initTeacher = () => {
    let notApprovedHomework = 0
    /*    this.getUserLessons().then(res => {
          res.data.forEach(lesson => {
            this.getLessonVisits(lesson.id).then(res => {
              notApprovedHomework += res.data.filter(item => item.approve_status === 'done_not_approved').length
              this.setStore('tips', {...this.tips, currentVisits: notApprovedHomework})
            })
          })
        })*/
    this.getUserObjects('groups', 'currentGroups')
  }

  @action
  sendNewPassword = (email) => {
    return new Promise((resolve, reject) => {
      API.main.sendNewPassword({email}).then(() => {
        resolve()
      }).catch(reject)
    })
  }

  @action
  getLessonsInfos = () => {
    return new Promise((resolve, reject) => {
      this.getAll('groups').then(res => {
        const groups = res.data
        this.getAll('lessons').then(res => {
          const lessons = res.data
          const groupLessons = _.groupBy(lessons, 'group_id')
          const newGroups = groups.map(item => {
            let grp = {...item},
              daysWeek = [],
              times = []
            if (groupLessons[item.id]) {
              groupLessons[item.id].forEach(lesson => {
                const day = moment(lesson.start_time).isoWeekday()
                const time = moment(lesson.start_time).format('hh:mm')
                if (daysWeek.indexOf(day) === -1) {
                  daysWeek.push(day)
                }
                if (times.indexOf(time) === -1) {
                  times.push(time)
                }
              })
            }
            return {
              ...grp,
              daysWeek: daysWeek,
              times: times,
              teachers: grp.users.filtr
            }
          })
          this.setStore('groups', newGroups)
        }).catch(reject)
      })
    })
  }

  @action
  getJournalLessons = (courseId) => {
    if (!courseId) {
      this.setStore('journalLessons', [])
      this.setStore('currentVisitsMap', {})
      this.setStore('currentCourseId', null)
      return
    }

    const lessons = this.lesson_infos.filter(item => item.course_id === courseId).reduce((res, item) => ([...item.lessons, ...res]), [])
    getLessonsVisits(lessons).then(res => {
      const visitsMap = res.reduce((res, item) => ({[item.lesson_id]: item.data, ...res}), {})
      const lessonsWithVisits = lessons.map(item => ({
        ...item,
        visits: visitsMap[item.id] || []
      })).sort((a, b) => moment(a.start_time).unix() - moment(b.start_time).unix())

      const lessonsGroupByType = _.groupBy(lessonsWithVisits, 'lesson_type')

      const currentLessons = Object.keys(lessonsGroupByType).map(key => {
        return {
          lesson_type: key,
          lessonsByGroups: _.groupBy(lessonsGroupByType[key], 'group_id')
        }
      })
      this.setStore('journalLessons', currentLessons)
      this.setStore('currentVisitsMap', visitsMap)
      this.setStore('currentCourseId', courseId)
    })
  }

  @action
  setCurrentBonuses = (bonuses, userId = this.currentUser.id) => {
    return new Promise((resolve, reject) => {
      API.main.updateUser(userId, {bonus_count: bonuses}).then(res => {
        this.setStore('currentUser', res.data)
        resolve()
      }).catch(reject)
    })
  }

  @action
  updateVisit = (visitId, data) => {
    return new Promise((resolve, reject) => {
      API.main.updateObject('visits', visitId, data).then(res => {

        const visitsMap = {...this.currentVisitsMap}
        const visits = visitsMap[res.data.lesson_id]
        const index = visits.findIndex(item => item.id === visitId)
        visits[index] = res.data

        const lessons = this.lesson_infos.filter(item => item.course_id === this.currentCourseId).reduce((res, item) => ([...item.lessons, ...res]), [])

        const lessonsWithVisits = lessons.map(item => ({
          ...item,
          visits: visitsMap[item.id] || []
        })).sort((a, b) => moment(a.start_time).unix() - moment(b.start_time).unix())

        const lessonsGroupByType = _.groupBy(lessonsWithVisits, 'lesson_type')
        const currentLessons = Object.keys(lessonsGroupByType).map(key => {
          return {
            lesson_type: key,
            lessonsByGroups: _.groupBy(lessonsGroupByType[key], 'group_id')
          }
        })
        this.setStore('journalLessons', currentLessons)
        this.setStore('currentVisitsMap', visitsMap)
        resolve()
      }).catch(reject)
    })
  }

}

export default new Store()
