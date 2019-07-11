import React, { Component, useState } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import clsx from 'clsx'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Drawer from '@material-ui/core/Drawer'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'

import InboxIcon from '@material-ui/icons/MoveToInbox'
import MailIcon from '@material-ui/icons/Mail'
import LogoutIcon from '@material-ui/icons/ExitToApp'
import UserIcon from '@material-ui/icons/People'
import FolderIcon from '@material-ui/icons/Folder'
import FaceIcon from '@material-ui/icons/Face'
import CalendarIcon from '@material-ui/icons/CalendarToday'
import HomeWorkIcon from '@material-ui/icons/FileCopy'

import { inject, observer } from 'mobx-react'
import store from '../store'
import routes from '../config/routes'

const drawerWidth = 260

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: '#464646',
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap'
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1
    }
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
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
  },
  rightAppContent: {
    marginLeft: 'auto',
    display: 'inline-flex',
    color: '#FFFFFF',
    '& svg': {
      color: '#FFFFFF !important'
    },
    '& p': {
      margin: 'auto',
      fontSize: 20
    }
  }
}))

const translate = (str) => {
  switch (str) {
    case 'homework' :
      return 'Домашняя работа'
    case 'calendar' :
      return 'Календарь'
    case 'profile' :
      return 'Профиль'
    case 'users' :
      return 'Пользователи'
    case 'teacher' :
      return 'Учитель'
    case 'admin' :
      return 'Администратор'
    case 'student' :
      return 'Ученик'
    default:
      return ''
  }
}

const getIcon = (page) => {
  switch (page) {
    case 'users':
      return <UserIcon/>
    case 'profile':
      return <FaceIcon/>
    case 'calendar':
      return <CalendarIcon/>
    case 'homework':
      return <HomeWorkIcon/>
    default:
      return <FolderIcon/>
  }

}

const LeftMenu = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  const {currentUser} = store
  const {currentView} = store.router

  return <div className={classes.root}>
    <CssBaseline/>
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.open
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={() => props.setOpen(true)}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: props.open
          })}
        >
          <MenuIcon/>
        </IconButton>
        <Typography variant="h6" noWrap>
          {currentView && currentView.path ? translate(currentView.path.replace('/', '')) : ''}
        </Typography>
        <div className={classes.rightAppContent}>
          <Typography>
            {currentUser.first_name + ' ' + currentUser.second_name + ' (' + translate(currentUser.role) + ')'}
          </Typography>
          <IconButton onClick={store.signOut}>
            <LogoutIcon/>
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
    <Drawer variant="permanent"
            anchor="left"
            className={clsx(classes.drawer, {
              [classes.drawerOpen]: props.open,
              [classes.drawerClose]: !props.open
            })}
            classes={{
              paper: clsx({
                [classes.drawerOpen]: props.open,
                [classes.drawerClose]: !props.open
              })
            }}
            open={props.open}>
      <div className={classes.toolbar}>
        <IconButton onClick={() => props.setOpen(false)}>
          <ChevronLeftIcon/>
        </IconButton>
      </div>
      <Divider/>
      <List>
        {props.pages ? props.pages.map((item, index) => {
          return <ListItem button key={index}
                           className={currentView && currentView.path === '/' + item ? classes.selected : ''}
                           onClick={() => {
                             store.router.goTo(routes[item])
                           }}>
            <ListItemIcon>{getIcon(item)}</ListItemIcon>
            <ListItemText primary={translate(item)}/>
          </ListItem>
        }) : null}
      </List>
    </Drawer>
  </div>
}

export default inject('store')(observer(LeftMenu))