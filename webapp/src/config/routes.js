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

const userIsRegistered = (user) => {
  return !(user.role === 'user' && user.status === 'not_activated')
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