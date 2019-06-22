import React, { Component } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import AppBar from '@material-ui/core/AppBar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import InboxIcon from '@material-ui/icons/MoveToInbox'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import MailIcon from '@material-ui/icons/Mail'
import MenuIcon from '@material-ui/icons/Menu'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import { inject, observer } from 'mobx-react'
import store from '../store'
import routes from '../config/routes'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  }
}))

const translate = {
  homework: 'Домашняя работа',
  calendar: 'Календарь',
  profile: 'Профиль'
}

const LeftMenu = (props) => {
  const classes = useStyles()
  const theme = useTheme()

  return <div className={classes.root}>
    <List>
      {props.pages ? props.pages.map((item, index) => {
        return <ListItem button key={index} onClick={() => store.router.goTo(routes[item])}>
          <ListItemIcon>{index % 2 === 0 ? <InboxIcon/> : <MailIcon/>}</ListItemIcon>
          <ListItemText primary={translate[item]}/>
        </ListItem>
      }) : null}
    </List>
  </div>
}

export default inject('store')(observer(LeftMenu))