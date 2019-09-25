import React from 'react'
import { Route } from 'mobx-router'

import {
  HomeworkTeacherPage,
  JournalTeacherPage,
  ListTeacherPage,
  ReportsTeacherPage
} from '../components/pages/teacher'

import {
  ProfilePage,
  UsersPage,
  LoginPage,
  RegistrationPage,
  TablePage,
  JournalPage,
  OffersPage,
  CoursesPage,
  RemindersPage,
  CalendarPage,
  ReportsPage,
  BonusesPage,
  StatisticPage,
} from '../components/pages'

import {
  AchievementUserPage,
  CoursesUserPage,
  HomeworkUserPage,
  ScheduleUserPage,
  MainUserPage,
  OffersUserPage,
  LettersUserPage,
  ProfileUserPage
} from '../components/pages/user'

const userIsRegistered = (user) => {
  return !(user.role === 'user' && user.status !== 'active')
}

const userIsLoggedIn = (role) => {
  const currentUser = localStorage.getItem('current_user')
  if (!currentUser) {
    window.location = '/login'
    return false
  }
  const user = JSON.parse(currentUser)
  if (window.location.pathname !== '/registration' && !userIsRegistered(user)) {
    window.location = '/registration'
    return false
  }
  if (role && role !== user.role) {
    window.location = '/'
    return false
  }
}

const toHomePage = (a, b, store) => {
  store.router.goTo(routes.profile)
  return false
}

const routes = {
  login: new Route({
    path: '/login',
    component: <LoginPage/>
  }),
  profileUser: new Route({
    path: '/profileUser',
    component: <ProfileUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  offersUser: new Route({
    path: '/offersUser',
    component: <OffersUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  journalTeacher: new Route({
    path: '/journalTeacher',
    component: <JournalTeacherPage/>,
    beforeEnter: () => userIsLoggedIn('teacher')
  }),
  reportsTeacher: new Route({
    path: '/reportsTeacher',
    component: <ReportsTeacherPage/>,
    beforeEnter: () => userIsLoggedIn('teacher')
  }),
  listTeacher: new Route({
    path: '/listTeacher',
    component: <ListTeacherPage/>,
    beforeEnter: () => userIsLoggedIn('teacher')
  }),
  homeworkTeacher: new Route({
    path: '/homeworkTeacher',
    component: <HomeworkTeacherPage/>,
    beforeEnter: () => userIsLoggedIn('teacher')
  }),
  courses: new Route({
    path: '/courses',
    component: <CoursesPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  reports: new Route({
    path: '/reports',
    component: <ReportsPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  bonuses: new Route({
    path: '/bonuses',
    component: <BonusesPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  statistics: new Route({
    path: '/statistics',
    component: <StatisticPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  reminders: new Route({
    path: '/reminders',
    component: <RemindersPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  achievementsUser: new Route({
    path: '/achievementsUser',
    component: <AchievementUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  coursesUser: new Route({
    path: '/coursesUser',
    component: <CoursesUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  homeworkUser: new Route({
    path: '/homeworkUser',
    component: <HomeworkUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  lettersUser: new Route({
    path: '/lettersUser',
    component: <LettersUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  mainUser: new Route({
    path: '/mainUser',
    component: <MainUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  scheduleUser: new Route({
    path: '/scheduleUser',
    component: <ScheduleUserPage/>,
    beforeEnter: () => userIsLoggedIn('user')
  }),
  offers: new Route({
    path: '/offers',
    component: <OffersPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  homework: new Route({
    path: '/homework',
    component: <div>HOMEWORK</div>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  table: new Route({
    path: '/table',
    component: <TablePage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  journal: new Route({
    path: '/journal',
    component: <JournalPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  calendar: new Route({
    path: '/calendar',
    component: <CalendarPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  profile: new Route({
    path: '/profile',
    component: <ProfilePage/>,
    beforeEnter: () => userIsLoggedIn()
  }),
  users: new Route({
    path: '/users',
    component: <UsersPage/>,
    beforeEnter: () => userIsLoggedIn('admin')
  }),
  registration: new Route({
    path: '/registration',
    component: <RegistrationPage/>,
    beforeEnter: () => userIsLoggedIn()
  }),
  default: new Route({
    path: '/*',
    beforeEnter: toHomePage
  }),
  empty: new Route({
    path: '/',
    beforeEnter: toHomePage
  })
}

export default routes