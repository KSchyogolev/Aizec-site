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
import DnsIcon from '@material-ui/icons/Dns'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import Collapse from '@material-ui/core/Collapse'
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
import SummaryIcon from '@material-ui/icons/FileCopy'
import ExpandLessIcon from '@material-ui/icons/ExpandLess'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart'

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
    width: 0,
    [theme.breakpoints.up('sm')]: {
      width: 0
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
  },
  nested: {
    paddingLeft: 30
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
    case 'user' :
      return 'Ученик'
    case 'summary':
      return 'Прогресс'
    case 'offers':
      return 'Предложения'
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
    case 'offers':
      return <AddShoppingCartIcon/>
    default:
      return <FolderIcon/>
  }

}

const LeftMenu = (props) => {
  const classes = useStyles()
  const theme = useTheme()
  const {currentUser} = store
  const {currentView} = store.router

  const [openPages, setOpenPages] = useState([])

  const handleOpen = (name) => {
    setOpenPages([...openPages, name])
  }

  const handleClose = (name) => {
    const pages = [...openPages]
    const index = openPages.indexOf(name)
    if (index !== -1) {
      pages.splice(index, 1)
      setOpenPages(pages)
    }
  }

  const drawListItem = (page, index, level) => {
    const {subPages, name, label} = page
    const isOpen = subPages.length && openPages.indexOf(name) !== -1
    return !subPages.length ? <ListItem style={{'padding-left': 16 * level + 'px'}}
                                        button key={index}
                                        className={currentView && currentView.path === '/' + name ? classes.selected : ''}
                                        onClick={() => store.router.goTo(routes[name])}>
      <ListItemIcon>{getIcon(name)}</ListItemIcon>
      <ListItemText primary={label}/>
    </ListItem> : <>
    <ListItem button onClick={() => !isOpen ? handleOpen(name) : handleClose(name)}>
      <ListItemIcon>
        <DnsIcon/>
      </ListItemIcon>
      <ListItemText primary={label}/>
      {isOpen ? <ExpandLessIcon/> : <ExpandMoreIcon/>}
    </ListItem>
    <Collapse in={isOpen} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {subPages.map((item, index) => drawListItem(item, index, level + 1))}
      </List>
    </Collapse>
    </>
  }

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
        {props.pages ? props.pages.map((page, index) => drawListItem(page, index, 1)) : null}
      </List>
    </Drawer>
  </div>
}

export default inject('store')(observer(LeftMenu))