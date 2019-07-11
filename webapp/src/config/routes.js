import React from 'react'
import { Route } from 'mobx-router'
import { ProfilePage, UsersPage, LoginPage } from '../components/pages'


const userIsLoggedIn = () => {
  const userIsLoggedIn = localStorage.getItem('current_user')
  console.log(userIsLoggedIn)
  if (!userIsLoggedIn) {
    window.location = '/login'
  }
}

const routes = {
  login: new Route({
    path: '/login',
    component: <LoginPage/>
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
  }),
  default: new Route({
    path: '/*',
    beforeEnter: (a,b,store) => {
      store.router.goTo(routes.profile)
      return false
    }
  }),
}

export default routes