import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import { getCurrentOffers } from './offers.user.page'
import ExpansionPanel from '@material-ui/core/ExpansionPanel'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import NotifIcon from '@material-ui/icons/PriorityHigh'

const useStyles = makeStyles(theme => ({
  root: {
    margin: 15
  },
  form: {
    padding: 30
  },
  card: {
    textAlign: 'left',
    color: '#212121'
  },
  media: {
    height: '12em'
  },
  profileTable: {},
  infoRow: {
    display: 'flex',
    padding: 5,
    '& div:first-child': {
      fontWeight: 600,
      width: 200
    },
    '& div:last-child': {
      color: '#607D8B'
      // marginLeft: 'auto'
    }
  },
  info: {
    margin: '30px 0px'
  },
  parentMedia: {
    height: '5em'
  },
  parentsForm: {
    // marginTop: 100
  },
  parentsExpand: {
    width: '100%'
  },
  notificationBox: {
    margin: '20px 0',
    textAlign: 'left'
    // backgroundColor: '#ff57221c'
  },
  notification: {
    display: 'flex',
    padding: 15,
    fontWeight: 600,
    '& svg': {
      marginRight: 10
    }
  }
}))

const parentTypes = {
  mother: 'Мать',
  father: 'Отец',
  rustee: 'Опекун'
}

const NotificationRow = ({text, priority}) => {
  const classes = useStyles()
  const priorityColor = {
    1: '#FF5722',
    2: '#faaa0c',
    3: '#757575'
  }

  return <div className={classes.notification}><NotifIcon style={{color: priorityColor[priority]}}/>{text}</div>
}

const MainUserPage = (props) => {
  const classes = useStyles()
  const {store} = props
  const {currentUser: user} = store

  useEffect(() => {
    store.getCurrentOffers()
    store.getUserObjects('inbox')
  }, [store.currentOffers.length])

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        {getCurrentOffers(store.currentOffers.filter(item => item.status !== 'done' && item.isNew))}
        {getCurrentOffers(store.currentOffers.filter(item => item.status !== 'done' && !item.isNew))}
      </Grid>
      <Paper className={classes.notificationBox}>
        {[...store.inbox.filter(item => item.kind === 'notification'), ...store.autoNotifications].sort((a, b) => parseInt(a.head_text) - parseInt(b.head_text)).map(item =>
          <NotificationRow
            text={item.full_text} priority={item.head_text}/>)}
      </Paper>
    </div>
  )
}

export default inject('store')(observer(MainUserPage))
