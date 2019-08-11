import React from 'react'
import { Route } from 'mobx-router'
import {
  ProfilePage,
  UsersPage,
  LoginPage,
  RegistrationPage,
  TablePage,
  JournalPage,
  OffersPage
} from '../components/pages'

import {
  AchievementUserPage,
  CoursesUserPage,
  HomeworkUserPage,
  ScheduleUserPage,
  MainUserPage,
  OffersUserPage,
  LettersUserPage
} from '../components/pages/user'

const userIsRegistered = (user) => {
  return !(user.role === 'user' && user.status !== 'active')
}

const userIsLoggedIn = () => {
  const currentUser = localStorage.getItem('current_user')
  if (!currentUser) {
    window.location = '/login'
    return false
  }
  if (window.location.pathname !== '/registration' && !userIsRegistered(JSON.parse(currentUser))) {
    window.location = '/registration'
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
  offersUser: new Route({
    path: '/offersUser',
    component: <OffersUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  achievementsUser: new Route({
    path: '/achievementsUser',
    component: <AchievementUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  coursesUser: new Route({
    path: '/coursesUser',
    component: <CoursesUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  homeworkUser: new Route({
    path: '/homeworkUser',
    component: <HomeworkUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  lettersUser: new Route({
    path: '/lettersUser',
    component: <LettersUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  mainUser: new Route({
    path: '/mainUser',
    component: <MainUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  scheduleUser: new Route({
    path: '/scheduleUser',
    component: <ScheduleUserPage/>,
    beforeEnter: userIsLoggedIn
  }),
  offers: new Route({
    path: '/offers',
    component: <OffersPage/>,
    beforeEnter: userIsLoggedIn
  }),
  homework: new Route({
    path: '/homework',
    component: <div>HOMEWORK</div>,
    beforeEnter: userIsLoggedIn
  }),
  table: new Route({
    path: '/table',
    component: <TablePage/>,
    beforeEnter: userIsLoggedIn
  }),
  journal: new Route({
    path: '/journal',
    component: <JournalPage/>,
    beforeEnter: userIsLoggedIn
  }),
  calendar: new Route({
    path: '/calendar',
    component: <div>CALENDAR</div>,
    beforeEnter: userIsLoggedIn
  }),
  profile: new Route({
    path: '/profile',
    component: <ProfilePage/>,
    beforeEnter: userIsLoggedIn
  }),
  users: new Route({
    path: '/users',
    component: <UsersPage/>,
    beforeEnter: userIsLoggedIn
  }),
  registration: new Route({
    path: '/registration',
    component: <RegistrationPage/>,
    beforeEnter: userIsLoggedIn
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