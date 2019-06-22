import React from 'react'
import { Route } from 'mobx-router'

const routes = {
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
    component: <div>PROFILE</div>
  })
}

export default routes