import React, { Component } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import { inject, observer } from 'mobx-react'
import store from '../store'
import routes from '../config/routes'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    '& .MuiList-root': {
      width: '100%',
      '& .MuiListItem-root': {
        width: '100%',
        display: 'flex',
        position: 'relative',
        boxSizing: 'border-box',
        textAlign: 'left',
        alignItems: 'center',
        paddingTop: 8,
        paddingBottom: 8,
        justifyContent: 'flex-start',
        textDecoration: 'none',
        paddingLeft: 16,
        paddingRight: 16
      }
    }
  },
  drawerPaper: {
    width: 250,
    color: '#212121'
    // backgroundColor: '#FFCCBC',
  },
  selected: {
    backgroundColor: '#FF5722',
    color: '#FFFFFF',
    '&:hover': {
      backgroundColor: '#E64A19'
    },
    '& svg': {
      color: '#FFFFFF !important'
    }
  }
}))

const translate = {
  homework: 'Домашняя работа',
  calendar: 'Календарь',
  profile: 'Профиль',
  users: 'Пользователи'
}

const LeftMenu = (props) => {
  const classes = useStyles()

  return <div className={classes.root}>
    <Drawer classes={{
      paper: classes.drawerPaper
    }}
            variant="permanent"
            open>
      <List>
        {props.pages ? props.pages.map((item, index) => {
          return <ListItem button key={index}
                           className={store.router.currentView.path === '/' + item ? classes.selected : ''}
                           onClick={() => {
                             store.router.goTo(routes[item])
                           }}>
            <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
            <ListItemText primary={translate[item]}/>
          </ListItem>
        }) : null}
      </List>
    </Drawer>
  </div>
}

export default inject('store')(observer(LeftMenu))