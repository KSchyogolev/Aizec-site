import React from 'react'
import { Route } from 'mobx-router'
import { ProfilePage, UsersPage, LoginPage } from '../components/pages'

const checkForUserSignedIn = (fromState, toState, routerStore) => {
  const {rootStore: {authStore}} = routerStore
  if (authStore.user) {
    return Promise.resolve()
  } else {
    // authStore.setSignInRedirect(toState);
    // return Promise.reject(new RouterState('signin'));
  }
}

const routes = {
  login: new Route({
    path: '/login',
    component: <LoginPage/>
  }),
  home: new Route({
    path: '/',
    component: <div>HOME</div>
  }),
  homework: new Route({
    path: '/homework',
    component: <div>HOMEWORK</div>
  }),
  calendar: new Route({
    path: '/calendar',
    component: <div>CALENDAR</div>
  }),
  profile: new Route({
    path: '/profile',
    component: <ProfilePage/>
  }),
  users: new Route({
    path: '/users',
    component: <UsersPage/>
  })
}

export default routes