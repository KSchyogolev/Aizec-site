import React from 'react'
import { Route } from 'mobx-router'
import { ProfilePage, UsersPage, LoginPage } from '../components/pages'


const userIsLoggedIn = (route, params, store) => {
  return true
  /*  const userIsLoggedIn = store.user
  if (!userIsLoggedIn) {
    window.location = '/login'
    return false
  }*/
}

const routes = {
  login: new Route({
    path: '/login',
    component: <LoginPage/>
  }),
  home: new Route({
    path: '/',
    component: <div>HOME</div>,
    beforeEnter: userIsLoggedIn
  }),
  homework: new Route({
    path: '/homework',
    component: <div>HOMEWORK</div>,
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
  })
}

export default routes