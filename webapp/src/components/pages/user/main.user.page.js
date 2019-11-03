import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { inject, observer } from 'mobx-react'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import { getCurrentOffers } from './offers.user.page'
import NotifIcon from '@material-ui/icons/PriorityHigh'
import NotificationIcon from '@material-ui/icons/NotificationImportant'
import OfferIcon from '@material-ui/icons/CardGiftcard'
import TeacherIcon from '@material-ui/icons/School'
import Divider from '@material-ui/core/Divider'
import { TeacherWidget } from '../../widgets'

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
    // margin: '20px 0',
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
  },
  divider: {
    margin: '30px 0px 10px 0px',
    display: 'flex',
    fontSize: '1.2rem',

    '& .MuiDivider-root': {
      flex: 1,
      margin: 'auto',
      marginLeft: 10
    }
  },
  divLabel: {
    display: 'flex',
    '& svg': {
      margin: 'auto',
      marginRight: 10,
      color: '#757575'
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
    store.getUserObjects('groups', 'currentGroups')
  }, [store.currentOffers.length])

  let teachers = store.currentGroups.reduce((res, item) => [...res, ...item.users], []).filter(item => item.role === 'teacher')

  teachers = teachers.filter((item, index) => teachers.findIndex(t => t.id === item.id) === index)

  return (
    <div className={classes.root}>
      <div className={classes.divider}>
        <div className={classes.divLabel}><NotificationIcon/>НАПОМИНАНИЯ</div>
        <Divider variant="middle"/>
      </div>
      <Paper className={classes.notificationBox}>
        {[...store.inbox.filter(item => item.kind === 'notification'), ...store.autoNotifications].sort((a, b) => parseInt(a.head_text) - parseInt(b.head_text)).map(item =>
          <NotificationRow
            text={item.full_text} priority={item.head_text}/>)}
      </Paper>
      <div className={classes.divider}>
        <div className={classes.divLabel}><OfferIcon/>ПРЕДЛОЖЕНИЯ</div>
        <Divider variant="middle"/>
      </div>
      <Grid container spacing={3}>
        {getCurrentOffers(store.currentOffers.filter(item => item.status !== 'done' && item.isNew))}
        {getCurrentOffers(store.currentOffers.filter(item => item.status !== 'done' && !item.isNew))}
      </Grid>
      <div className={classes.divider}>
        <div className={classes.divLabel}><TeacherIcon/>УЧИТЕЛЯ</div>
        <Divider variant="middle"/>
      </div>
      <Grid container spacing={3}>
        {teachers.map((item, index) => <Grid item
                                             xs={12}
                                             sm={12}
                                             md={12}
                                             lg={6}
                                             key={index}>
          <TeacherWidget name={`${item.second_name} ${item.first_name} ${item.third_name}`} info={item.bio} photo={item.photo}/>
        </Grid>)}
      </Grid>
    </div>
  )
}

export default inject('store')(observer(MainUserPage))
